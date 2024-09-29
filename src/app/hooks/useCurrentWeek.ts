import { useReadContract } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'

export const useCurrentWeek = () => {
  const { data, isError, isLoading } = useReadContract({
    address: '0xc938EB809b60B8Cfc86Cb1Ee2622A5aB1090fD30',
    abi: mambetABI,
    functionName: 'currentWeek',
  })

  return { currentWeek: data as number, isError, isLoading }
}
