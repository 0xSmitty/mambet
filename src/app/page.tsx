'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import Navigation from './components/Navbar/Navigation'
import GamePicker from './components/GamePicker'
import SubmitButton from './components/SubmitButton'
import { games } from './constants/games'
import usePicksSubmission from './hooks/usePicksSubmission'
import { useUserPicks } from './hooks/useUserPicks'
import { useCurrentWeek } from './hooks/useCurrentWeek'

function App() {
  const { address } = useAccount()
  const [picks, setPicks] = useState<{ [key: number]: 'away' | 'home' | null }>({})
  const { submitPicks, isLoading, isError } = usePicksSubmission()
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  
  const currentGames = currentWeek !== undefined ? games[currentWeek] : []
  const { userPicks, isLoading: isPicksLoading, isError: isPicksError } = useUserPicks(currentWeek, currentGames.length);
  const hasPicked = userPicks.length > 0;
  const handlePickSelection = (gameId: number, pick: 'away' | 'home') => {
    if(hasPicked) return;
    setPicks(prevPicks => ({ ...prevPicks, [gameId]: pick }))
  }

  if (isWeekLoading) return <p>Loading current week...</p>
  if (isWeekError) return <p>Error loading current week</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <Navigation />
      {address ? (
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">NFL Pick'em</h1>
          <GamePicker games={currentGames} picks={picks} userPicks={userPicks} onPickSelection={handlePickSelection} />
          <SubmitButton onSubmit={() => submitPicks(picks, currentGames.length)} isLoading={isLoading} hasPicked={hasPicked} />
        </div>
      ) : (
        <p className="text-center text-xl">Please connect your wallet to make picks.</p>
      )}
    </div>
  )
}

export default App
