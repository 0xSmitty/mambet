import { useReadContract, useAccount } from 'wagmi'
import { useMemo } from 'react'
import { mambetABI } from '../constants/mambetABI'
import { convertBytesToPicks } from '../utils/pickHelpers'
import { contractAddress } from '../constants/contractAddress'

export const useUserPicks = (week: number | undefined, numGames: number) => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'getUserPicks',
    args: [address, week],
  })

  const userPicks = useMemo(() => {
    return data ? convertBytesToPicks(data as string, numGames) : []
  }, [data, numGames])

  return { userPicks, isError, isLoading }
}
