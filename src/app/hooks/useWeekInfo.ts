import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { Address } from 'viem'

// Define the Week interface to match the Solidity struct
interface Week {
  entryFee: bigint
  prizePool: bigint
  participants: Address[]
  resolved: boolean
  closed: boolean
  numGames: number
  winner: Address
}

export const useWeekInfo = (week: number) => {
  const { data, isError, isLoading } = useReadContract({
    address: '0xc938EB809b60B8Cfc86Cb1Ee2622A5aB1090fD30',
    abi: mambetABI,
    functionName: 'getWeekInfo',
    args: [week],
  })

  return { weekInfo: data as Week, isError, isLoading }
}
