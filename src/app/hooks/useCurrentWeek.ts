import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'
import { contractAddress } from '../constants/contractAddress'

export const useCurrentWeek = () => {
  const { data, isError, isLoading } = useReadContract({
    address: contractAddress,
    abi: mambetABI,
    functionName: 'currentWeek',
  })

  // Convert BigInt to number, or return undefined if data is undefined
  const currentWeek = data !== undefined ? Number(data) : undefined

  return { currentWeek, isError, isLoading }
}
