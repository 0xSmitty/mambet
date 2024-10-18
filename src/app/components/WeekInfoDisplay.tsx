'use client'

import React, { useEffect, useState } from 'react'
import { formatEther } from 'viem'
import { useNameCache } from '../hooks/useNameCache'

interface WeekInfoDisplayProps {
  prizePool: bigint
  participants: string[]
}

interface MamboNameData {
  address: string
  avvyName?: string
  mamboName?: string
  // Add other properties if needed
}

const WeekInfoDisplay: React.FC<WeekInfoDisplayProps> = ({ prizePool, participants }) => {
  const { addressNames, fetchMissingNames } = useNameCache()

  useEffect(() => {
    const updateNames = async (participants: string[]) => {
      try {
        await fetchMissingNames(participants)
      } catch (error) {
        console.error('Error fetching Mambo names:', error)
      }
    }

    updateNames(participants)
  }, [participants])

  const getDisplayName = (address: string): string => {
    const name = addressNames[address]
    return name || address.slice(0, 6) + '...'
  }

  const participantSpans = participants.map((participant, index) => (
    <span key={index} className="ticker-item">
      {getDisplayName(participant)}
    </span>
  ));

  return (
    <div className="rounded-lg p-6 mb-8 text-center">
      <div className="mb-4">
        <p className="text-xl text-gray-300">
          Current Prize Pool: <span className="font-bold text-green-400">{formatEther(prizePool)} AVAX</span>
        </p>
      </div>
      <div className="ticker-wrapper">
        <div className="ticker-content">
          {participantSpans}
          {participantSpans}
        </div>
      </div>
    </div>
  )
}

export default WeekInfoDisplay
