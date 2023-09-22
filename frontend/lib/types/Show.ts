import { Person } from "./Member"
import { CatSummary } from "./Cat"

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

export interface Entry {
    id: string,
    cat_model : CatSummary,
    show: string,
    catalog_nr: string,
    guest: boolean,
    judgement: string
}