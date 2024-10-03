import React from 'react'

type Props = {
  onSubmit: () => void
  isLoading: boolean
  isError: boolean
  error: string | null
  hasPicked: boolean
  isClosed: boolean
  isFilledOut: boolean
}

const SubmitButton: React.FC<Props> = ({ onSubmit, isLoading, isError, error, hasPicked, isClosed, isFilledOut }) => {
  return (
    <div className="mt-8 text-center">
      <button 
        onClick={onSubmit}
        className="bg-green-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={isLoading || isClosed || !isFilledOut}
      >
        {isLoading ? 'Submitting...' : isClosed? 'Week Closed': hasPicked ? 'Update Picks (Free)' : 'Submit Picks (1 AVAX)'}
        {isError && (
        <p className="text-red-500 mt-2">Error: {error || 'An error occurred'}</p>
      )}

      </button>
    </div>
  )
}

export default SubmitButton
