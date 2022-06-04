const isBrowser = () => typeof window !== 'undefined';

export const getStorage = (key : string) => {
    return isBrowser() && window.sessionStorage.getItem(key) || "";
}

export const setStorage = (key : string, value : string) => {
    if (!isBrowser()){
        return false;
    }
    return window.sessionStorage.setItem(key, value);
}

export const removeStorage = (key : string) => {
    if (!isBrowser()){
        return false;
    }
    return window.sessionStorage.removeItem(key);
}

export const getStorageObject = (key : string) => {
    try{
        if(isBrowser()){
            const obj = window.sessionStorage.getItem(key);
            if(obj){
                return JSON.parse(obj);
            }
        }
        return false;
    } catch{
        return false;
    }
}

export const setStorageObject = (key : string, value : string) => {
    try{
        if (!isBrowser()){
            return false;
        }
        return window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch{
        return false;
    }
}
