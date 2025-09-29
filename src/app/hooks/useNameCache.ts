import { useState, useCallback } from 'react';
import { mamboProfileInstance } from '../services/mamboProfileInstance';
import { Address } from 'viem';
import { formatAddress } from '../utils/format';

const globalNameCache: { [key: string]: string } = {};

export function useNameCache() {
  const [addressNames, setAddressNames] = useState<{[key: string]: string}>(globalNameCache);

  const fetchMissingNames = useCallback(async (addresses: Address[]) => {
    const missingAddresses = addresses.filter(addr => !globalNameCache[addr]);
    if (missingAddresses.length === 0) return;

    try {
      const profiles = await mamboProfileInstance.getManyProfiles(missingAddresses);
      
      if (profiles !== undefined) {
        const newNames = Object.entries(profiles).reduce((acc, [address, profile]) => {
          acc[address] = profile.mamboName || profile.avvyName || formatAddress(address as Address);
          return acc;
        }, {} as Record<string, string>);
        
        Object.assign(globalNameCache, newNames);
        setAddressNames({...globalNameCache});
      } else {
        console.error('Profiles is not an object:', profiles);
      }
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  }, []);

  return { addressNames, fetchMissingNames };
}
