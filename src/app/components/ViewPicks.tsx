import React, { useState, useEffect, useCallback } from 'react'
import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { games, weekIdToWeekNumber } from '../constants/games'
import GamePicker from './GamePicker'
import { useAllParticipantsPicks } from '../hooks/useAllParticipantsPicks'
import { useNameCache } from '../hooks/useNameCache'
import { useGameResults } from '../hooks/useGameResults'

// Create a cache outside the component to persist across re-renders
const nameCache: { [key: string]: string } = {}

const ViewPicks: React.FC = () => {
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  const [selectedWeek, setSelectedWeek] = useState<number | undefined>(currentWeek)
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [correctPicksCount, setCorrectPicksCount] = useState(0)
  const { addressNames, fetchMissingNames } = useNameCache()

  const { picks: allPicks, participants, isLoading: isPicksLoading, isError: isPicksError } = useAllParticipantsPicks(selectedWeek)

  let weekNumber = 0;
  if(selectedWeek !== undefined) {
    weekNumber = Number(weekIdToWeekNumber[selectedWeek]);
  }
  const { gameResults, isLoading: isResultsLoading, error: resultsError } = useGameResults(weekNumber)
  
  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(participants[0])
    }
    fetchMissingNames(participants)
  }, [participants, fetchMissingNames])

  const handleCorrectPicksCount = useCallback((count: number) => {
    setCorrectPicksCount(count)
  }, [selectedWeek, selectedParticipant])

  if (isWeekLoading || isPicksLoading || isResultsLoading) return <p>Loading...</p>
  if (isWeekError || isPicksError || resultsError) return <p>Error loading data</p>

  const weekOptions = Array.from({ length: Number(currentWeek) + 1 }, (_, i) => i)
  const currentGames = selectedWeek !== undefined ? games[selectedWeek] : []

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
            <option key={week} value={week}>{"Week" + weekIdToWeekNumber[week]}</option>
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
          <div className="mb-4 text-center">
            <span className="font-bold">Correct Picks: {correctPicksCount}</span>
          </div>
          <GamePicker
            games={currentGames}
            picks={{}}
            userPicks={allPicks[selectedParticipant] || {}}
            onPickSelection={() => {}}
            viewOnly={true}
            gameResults={gameResults}
            onCorrectPicksCount={handleCorrectPicksCount}
          />
        </>
      )}
    </div>
  )
}

export default ViewPicks
