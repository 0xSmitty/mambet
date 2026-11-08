import { Game } from '../components/GamePicker'

export const games: Game[][] = [
    [
        {"spread": -7.0, "away": "LAC", "home": "BUF"},
        {"spread": 2.5, "away": "CAR", "home": "CLE"},
        {"spread": -6.5, "away": "NYJ", "home": "DET"},
        {"spread": 1.5, "away": "HOU", "home": "IND"},
        {"spread": 10.0, "away": "KC", "home": "MIA"},
        {"spread": -2.5, "away": "TEN", "home": "NYG"},
        {"spread": 3.5, "away": "CIN", "home": "PIT"},
        {"spread": 7.5, "away": "SEA", "home": "WSH"},
        {"spread": -3.0, "away": "NE", "home": "JAX"},
        {"spread": -8.5, "away": "ARI", "home": "SF"},
        {"spread": 1.5, "away": "MIN", "home": "TB"},
        {"spread": 3.5, "away": "BAL", "home": "DAL"},
        {"spread": -3.0, "away": "LV", "home": "NO"},
        {"spread": 2.5, "away": "LAR", "home": "DEN"},
        {"spread": 3.5, "away": "PHI", "home": "CHI"}
    ],
    [
        {"spread": 4.5, "away": "IND", "home": "WSH"},
        {"spread": -7.0, "away": "NE", "home": "BUF"},
        {"spread": -3.5, "away": "NYJ", "home": "CHI"},
        {"spread": -2.5, "away": "JAX", "home": "CIN"},
        {"spread": 2.5, "away": "ARI", "home": "NYG"},
        {"spread": 3.5, "away": "LAR", "home": "PHI"},
        {"spread": 3.0, "away": "GB", "home": "TB"},
        {"spread": -11.5, "away": "TEN", "home": "BAL"},
        {"spread": -3.0, "away": "DAL", "home": "HOU"},
        {"spread": -10.0, "away": "MIA", "home": "MIN"},
        {"spread": 4.5, "away": "KC", "home": "LV"},
        {"spread": -3.0, "away": "DEN", "home": "SF"},
        {"spread": -7.0, "away": "LAC", "home": "SEA"},
        {"spread": 3.5, "away": "DET", "home": "CAR"},
        {"spread": -2.5, "away": "ATL", "home": "NO"}
    ],
    [
  {"spread": 1.5, "away": "CHI", "home": "GB"},
  {"spread": 7.0, "away": "HOU", "home": "TEN"},
  {"spread": 7.0, "away": "CIN", "home": "MIA"},
  {"spread": -3.5, "away": "LV", "home": "NE"},
  {"spread": 2.5, "away": "MIN", "home": "NO"},
  {"spread": -2.5, "away": "CLE", "home": "NYJ"},
  {"spread": -3.0, "away": "IND", "home": "PIT"},
  {"spread": -3.5, "away": "NYG", "home": "WSH"},
  {"spread": 3.5, "away": "DEN", "home": "LAC"},
  {"spread": 5.5, "away": "DET", "home": "ARI"},
  {"spread": -3.0, "away": "SF", "home": "SEA"},
  {"spread": -3.0, "away": "BAL", "home": "ATL"},
  {"spread": -3.5, "away": "BUF", "home": "LAR"}
],
[
  {"spread": 1.5, "away": "CHI", "home": "ATL"},
  {"spread": 3.0, "away": "BAL", "home": "CLE"},
  {"spread": -7.0, "away": "TEN", "home": "IND"},
  {"spread": -7.5, "away": "NYJ", "home": "NE"},
  {"spread": -1.5, "away": "NO", "home": "NYG"},
  {"spread": 3.0, "away": "CAR", "home": "PHI"},
  {"spread": 2.5, "away": "PIT", "home": "TB"},
  {"spread": -12.5, "away": "ARI", "home": "LAR"},
  {"spread": -7.5, "away": "LAC", "home": "KC"},
  {"spread": 5.5, "away": "BUF", "home": "LV"},
  {"spread": -1.5, "away": "DAL", "home": "GB"},
  {"spread": -7.5, "away": "WSH", "home": "SF"}
],
[
  {"spread": 2.5, "away": "SF", "home": "ATL"},
  {"spread": 2.5, "away": "CLE", "home": "TEN"},
  {"spread": -6.5, "away": "IND", "home": "MIN"},
  {"spread": -4.5, "away": "MIA", "home": "NYJ"},
  {"spread": -3.0, "away": "TB", "home": "CAR"},
  {"spread": 3.0, "away": "CIN", "home": "BAL"},
  {"spread": -10.0, "away": "NYG", "home": "HOU"},
  {"spread": 4.5, "away": "DEN", "home": "ARI"},
  {"spread": -3.5, "away": "GB", "home": "DET"},
  {"spread": 3.0, "away": "LAR", "home": "LV"},
  {"spread": -3.0, "away": "KC", "home": "SEA"},
  {"spread": 4.5, "away": "DAL", "home": "PHI"}
],
[
  {"spread": 4.5, "away": "DAL", "home": "IND"},
  {"spread": -9.5, "away": "NYJ", "home": "KC"},
  {"spread": 6.5, "away": "DET", "home": "MIA"},
  {"spread": -3.5, "away": "CLE", "home": "NO"},
  {"spread": 3.0, "away": "NYG", "home": "PHI"},
  {"spread": 4.5, "away": "LAR", "home": "WSH"},
  {"spread": 2.5, "away": "DEN", "home": "CAR"},
  {"spread": 5.5, "away": "HOU", "home": "LAC"},
  {"spread": -3.0, "away": "GB", "home": "NE"},
  {"spread": -9.5, "away": "LV", "home": "SF"},
  {"spread": -8.5, "away": "ARI", "home": "SEA"},
  {"spread": -6.0, "away": "TB", "home": "CHI"},
  {"spread": 3.0, "away": "BUF", "home": "MIN"}
]
]

export interface WeekNumberData {
    weekId: number;
    seasonType: number;
}
export const weekIdToWeekNumber: WeekNumberData[] = [
    { weekId: 3, seasonType: 2 },
    { weekId: 4, seasonType: 2 },
    { weekId: 5, seasonType: 2 },
    { weekId: 6, seasonType: 2 },
    { weekId: 7, seasonType: 2 },
    { weekId: 9, seasonType: 2 },

]

