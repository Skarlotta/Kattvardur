import { Person } from "./Member"

export interface ApiShow{
    id: string
    name: string
    organizer?: string,
    date: Date,
    location: string,
    openForRegistration: boolean,
    interntional: boolean,
    judges: string[]
}

export interface Show{
    id: string
    name: string
    organizer?: Person,
    date: Date,
    location: string,
    openForRegistration: boolean,
    interntional: boolean,
    judges: Person[]
}