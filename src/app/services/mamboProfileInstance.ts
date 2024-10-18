import { MAMBOPROFILE } from 'mambo-profiles';
import { createPublicClient, http } from 'viem';
import { avalanche } from 'viem/chains';

const publicClient = createPublicClient({
  chain: avalanche,
  transport: http()
});

export const mamboProfileInstance = new MAMBOPROFILE(publicClient);
