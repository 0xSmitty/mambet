import React, { useState, useEffect, useCallback } from 'react'
import { useCurrentWeek } from '../hooks/useCurrentWeek'
import { games, weekIdToString } from '../constants/games'
import GamePicker from './GamePicker'
import { useAllParticipantsPicks } from '../hooks/useAllParticipantsPicks'
import { getManyMamboNamesApi } from '../services/actions/getMamboName'

// Create a cache outside the component to persist across re-renders
const nameCache: { [key: string]: string } = {}

const ViewPicks: React.FC = () => {
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  const [selectedWeek, setSelectedWeek] = useState<number | undefined>(currentWeek)
  const [selectedParticipant, setSelectedParticipant] = useState<string | null>(null)
  const [addressNames, setAddressNames] = useState<{[key: string]: string}>(nameCache)

  const { picks: allPicks, participants, isLoading: isPicksLoading, isError: isPicksError } = useAllParticipantsPicks(selectedWeek)

  const fetchMissingNames = useCallback(async (addresses: string[]) => {
    const missingAddresses = addresses.filter(addr => !nameCache[addr])
    if (missingAddresses.length === 0) return

    try {
      const data = await getManyMamboNamesApi(missingAddresses)
      const newNames = Object.fromEntries(
        Object.entries(data).map(([address, nameData]: [string, any]) => [
          address,
          nameData.mamboName || nameData.avvyName || address
        ])
      )
      
      // Update the cache and state
      Object.assign(nameCache, newNames)
      setAddressNames(prevNames => ({ ...prevNames, ...newNames }))
    } catch (error) {
      console.error('Error fetching names:', error)
    }
  }, [])

  useEffect(() => {
    if (participants.length > 0 && !selectedParticipant) {
      setSelectedParticipant(participants[0])
    }
    fetchMissingNames(participants)
  }, [participants, fetchMissingNames])

  if (isWeekLoading || isPicksLoading) return <p>Loading...</p>
  if (isWeekError || isPicksError) return <p>Error loading data</p>

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
            <option key={week} value={week}>{weekIdToString[week]}</option>
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
        <GamePicker
          games={currentGames}
          picks={{}}
          userPicks={allPicks[selectedParticipant] || {}}
          onPickSelection={() => {}}
          viewOnly={true}
        />
      )}
    </div>
  )
}

export default ViewPicks
