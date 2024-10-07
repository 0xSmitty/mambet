'use client'

import { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import Navigation from './components/Navbar/Navigation'
import GamePicker, { Game, PickResult } from './components/GamePicker'
import SubmitButton from './components/SubmitButton'
import ViewPicks from './components/ViewPicks'
import WeekInfoDisplay from './components/WeekInfoDisplay'
import { games, weekIdToWeekNumber } from './constants/games'
import usePicksSubmission from './hooks/usePicksSubmission'
import { useUserPicks } from './hooks/useUserPicks'
import { useCurrentWeek } from './hooks/useCurrentWeek'
import { useWeekInfo } from './hooks/useWeekInfo'
import { useGameResults } from './hooks/useGameResults'
import { generateResolveWeekString } from './utils/pickHelpers'
import { getPickResult } from './utils/pickHelpers'

function App() {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<'make-picks' | 'view-picks'>('make-picks')
  const [picks, setPicks] = useState<{ [key: number]: 'away' | 'home' | null }>({})
  const [hasPicked, setHasPicked] = useState(false);
  const { submitPicks, isPicksError, isLoading: isSubmitLoading, isSuccess } = usePicksSubmission()
  const { currentWeek, isLoading: isWeekLoading, isError: isWeekError } = useCurrentWeek()
  const { weekInfo, isLoading: isWeekInfoLoading, isError: isWeekInfoError } = useWeekInfo(currentWeek);
  const [currentGames, setCurrentGames] = useState<Game[]>([])
  const [pickResults, setPickResults] = useState<{ [key: number]: PickResult }>({})

  const isClosed = weekInfo?.closed;
  let weekNumber = undefined;
  if(currentWeek !== undefined) {
    weekNumber = Number(weekIdToWeekNumber[currentWeek]);
  }

  const { userPicks, isLoading: isUserPicksLoading, isError: isUserPicksError } = useUserPicks(currentWeek, currentGames.length);
  const { gameResults, isLoading: isResultsLoading, error: resultsError } = useGameResults(weekNumber)

  useEffect(() => {
    if (userPicks.length > 0) {
      setHasPicked(true);
    }
  }, [userPicks]);

  useEffect(() => {
    if (isSuccess) {
      setHasPicked(true);
    }
  }, [isSuccess]);

  const handlePickSelection = (gameId: number, pick: 'away' | 'home') => {
    setPicks(prevPicks => ({ ...prevPicks, [gameId]: pick }))
  }

  useEffect(() => {
    if (gameResults && currentWeek !== undefined) {
      const updatedGames = games[currentWeek].map((game, index) => {
        const result = gameResults.find(r => r.homeTeam === game.home && r.awayTeam === game.away)
        let pickResult: PickResult = 'pending'

        if (result) {
          game.awayLogo = result.awayTeamLogoURL
          game.homeLogo = result.homeTeamLogoURL

          if (result.completed && picks[index]) {
            pickResult = getPickResult(game, picks[index], result)
          }
        }

        setPickResults(prev => ({ ...prev, [index]: pickResult }))

        return game
      })

      setCurrentGames(updatedGames)
    }
  }, [gameResults, currentWeek, picks])

  const correctPicksCount = Object.values(pickResults).filter(result => result === 'correct').length

  // Use useCallback to memoize the function
  const initializePicks = useCallback(() => {
    if (userPicks.length > 0) {
      const initialPicks = userPicks.reduce((acc, pick, index) => {
        acc[index] = pick === 0 ? 'away' : pick === 1 ? 'home' : null;
        return acc;
      }, {} as { [key: number]: 'away' | 'home' | null });
      setPicks(initialPicks);
    }
  }, [userPicks]);

  // Use the memoized function in useEffect
  useEffect(() => {
    if (!isUserPicksLoading && !isUserPicksError) {
      initializePicks();
    }
  }, [isUserPicksLoading, isUserPicksError, initializePicks]);

  // Generate the resolve week string (lazy)
  useEffect(() => {
    if (gameResults && currentWeek !== undefined) {
      const weekString = generateResolveWeekString(games[currentWeek], gameResults)
      if (Number(weekString) > 0) console.log(weekString);
    }
  }, [gameResults, currentWeek])

  if (isWeekLoading) return <p>Loading current week...</p>
  if (isWeekError) return <p>Error loading current week</p>

  // get game count for contract input (lazy)
  console.log(currentGames.length);
  return (
    <div className="container mx-auto px-4 py-8">
      <Navigation />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">NFL Pick'em</h1>
          {weekInfo && !isWeekInfoLoading && !isWeekInfoError && (
            <WeekInfoDisplay prizePool={weekInfo.prizePool} participants={weekInfo.participants} />
          )}
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
              {correctPicksCount > 0 ?
              <div className="mt-4 text-center">
                <span className="font-bold">Correct Picks: {correctPicksCount}</span>
              </div> : null}
              <GamePicker 
                games={currentGames} 
                picks={picks} 
                onPickSelection={handlePickSelection} 
                viewOnly={isClosed} 
                pickResults={pickResults}
              />
              {address ? (
              <SubmitButton 
                onSubmit={() => submitPicks(picks, currentGames.length, hasPicked)} 
                hasPicked={hasPicked}
                isLoading={isSubmitLoading}
                isError={isPicksError}
                error={isPicksError ? "Error submitting picks" : null}
                isClosed={isClosed}
                isFilledOut={Object.keys(picks).length === currentGames.length}
              />
              ) : null}
            </>
          ) : (
            <ViewPicks />
          )}
        </div>
    </div>
  )
}

export default App