export const convertPicksToString = (picks: { [key: number]: 'away' | 'home' | null }) => {
  return Object.values(picks).map(pick => pick === 'home' ? '1' : '0').join('')
}
