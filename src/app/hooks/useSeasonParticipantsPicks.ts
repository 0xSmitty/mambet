import { useState, useEffect } from 'react'
import { useReadContracts } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { contractAddress } from '../constants/contractAddress'
import { convertBytesToPicks } from '../utils/pickHelpers'
import { Abi, Address } from 'viem'

interface Week {
  entryFee: bigint
  prizePool: bigint
  participants: Address[]
  resolved: boolean
  closed: boolean
  numGames: number
  winner: Address
}

export const useSeasonParticipantsPicks = (weeks: number[]) => {
  const [picks, setPicks] = useState<{ [week: number]: { [address: string]: { [gameId: number]: number } } }>({})
  const [participants, setParticipants] = useState<{ [week: number]: Address[] }>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // First get all week info
  const weekInfoCalls = weeks.map((week) => ({
    abi: mambetABI as Abi,
    address: contractAddress as Address,
    functionName: "getWeekInfo",
    args: [week],
  }))

  const { data: weekInfos, isLoading: isWeekInfoLoading, isError: isWeekInfoError } = useReadContracts({
    contracts: weekInfoCalls,
  })

  // Then get picks for each week's participants
  const picksCalls = weeks.map((week, idx) => {
    const weekInfo = weekInfos?.[idx]?.result as Week | undefined
    if (!weekInfo) return null

    return {
      abi: mambetABI as Abi,
      address: contractAddress as Address,
      functionName: "getWeekPicks",
      args: [week, weekInfo.participants],
    }
  }).filter((call): call is NonNullable<typeof call> => call !== null)

  const { data: picksData, isLoading: isPicksLoading, isError: isPicksError } = useReadContracts({
    contracts: picksCalls,
  })

  useEffect(() => {
    if (isWeekInfoError || isPicksError) {
      setIsError(true)
      setIsLoading(false)
      return
    }

    if (!isWeekInfoLoading && !isPicksLoading && weekInfos && picksData) {
      const newParticipants: { [week: number]: Address[] } = {}
      const newPicks: { [week: number]: { [address: string]: { [gameId: number]: number } } } = {}

      weeks.forEach((week, idx) => {
        const weekInfo = weekInfos[idx]?.result as Week | undefined
        if (!weekInfo) return

        newParticipants[week] = weekInfo.participants
        newPicks[week] = {}

        const weekPicks = picksData[idx]?.result as string[] | undefined
        if (!weekPicks) return

        weekPicks.forEach((pickBytes32, participantIdx) => {
          const address = weekInfo.participants[participantIdx]
          const pickArray = convertBytesToPicks(pickBytes32, weekInfo.numGames)
          
          newPicks[week][address] = {}
          pickArray.forEach((pick, gameId) => {
            newPicks[week][address][gameId] = pick
          })
        })
      })

      setParticipants(newParticipants)
      setPicks(newPicks)
      setIsLoading(false)
      setIsError(false)
    }
  }, [weeks, weekInfos, picksData, isWeekInfoLoading, isPicksLoading, isWeekInfoError, isPicksError])

  return { picks, participants, isLoading, isError }
}
