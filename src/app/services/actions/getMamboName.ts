'use server'

export async function getMamboNameApi(winnerAddress: string) {
    if (winnerAddress) {
        try {
            const response = await fetch(`https://names.raffllrr.xyz/names`, {
                method: 'POST',    
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addresses: [winnerAddress] }),
                
            });

            if (response.status >= 400) {
                throw new Error('There was an error');
            }

            const data = await response.json();            
            // Vérifiez si winnerAddress est présent dans la réponse
            if (data.hasOwnProperty(winnerAddress)) {
                const mamboName = data[winnerAddress].mamboName || data[winnerAddress].avvyName;
                return mamboName;
            } else {
                throw new Error('Winner address not found in the response');
            }
        } catch (error) {
            throw new Error('There was an error');
            
        }
    } else {
        throw new Error('No winner address provided');
    }
}

export async function getManyMamboNamesApi(addresses: string[]) {
    if (addresses.length > 0) {
        try {
            const response = await fetch(`https://names.raffllrr.xyz/names`, {
                method: 'POST',    
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addresses: addresses }),
            });

            if (response.status >= 400) {
                throw new Error('There was an error');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('There was an error');
        }
    } else {
        throw new Error('No addresses provided');
    }
}