import { useWriteContract } from 'wagmi'
import { parseEther } from 'viem'
import { convertPicksToString } from '../utils/pickHelpers'
import { mambetABI } from '../constants/mambetABI'

const usePicksSubmission = () => {
  const { writeContract, isError: isPicksError, isPending: isLoading } = useWriteContract()

  const submitPicks = (picks: { [key: number]: 'away' | 'home' | null }, numGames: number) => {
    const picksString = convertPicksToString(picks)
    if (picksString.length !== numGames) {
      console.error('Picks string length does not match the number of games')
    }
    writeContract({
      address: '0xc938EB809b60B8Cfc86Cb1Ee2622A5aB1090fD30', // Your contract address
      abi: mambetABI, // Your contract ABI
      functionName: 'submitPicks',
      args: [picksString],
      value: parseEther('1'), // Send 1 AVAX
    })
  }

  return { submitPicks, isPicksError, isLoading }
}

export default usePicksSubmission
