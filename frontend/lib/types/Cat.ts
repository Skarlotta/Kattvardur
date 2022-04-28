import { Registry } from "./Registry";
import { Color } from "./Color";
import { Microchip } from './Microchip';

export interface Cat{
    id : string
    name : string
    registries: Registry[]
    colors: Color[]
    dam: string,
    sire: string,
    isMale: boolean,
    cattery: string,
    country: string,
    microchips: Microchip[],
    neuter: any[],
    registration_class: string,
    birth_date: string,
}