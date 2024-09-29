import React from 'react'

type Game = {
  spread: number
  away: string
  home: string
}

type Props = {
  games: Game[]
  picks: { [key: number]: 'away' | 'home' | null }
  userPicks: { [key: number]: number }
  onPickSelection: (gameId: number, pick: 'away' | 'home') => void
}

const GamePicker: React.FC<Props> = ({ games, picks, userPicks, onPickSelection }) => {
  const formatSpread = (spread: number) => {
    return spread > 0 ? `+${spread}` : spread.toString()
  }

  return (
    <div className="space-y-4">
      {games.map((game, index) => (
        <div key={index} className="flex flex-row justify-center items-center gap-2">
          <button
            onClick={() => onPickSelection(index, 'away')}
            className={`w-24 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
              picks[index] === 'away' || userPicks[index] === 0
                ? game.away 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {`${game.away} ${formatSpread(-game.spread)}`}
          </button>
          <span className="text-gray-500">@</span>
          <button
            onClick={() => onPickSelection(index, 'home')}
            className={`w-24 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
              picks[index] === 'home' || userPicks[index] === 1
                ? game.home 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {`${game.home} ${formatSpread(game.spread)}`}
          </button>
        </div>
      ))}
    </div>
  )
}

export default GamePicker
