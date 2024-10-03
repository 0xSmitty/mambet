import { Game, GameResult, PickResult } from "../components/GamePicker";
import { games } from "../constants/games";

export const convertPicksToString = (picks: { [key: number]: 'away' | 'home' | null }) => {
  return Object.values(picks).map(pick => pick === 'home' ? '1' : '0').join('')
}

export const convertBytesToPicks = (bytes32: string, numGames: number): number[] => {
  if (!bytes32 || bytes32 === '0x0000000000000000000000000000000000000000000000000000000000000000') {
    return []
  }

  // Remove '0x' prefix and convert to binary
  const binaryString = BigInt(bytes32).toString(2).padStart(256, '0')
  
  // Get only the relevant bits (from right to left)
  const relevantBits = binaryString.slice(-numGames)
  // Convert binary string to array of picks (0 for away, 1 for home)
  return relevantBits.split('').map(Number)
}

export const isPickCorrect = (game: Game, pick: 'away' | 'home', result: GameResult) => {
  if (game.home === result.homeTeam && pick === 'home') {
    return true
  } else if (game.away === result.awayTeam && pick === 'away') {
    return true
  }
  return false
}

export const getPickResult = (game: Game, pick: 'away' | 'home', result: GameResult): PickResult => {
  const adjustedHomeScore = result.homeScore + game.spread
  if (adjustedHomeScore === result.awayScore) {
    return 'draw'
  }
  if (pick === 'home') {
    return adjustedHomeScore > result.awayScore ? 'correct' : 'incorrect'
  }
  return adjustedHomeScore < result.awayScore ? 'correct' : 'incorrect'
}


export const generateResolveWeekString = (games: Game[], results: GameResult[]) => {
  return games.map(game => {
    // Find the corresponding result
    const result = results.find(r => r.homeTeam == game.home && r.awayTeam == game.away);
    if (!result) {
      console.warn(`No matching result found for ${game.away} @ ${game.home}`);
      return '0'; // Default to '0' if no result is found
    }

    const homeCovered = result.homeScore + game.spread > result.awayScore;
    const adjustedHomeScore = result.homeScore + game.spread;
    if (adjustedHomeScore > result.awayScore) {
      return 1;
    }
    if( adjustedHomeScore < result.awayScore) {
      return 0;
    }
    return 2;
  }).join('');
}
