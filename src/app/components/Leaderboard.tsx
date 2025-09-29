import React, { useState, useEffect, useMemo } from 'react'
import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { games, weekIdToWeekNumber } from '../constants/games'
import GamePicker, { Game, GameResult, PickResult } from './GamePicker'
import { useAllParticipantsPicks } from '../hooks/useAllParticipantsPicks'
import { useNameCache } from '../hooks/useNameCache'
import { Address } from 'viem'
import { formatAddress } from '../utils/format'

interface LeaderboardProps {
    gameResults: { [weekNumber: number]: GameResult[] }
    pickResults: { [weekNumber: number]: { [address: string]: { [gameId: number]: 0 | 1 } } }
    isLoading: boolean
    error: string | null
}

interface PlayerData {
    address: Address
    correctPicks: number
    incorrectPicks: number
    tiePicks: number
}

const getPickResult = (game: Game, pick: 0 | 1, result: GameResult): PickResult => {
    const adjustedHomeScore = result.homeScore + game.spread
    if (adjustedHomeScore === result.awayScore) {
      return 'draw'
    }
    if (pick === 1) {
      return adjustedHomeScore > result.awayScore ? 'correct' : 'incorrect'
    }
    return adjustedHomeScore < result.awayScore ? 'correct' : 'incorrect'
  }


const Leaderboard: React.FC<LeaderboardProps> = ({ gameResults, pickResults, isLoading, error }) => {

    const { addressNames, fetchMissingNames } = useNameCache();


    const data: { [address: Address]: PlayerData } = {};


    if (!gameResults || !pickResults) {
        return <p>Loading...</p>
    }

    for (const week in pickResults) {
        for (const address in pickResults[week]) {
            if (!data[address as Address]) {
                data[address as Address] = { address: address as Address, correctPicks: 0, incorrectPicks: 0, tiePicks: 0 };
            }
            for (const index in pickResults[week][address]) {
                const pick = pickResults[week][address][index]
                const game = games[week][index]
                const result = gameResults[week]?.find(r => r.homeTeam === game.home && r.awayTeam === game.away)
                if (!result) {
                    console.error(`Game not found for ${game.home} @ ${game.away}`);
                    continue;
                }
                const pickResult = getPickResult(game, pick, result)
                if (pickResult === 'correct') {
                    data[address as Address].correctPicks++
                } else if (pickResult === 'incorrect') {
                    data[address as Address].incorrectPicks++
                } else if (pickResult === 'draw') {
                    data[address as Address].tiePicks++
                }
            }
        }
    }

    fetchMissingNames(Object.keys(data) as Address[])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    
    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <h1 className="text-5xl font-bold mb-6 text-center text-white">Leaderboard</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-3 py-1 text-left text-2xl font-bold text-white">Player</th>
                            <th className="px-3 py-1 text-right text-2xl font-bold text-white">Record</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {Object.values(data)
                            .sort((a, b) => b.correctPicks - a.correctPicks)
                            .map((player) => (
                                <tr key={player.address}>
                                    <td className="px-3 py-2 text-xl text-gray-300">
                                        {addressNames[player.address] || formatAddress(player.address)}
                                    </td>
                                    <td className="px-3 py-2 text-xl text-right text-gray-300">
                                        {`${player.correctPicks} - ${player.incorrectPicks}`}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Leaderboard.displayName = 'Leaderboard'

export default Leaderboard;