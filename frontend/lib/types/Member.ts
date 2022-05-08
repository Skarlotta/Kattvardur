export interface Person{
    id: string,
    name: string,
    ssn: string,
    address: string,
    city: string,
    postcode: string,
    country: string,
    phoneNumber: string,
    comment: string,
    email: string,
}

export interface Member{
    id: string,
    person: Person,
    active: boolean,
    joined: string,
}