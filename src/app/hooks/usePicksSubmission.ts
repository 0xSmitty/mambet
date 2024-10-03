import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { convertPicksToString } from '../utils/pickHelpers'
import { mambetABI } from '../constants/mambetABI'
import { contractAddress } from '../constants/contractAddress'

const usePicksSubmission = () => {
  const { writeContract, data: hash, isError: isPicksError, isPending: isLoading } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const submitPicks = (picks: { [key: number]: 'away' | 'home' | null }, numGames: number, hasPicked: boolean) => {
    const picksString = convertPicksToString(picks)
    const value = hasPicked ? parseEther('0') : parseEther('1');
    if (picksString.length !== numGames) {
      console.error('Picks string length does not match the number of games')
    }
    writeContract({
      address: contractAddress,
      abi: mambetABI,
      functionName: 'submitPicks',
      args: [picksString],
      value: value, // Send avax
    })
  }

  return { submitPicks, isPicksError, isLoading, isSuccess }
}

export default usePicksSubmission
