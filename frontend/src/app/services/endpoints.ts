const baseUrl = 'http://localhost:8080/api/'; 

export const Endpoints = {
    login: `${baseUrl}login`
}
export type EndpointKeys = keyof typeof Endpoints; 
export type lambda = (param: any) => string; 