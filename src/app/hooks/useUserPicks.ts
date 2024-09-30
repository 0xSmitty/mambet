import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { convertBytesToPicks } from '../utils/pickHelpers'

export const useUserPicks = (week: number, numGames: number) => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useReadContract({
    address: '0xc938EB809b60B8Cfc86Cb1Ee2622A5aB1090fD30',
    abi: mambetABI,
    functionName: 'getUserPicks',
    args: [address, week],
  })

  const userPicks = data ? convertBytesToPicks(data as string, numGames) : []
  return { userPicks, isError, isLoading }
}
