

export interface Contact {
    Id: number;
    name: string;
    lastname:string,
    email: string;
    phone: string;
    description: string;
    
  }

    

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }