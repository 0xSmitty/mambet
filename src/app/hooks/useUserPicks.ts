import { useReadContract } from 'wagmi'
import { useAccount } from 'wagmi'
import { mambetABI } from '../constants/mambetABI'

export const useUserPicks = (week: number, numGames: number) => {
  const { address } = useAccount()
  const { data, isError, isLoading } = useReadContract({
    address: '0xc938EB809b60B8Cfc86Cb1Ee2622A5aB1090fD30',
    abi: mambetABI,
    functionName: 'getUserPicks',
    args: [address, week],
  })

  const convertBytesToPicks = (bytes32: string, numGames: number): number[] => {
    if (!bytes32 || bytes32 === '0x0000000000000000000000000000000000000000000000000000000000000000') {
      return []
    }

    // Remove '0x' prefix and convert to binary
    const binaryString = BigInt(bytes32).toString(2).padStart(256, '0')
    
    // Get only the relevant bits (from right to left)
    const relevantBits = binaryString.slice(-numGames)
    // Convert binary string to array of picks (0 for away, 1 for home)
    return relevantBits.split('').map(Number)
  }

  const userPicks = data ? convertBytesToPicks(data as string, numGames) : []
  return { userPicks, isError, isLoading }
}
