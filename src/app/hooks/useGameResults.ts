import { useState, useEffect } from 'react'
import { getWeekResults } from '../services/gameResultsCache'
interface GameResult {
  homeTeam: string
  homeTeamLogoURL: string
  awayTeam: string
  awayTeamLogoURL: string
  homeScore: number
  awayScore: number
  completed: boolean
}

export const useGameResults = (week: number | undefined) => {
  const [gameResults, setGameResults] = useState<GameResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (week === undefined) return

    const fetchGameResults = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getWeekResults(week)
        
        const processedResults = data.events.map((event: any) => {
          const competition = event.competitions[0]
          const [home, away] = competition.competitors
          return {
            homeTeam: home.team.abbreviation,
            homeTeamLogoURL: home.team.logo,
            awayTeam: away.team.abbreviation,
            awayTeamLogoURL: away.team.logo,
            homeScore: parseInt(home.score),
            awayScore: parseInt(away.score),
            completed: event.status.type.completed
          }
        })
        
        setGameResults(processedResults)
      } catch (err) {
        setError('Failed to fetch game results')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGameResults()
  }, [week])

  return { gameResults, isLoading, error }
}
