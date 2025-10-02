import { GrowersFormData, GrowersDataResponse } from "@/types";
export async function getCities(stateId: string){
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/states/${stateId}/cities`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/cities/${cityId}/zipcodes`, {
            cache: 'no-store'
        });

        if(!res.ok){
            throw new Error('Failed to fetch zip codes');
        }

        return res.json() as Promise<{id: string, code:string}[]>;
        
    } catch (error) {
        console.error("Error fetching zip codes:", error);
        return [];
        
    }
    
}

export async function uploadPhoto(photo:File) {
    const formData = new FormData();
    formData.append("file", photo);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/growers/upload-photo`, {
    method: "POST",
    body: formData, 
  });
  
  if (!response.ok) {
    throw new Error("Failed to upload photo");
  }

  return response.json();
}




export async function createGrowersData(formData:GrowersFormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/growers/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(formData), 
  });
  
  if (!response.ok) {
    throw new Error("Failed to create grower");
  }

  return response.json();
}




export async function getAllGrowers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/growers`, {
            cache: 'no-store'
        });

        if(!res.ok){
            throw new Error('Failed to fetch growers list');
        }

        return res.json() as Promise<GrowersDataResponse[]>;
        
    } catch (error) {
        console.error("Error fetching growers list:", error);
        return [];
        
    }
    
}

export async function getGrowerById(growerId: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/growers/${growerId}`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error('Failed to fetch grower');
        }

        return res.json() as Promise<GrowersFormData>;
    } catch (error) {
        console.error(`Error fetching grower id ${growerId}:`, error);
        return null;
    }
    
}