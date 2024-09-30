import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { contractAddress } from '../constants/contractAddress'

export const useAllParticipantsPicks = (week: number | undefined) => {
  const [picks, setPicks] = useState<{ [address: string]: { [gameId: number]: number } }>({})
  const [participants, setParticipants] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Get participants for the week
  const { data: participantsData, error: participantsError, isLoading: isParticipantsLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'getWeekParticipants',
    args: [week],
    enabled: week !== undefined,
  }) as { data: string[] | undefined, error: Error | null, isLoading: boolean }

  // Get picks for the participants
  const { data: picksData, error: picksError, isLoading: isPicksLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'getWeekPicks',
    args: [week, participantsData],
    enabled: week !== undefined && participantsData !== undefined,
  })

  useEffect(() => {
    if (participantsError || picksError) {
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (!isParticipantsLoading && !isPicksLoading && participantsData && picksData) {
      setParticipants(participantsData as string[])
      
      const parsedPicks: { [address: string]: { [gameId: number]: number } } = {}
      
      ;(picksData as string[]).forEach((pickBytes32, index) => {
        const address = participantsData![index]
        const binaryString = BigInt(pickBytes32).toString(2).padStart(256, '0')
        const pickArray = binaryString.split('').reverse().map(Number)
        
        parsedPicks[address] = {}
        pickArray.forEach((pick, gameId) => {
          parsedPicks[address][gameId] = pick
        })
      })

      setPicks(parsedPicks)
      setIsLoading(false)
      setIsError(false)
    }
  }, [participantsData, picksData, isParticipantsLoading, isPicksLoading, participantsError, picksError])

  return { picks, participants, isLoading, isError }
}
