const globalGameResultsCache: { [key: number]: Object } = {};

export const getWeekResults = async (week: number) => {
    if (globalGameResultsCache[week]) {
        return globalGameResultsCache[week];
    }
    const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2025&seasontype=2&week=${week}`)
    const data = await response.json()
    globalGameResultsCache[week] = data;
    return data;
}