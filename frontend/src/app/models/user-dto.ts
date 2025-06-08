export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: number | string; 
    password?: string; 
}
