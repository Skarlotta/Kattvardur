import { CSRFTokenString } from "./lib/components/forms/src/blocks/GenericForm/util";

type CacheEntry = {
    url : string,
    ttl : number,
    result : any,
}

const cache : {[key:string]: CacheEntry} = {};

const csfr = CSRFTokenString();

export const jsonFetch = async function<Type>(url : string, options?:any) : Promise<Type> {
    const headers = {
        'X-CSRFToken' : csfr,
        'content-type' : 'application/json'
    }
    return new Promise<Type>((resolve, reject) => {
        fetch(url, {
            ...options,
            headers : {
                ...options?.headers,
                ...headers
            }
        }).then(res => {
            if(res.status >= 200 && res.status < 400){
                res.json().then(resolve);
            } else {
                reject(res);
            }
        });
    });
}

export const cacheFetch = async function<Type>(url : string, ...args:any) : Promise<Type> {
    if(url in cache){
        const entry = cache[url];
        if(Date.now() < entry.ttl){
            return new Promise<Type>((resolve) => {
                resolve(entry.result);
            })
        }
    }
    const ttl = args.ttl || 1;
    return new Promise<Type>(resolve => {
        fetch(url, args).then(res => 
            res.json().then((data: Type) => {
                cache[url] = {
                    url,
                    ttl: new Date().getTime() + ttl * 60000,
                    result: data
                };
                resolve(data);
            })
        )
    });
}

export default cacheFetch;