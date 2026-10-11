import requests
import json
import time
import datetime
from zoneinfo import ZoneInfo

SEASON_TYPE = 2 # 2 for regular seasion, 3 for postseason
EASTERN = ZoneInfo("America/New_York")

def parse_start(game):
    date_str = game.get('date')
    if not date_str:
        return None
    try:
        return datetime.datetime.fromisoformat(date_str.replace('Z', '+00:00'))
    except (ValueError, TypeError):
        return None

def get_sunday_cutoff(events):
    # The week's Sunday is the first Sunday on or after its earliest game; cutoff is 1pm ET that day
    starts = [dt for dt in (parse_start(game) for game in events) if dt]
    if not starts:
        return None
    first_day = min(starts).astimezone(EASTERN).date()
    sunday = first_day + datetime.timedelta(days=(6 - first_day.weekday()) % 7)
    return datetime.datetime.combine(sunday, datetime.time(13, 0), tzinfo=EASTERN)

def get_nfl_lines(week: int):
    # Get the scoreboard data for the specified week
    scoreboard_url = f"https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2026&seasontype={SEASON_TYPE}&week={week}"
    scoreboard_response = requests.get(scoreboard_url)
    scoreboard_data = scoreboard_response.json()

    games_data = []
    earliest_ts = None
    events = scoreboard_data.get('events', [])
    cutoff = get_sunday_cutoff(events)

    # Process each game in the events array
    for game in events:
        # Skip non-scheduled games
        if game['status']['type']['name'] != 'STATUS_SCHEDULED':
            continue

        # Skip games before 1pm ET Sunday (Thursday, international, Saturday games)
        start_dt = parse_start(game)
        if start_dt is None or cutoff is None or start_dt < cutoff:
            continue

        game_id = game['id']
        competitors = game['competitions'][0]['competitors']

        # Capture start time
        start_ts = int(start_dt.timestamp())
        if earliest_ts is None or start_ts < earliest_ts:
            earliest_ts = start_ts

        # Find home and away teams
        home_team = next(team['team']['abbreviation'] 
                        for team in competitors 
                        if team['homeAway'] == 'home')
        away_team = next(team['team']['abbreviation'] 
                        for team in competitors 
                        if team['homeAway'] == 'away')
        
        # Get odds data for the game
        odds_url = f"https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/{game_id}/competitions/{game_id}/odds"
        odds_response = requests.get(odds_url)
        odds_data = odds_response.json()
        
        # Add sleep between odds requests
        time.sleep(.1)
        
        # Extract spread from the first odds item
        try:
            spread = float(odds_data['items'][0]['homeTeamOdds']['current']['pointSpread']['american'])
            
            games_data.append({
                'spread': spread,
                'away': away_team,
                'home': home_team
            })
        except (KeyError, IndexError, ValueError):
            # Skip games where odds data is not available
            continue
    
    return games_data, earliest_ts

if __name__ == "__main__":
    # Example usage
    week = 5  # Change this to the desired week
    lines, earliest_ts = get_nfl_lines(week)
    # Print each game on a single line with minimal whitespace
    print("[")
    for i, game in enumerate(lines):
        line = f"  {json.dumps(game)}"
        if i < len(lines) - 1:
            line += ","
        print(line)
    print("]")
    print(len(lines))
    print(earliest_ts)
    print(1000000000000000000)
