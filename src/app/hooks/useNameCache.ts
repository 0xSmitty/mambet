import { useState, useCallback } from 'react';
import { getManyMamboNamesApi } from '../services/actions/getMamboName';

const globalNameCache: { [key: string]: string } = {};

export function useNameCache() {
  const [addressNames, setAddressNames] = useState<{[key: string]: string}>(globalNameCache);

  const fetchMissingNames = useCallback(async (addresses: string[]) => {
    const missingAddresses = addresses.filter(addr => !globalNameCache[addr]);
    if (missingAddresses.length === 0) return;

    try {
      const data = await getManyMamboNamesApi(missingAddresses);
      const newNames = Object.fromEntries(
        Object.entries(data).map(([address, nameData]: [string, any]) => [
          address,
          nameData.mamboName || nameData.avvyName || address
        ])
      );
      
      Object.assign(globalNameCache, newNames);
      setAddressNames({...globalNameCache});
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  }, []);

  return { addressNames, fetchMissingNames };
}
