export interface Cattery{
    id: string,
    registry_date: string,
    name: string,
    country: string,
    prefix: boolean,
    organization: string,
    email?: string,
    address?: string,
    city?: string,
    postcode?:string,
    website?:string,
    phone?:string
};