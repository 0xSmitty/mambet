import React, { useState, useEffect } from 'react'
import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { games, weekIdToWeekNumber } from '../constants/games'
import GamePicker, { Game, GameResult, PickResult } from './GamePicker'
import { useAllParticipantsPicks } from '../hooks/useAllParticipantsPicks'
import { useNameCache } from '../hooks/useNameCache'
import { useGameResults } from '../hooks/useGameResults'

// Create a cache outside the component to persist across re-renders
const nameCache: { [key: string]: string } = {}

const ViewPicks: React.FC = () => {
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  const [selectedWeek, setSelectedWeek] = useState<number | undefined>(currentWeek)
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [correctPicks, setCorrectPicks] = useState<{ [key: number]: boolean }>({})

  const { addressNames, fetchMissingNames } = useNameCache()
  const [formattedPicks, setFormattedPicks] = useState<{ [key: number]: 'away' | 'home' | null }>({})

  const { picks: allPicks, participants, isLoading: isPicksLoading, isError: isPicksError } = useAllParticipantsPicks(selectedWeek)

  let weekNumber = selectedWeek !== undefined ? Number(weekIdToWeekNumber[selectedWeek]) : 0;
  const { gameResults, isLoading: isResultsLoading, error: resultsError } = useGameResults(weekNumber)
  const [pickResults, setPickResults] = useState<{ [key: number]: PickResult }>({})
  const weekOptions = Array.from({ length: Number(currentWeek) + 1 }, (_, i) => i)
  const currentGames = selectedWeek !== undefined ? games[selectedWeek] : []

  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(participants[0])
    }
    fetchMissingNames(participants)
  }, [participants, fetchMissingNames, selectedParticipant])

  // New effect to format picks when selectedParticipant or selectedWeek changes
  useEffect(() => {
    if (selectedParticipant && selectedWeek !== undefined && allPicks[selectedParticipant]) {
      const participantPicks = allPicks[selectedParticipant];
      const formatted = Object.entries(participantPicks).reduce((acc, [gameIndex, pick]) => {
        acc[Number(gameIndex)] = pick === 0 ? 'away' : pick === 1 ? 'home' : null;
        return acc;
      }, {} as { [key: number]: 'away' | 'home' | null });
      setFormattedPicks(formatted);
    } else {
      setFormattedPicks({});
    }
  }, [selectedParticipant, selectedWeek, allPicks]);

  useEffect(() => {
    if (gameResults && formattedPicks) {
      const newPickResults = currentGames.reduce((acc, game, index) => {
        const result = gameResults.find(r => r.homeTeam === game.home && r.awayTeam === game.away)
        if (result?.completed && formattedPicks[index]) {
          acc[index] = getPickResult(game, formattedPicks[index], result)
        } else {
          acc[index] = 'pending'
        }
        return acc
      }, {} as { [key: number]: PickResult })
      setPickResults(newPickResults)
    }
  }, [gameResults, formattedPicks, currentGames])

  const getPickResult = (game: Game, pick: 'away' | 'home', result: GameResult): PickResult => {
    const adjustedHomeScore = result.homeScore + game.spread
    if (adjustedHomeScore === result.awayScore) {
      return 'draw'
    }
    if (pick === 'home') {
      return adjustedHomeScore > result.awayScore ? 'correct' : 'incorrect'
    }
    return adjustedHomeScore < result.awayScore ? 'correct' : 'incorrect'
  }

  const correctPicksCount = Object.values(pickResults).filter(result => result === 'correct').length

  if (isWeekLoading || isPicksLoading || isResultsLoading) return <p>Loading...</p>
  if (isWeekError || isPicksError || resultsError) return <p>Error loading data</p>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="week-select" className="mr-2">Select Week:</label>
        <select
          id="week-select"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="border rounded p-1"
        >
          {weekOptions.map((week) => (
            <option key={week} value={week}>{"Week " + weekIdToWeekNumber[week]}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="participant-select" className="mr-2">Select Participant:</label>
        <select
          id="participant-select"
          value={selectedParticipant || ''}
          onChange={(e) => setSelectedParticipant(e.target.value)}
          className="border rounded p-1"
        >
          {participants.map((participant) => (
            <option key={participant} value={participant}>
              {addressNames[participant] || participant}
            </option>
          ))}
        </select>
      </div>
      {selectedParticipant && (
        <>
          {correctPicksCount > 0 ? (
            <div className="mb-4 text-center">
              <span className="font-bold">Correct Picks: {correctPicksCount}</span>
            </div>) : null}
          <GamePicker
            games={currentGames}
            picks={formattedPicks}
            onPickSelection={() => {}}
            viewOnly={true}
            pickResults={pickResults}
          />
        </>
      )}
    </div>
  )
}

export default ViewPicks
