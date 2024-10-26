import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { contractAddress } from '../constants/contractAddress'
import { convertBytesToPicks } from '../utils/pickHelpers'
import { useWeekInfo } from './useWeekInfo'
import { Address } from 'viem'
export const useAllParticipantsPicks = (week: number | undefined) => {
  const [picks, setPicks] = useState<{ [address: string]: { [gameId: number]: number } }>({})
  const [participants, setParticipants] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Get participants for the week
  const { weekInfo, isLoading: isWeekInfoLoading, isError: isWeekInfoError } = useWeekInfo(week);
  const participantsData = weekInfo?.participants || []

  // Get picks for the participants
  const { data: picksData, error: picksError, isLoading: isPicksLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'getWeekPicks',
    args: [week, participantsData],
    query: { enabled: week !== undefined && participantsData !== undefined },
  })

  useEffect(() => {
    if (isWeekInfoError || picksError) {
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (!isWeekInfoLoading && !isPicksLoading && participantsData && picksData) {
      setParticipants(participantsData)
      
      const parsedPicks: { [address: string]: { [gameId: number]: number } } = {}
      
      ;(picksData as string[]).forEach((pickBytes32, index) => {
		const address = participantsData[index]
        const pickArray = convertBytesToPicks(pickBytes32, weekInfo?.numGames || 0)
                parsedPicks[participantsData[index]] = {}
        pickArray.forEach((pick, gameId) => {
          parsedPicks[address][gameId] = pick
        })
      })

      setPicks(parsedPicks)
      setIsLoading(false)
      setIsError(false)
    }
  }, [participantsData, picksData, isWeekInfoLoading, isPicksLoading, isWeekInfoError, picksError])

  return { picks, participants, isLoading, isError }
}
