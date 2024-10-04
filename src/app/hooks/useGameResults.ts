import { useState, useEffect } from 'react'

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
        const response = await fetch(`https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=2024&seasontype=2&week=${week}`)
        const data = await response.json()
        
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
