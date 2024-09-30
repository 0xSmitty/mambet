import React from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'

type Game = {
  spread: number
  away: string
  home: string
}

type GameResult = {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  completed: boolean
}

type Props = {
  games: Game[]
  picks: { [key: number]: 'away' | 'home' | null }
  userPicks: { [key: number]: number }
  onPickSelection: (gameId: number, pick: 'away' | 'home') => void
  viewOnly?: boolean
  gameResults?: GameResult[]
}

const GamePicker: React.FC<Props> = ({ games, picks, userPicks, onPickSelection, viewOnly = false, gameResults }) => {
  const formatSpread = (spread: number) => {
    return spread > 0 ? `+${spread}` : spread.toString()
  }

  const isPickCorrect = (game: Game, pick: 'away' | 'home', result: GameResult) => {
    if( pick === 'home'){
      return result.homeScore + game.spread > result.awayScore;
    }
    return result.homeScore + game.spread < result.awayScore;
  }

  return (
    <div className="space-y-4">
      {games.map((game, index) => {
        const result = gameResults?.find(r => r.homeTeam === game.home && r.awayTeam === game.away)
        const userPick = userPicks[index] === 0 ? 'away' : userPicks[index] === 1 ? 'home' : null
        const isCorrect = result?.completed && userPick ? isPickCorrect(game, userPick, result) : null
        console.log("=======pick stuff========");
        console.log(isCorrect);
        console.log(result);
        console.log(game);
        console.log(userPick);
        
        return (
          <div key={index} className="flex flex-row justify-center items-center gap-2">
            <button
              onClick={() => !viewOnly && onPickSelection(index, 'away')}
              disabled={viewOnly}
              className={`w-24 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                picks[index] === 'away' || userPicks[index] === 0
                  ? game.away 
                  : 'bg-gray-200 text-gray-800'
              } ${!viewOnly && 'hover:opacity-80'} ${viewOnly && 'cursor-default'}`}
            >
              {`${game.away} ${formatSpread(-game.spread)}`}
            </button>
            <span className="text-gray-500">@</span>
            <button
              onClick={() => !viewOnly && onPickSelection(index, 'home')}
              disabled={viewOnly}
              className={`w-24 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                picks[index] === 'home' || userPicks[index] === 1
                  ? game.home 
                  : 'bg-gray-200 text-gray-800'
              } ${!viewOnly && 'hover:opacity-80'} ${viewOnly && 'cursor-default'}`}
            >
              {`${game.home} ${formatSpread(game.spread)}`}
            </button>
            <span className="w-6 flex justify-center">
              {isCorrect !== null && (
                isCorrect ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />
              )}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default GamePicker
