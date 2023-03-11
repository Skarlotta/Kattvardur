import { Organization } from "./Organization";

export interface Registry{
    registry?: string,
    organization? : Organization | string
    registry_date : Date,
    registry_number: Number,
    active : boolean,
    imported : boolean,
};