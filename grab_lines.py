import requests
import json
import time

def get_nfl_lines(week: int):
    # Get the scoreboard data for the specified week
    scoreboard_url = f"https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2024&seasontype=2&week={week}"
    scoreboard_response = requests.get(scoreboard_url)
    scoreboard_data = scoreboard_response.json()

    games_data = []
    
    # Process each game in the events array
    for game in scoreboard_data.get('events', []):
        # Skip completed games
        if game['status']['type']['completed']:
            continue
            
        game_id = game['id']
        competitors = game['competitions'][0]['competitors']
        
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
        time.sleep(2)
        
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
    
    return games_data

if __name__ == "__main__":
    # Example usage
    week = 17  # Change this to the desired week
    lines = get_nfl_lines(week)
    # Print each game on a single line with minimal whitespace
    print("[")
    for i, game in enumerate(lines):
        line = f"  {json.dumps(game)}"
        if i < len(lines) - 1:
            line += ","
        print(line)
    print("]")
    print(len(lines))
