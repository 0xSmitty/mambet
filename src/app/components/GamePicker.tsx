import React from 'react'
import { FaCheck, FaTimes, FaMinus } from 'react-icons/fa'

export type Game = {
  spread: number
  away: string
  home: string
}

export type GameResult = {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  completed: boolean
}

export type PickResult = 'correct' | 'incorrect' | 'draw' | 'pending'

type Props = {
  games: Game[]
  picks: { [key: number]: 'away' | 'home' | null }
  onPickSelection: (gameId: number, pick: 'away' | 'home') => void
  viewOnly?: boolean
  pickResults?: { [key: number]: PickResult }
}

const GamePicker: React.FC<Props> = ({ 
  games, 
  picks, 
  onPickSelection, 
  viewOnly = false, 
  pickResults
}) => {
  const formatSpread = (spread: number) => {
    return spread > 0 ? `+${spread}` : spread.toString()
  }

  const renderResultIcon = (result: PickResult) => {
    switch (result) {
      case 'correct':
        return <FaCheck className="text-green-500" />
      case 'incorrect':
        return <FaTimes className="text-red-500" />
      case 'draw':
        return <FaMinus className="text-yellow-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {games.map((game, index) => {
        const result = pickResults ? pickResults[index] : null;
        return (
          <div key={index} className="flex flex-row justify-center items-center gap-2">
            <button
              onClick={() => !viewOnly && onPickSelection(index, 'away')}
              disabled={viewOnly}
              className={`w-24 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                picks[index] === 'away'
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
                picks[index] === 'home'
                  ? game.home 
                  : 'bg-gray-200 text-gray-800'
              } ${!viewOnly && 'hover:opacity-80'} ${viewOnly && 'cursor-default'}`}
            >
              {`${game.home} ${formatSpread(game.spread)}`}
            </button>
            <span className="w-6 flex justify-center">
              {result && renderResultIcon(result)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default GamePicker
