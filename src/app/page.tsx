'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import Navigation from './components/Navbar/Navigation'
import GamePicker from './components/GamePicker'
import SubmitButton from './components/SubmitButton'
import ViewPicks from './components/ViewPicks'
import { games, weekIdToWeekNumber } from './constants/games'
import usePicksSubmission from './hooks/usePicksSubmission'
import { useUserPicks } from './hooks/useUserPicks'
import { useCurrentWeek } from './hooks/useCurrentWeek'
import { useWeekInfo } from './hooks/useWeekInfo'
import { useGameResults } from './hooks/useGameResults'

function App() {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<'make-picks' | 'view-picks'>('make-picks')
  const [picks, setPicks] = useState<{ [key: number]: 'away' | 'home' | null }>({})
  const { submitPicks, isPicksError, isLoading: isSubmitLoading } = usePicksSubmission()
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  const { weekInfo, isLoading: isWeekInfoLoading, isError: isWeekInfoError } = useWeekInfo(currentWeek);
  const currentGames = currentWeek !== undefined ? games[currentWeek] : []
  const { userPicks, isLoading: isUserPicksLoading, isError: isUserPicksError } = useUserPicks(currentWeek, currentGames.length);
  const hasPicked = userPicks.length > 0;
  const isClosed = weekInfo?.closed;
  let weekNumber = 0;
  if(currentWeek !== undefined) {
    weekNumber = Number(weekIdToWeekNumber[currentWeek]);
  }

  const { gameResults, isLoading: isResultsLoading, error: resultsError } = useGameResults(weekNumber)

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
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 mr-4 rounded-full font-semibold transition-colors duration-200 ${
                activeTab === 'make-picks'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('make-picks')}
            >
              Make Picks
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                activeTab === 'view-picks'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab('view-picks')}
            >
              View Picks
            </button>
          </div>
          {activeTab === 'make-picks' ? (
            <>
              <GamePicker games={currentGames} picks={picks} userPicks={userPicks} onPickSelection={handlePickSelection} viewOnly={isClosed} gameResults={gameResults}/>
              <SubmitButton 
                onSubmit={() => submitPicks(picks, currentGames.length)} 
                hasPicked={hasPicked}
                isLoading={isSubmitLoading}
                isError={isPicksError}
                error={isPicksError ? "Error submitting picks" : null}
                isClosed={isClosed}
              />
            </>
          ) : (
            <ViewPicks />
          )}
        </div>
      ) : (
        <p className="text-center text-xl">Please connect your wallet to make picks.</p>
      )}
    </div>
  )
}

export default App
