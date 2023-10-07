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

export interface ShowOverview{
    show_id : string,
    judged : string[],
    unjudged : string[],
    abs : string[],
}

export interface Entry {
    id: string,
    cat_model : CatSummary,
    show: string,
    catalog_nr: string,
    guest: boolean,
    judgement: string,
    judge: string,
    judge_name: string,
}

export interface Judgement {
    id: number,
    judge_id: number,
    judgement: string,
    biv: boolean,
    abs: boolean,
    comment:string,
    nominations: number[],
    ems: string
}

export interface Judge {
    id: number,
    show_id: number,
    person_id: string,
    name: string,
    country: string,
}