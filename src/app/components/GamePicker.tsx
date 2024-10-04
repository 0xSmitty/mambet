import React from 'react'
import { FaCheck, FaTimes, FaMinus } from 'react-icons/fa'
import Image from 'next/image'

export type Game = {
  spread: number
  away: string
  home: string
  awayLogo?: string
  homeLogo?: string
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
          <div key={index} className="flex justify-center items-center relative">
            <div className="flex items-center gap-2">
              <button
                onClick={() => !viewOnly && onPickSelection(index, 'away')}
                disabled={viewOnly}
                className={`w-32 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                  picks[index] === 'away'
                    ? game.away 
                    : 'bg-gray-200 text-gray-800'
                } ${!viewOnly && 'hover:opacity-80'} ${viewOnly && 'cursor-default'}`}
              >
                <span>{`${game.away} ${formatSpread(-game.spread)}`}</span>
              </button>
              {game.awayLogo && (
                  <Image src={game.awayLogo} alt={`${game.away} logo`} width={40} height={40} className="inline mr-2" />
                )}
              <span className="text-gray-500">@</span>
              {game.homeLogo && (
                  <Image src={game.homeLogo} alt={`${game.home} logo`} width={40} height={40} className="inline ml-2" />
                )}

              <button
                onClick={() => !viewOnly && onPickSelection(index, 'home')}
                disabled={viewOnly}
                className={`w-32 py-2 px-2 rounded-lg font-semibold text-sm transition-colors ${
                  picks[index] === 'home'
                    ? game.home 
                    : 'bg-gray-200 text-gray-800'
                } ${!viewOnly && 'hover:opacity-80'} ${viewOnly && 'cursor-default'}`}
              >                <span>{`${game.home} ${formatSpread(game.spread)}`}</span>
              </button>
            </div>
            {result && (
              <span className="absolute right-0 w-6 flex justify-center">
                {renderResultIcon(result)}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default GamePicker
