export const convertPicksToString = (picks: { [key: number]: 'away' | 'home' | null }) => {
  return Object.values(picks).map(pick => pick === 'home' ? '1' : '0').join('')
}

export const convertBytesToPicks = (bytes32: string, numGames: number): number[] => {
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
