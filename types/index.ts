  export interface GrowersFormData  {
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
    zipCode: string;
    photo: File | string | null;
    
  }

  export interface GrowersDataResponse extends GrowersFormData {
    id: number;
  }