export async function getCities(stateId: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/states/${stateId}/cities`, {
            cache: 'no-store'
        });

        if(!res.ok){
            throw new Error('Failed to fetch cities');
        }

        return res.json() as Promise<{id: string, name:string}[]>;
        
    } catch (error) {
        console.error("Error fetching cities:", error);
        return [];
        
    }
}


export async function getZipCodes(cityId: string) {
try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cities/${cityId}/zipcodes`, {
            cache: 'no-store'
        });

        if(!res.ok){
            throw new Error('Failed to fetch zipcodes');
        }

        return res.json() as Promise<{id: string, code:string}[]>;
        
    } catch (error) {
        console.error("Error fetching zipcodes:", error);
        return [];
        
    }
    
}