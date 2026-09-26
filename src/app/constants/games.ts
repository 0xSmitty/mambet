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
    ]
]

export interface WeekNumberData {
    weekId: number;
    seasonType: number;
}
export const weekIdToWeekNumber: WeekNumberData[] = [
    { weekId: 1, seasonType: 2 },
]

