import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { Address } from 'viem'
import { contractAddress } from '../constants/contractAddress'
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

export const useWeekInfo = (week: number | undefined) => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'getWeekInfo',
    args: [week],
  })

  return { weekInfo: data as Week, isError, isLoading }
}
