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
            throw new Error('Failed to fetch zipcodes');
        }

        return res.json() as Promise<{id: string, code:string}[]>;
        
    } catch (error) {
        console.error("Error fetching zipcodes:", error);
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


type FormData = {
  growerId: string;
  citizenId: string;
  firstName: string;
  lastName: string;
  gender: string;
  citizenIdIssueDate: string;
  citizenIdExpiryDate: string;
  citizenBirthDate: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  state: string;
  city: string;
  zipcode: string;
  photo: File; 
};

export async function createGrowersData(formData:FormData) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/growers/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // tells server it’s JSON
    },
    body: JSON.stringify(formData), // convert object → JSON string
  });
  
  if (!response.ok) {
    throw new Error("Failed to create grower");
  }

  return response.json();
}