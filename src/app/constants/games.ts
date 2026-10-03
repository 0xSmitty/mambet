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
    ]
]

export interface WeekNumberData {
    weekId: number;
    seasonType: number;
}
export const weekIdToWeekNumber: WeekNumberData[] = [
    { weekId: 3, seasonType: 2 },
]

