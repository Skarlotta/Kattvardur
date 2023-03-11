const isBrowser = () => typeof window !== 'undefined';

export const removeStorage = (key : string) => {
    if (!isBrowser()){
        return false;
    }
    window.localStorage.removeItem(key);
    window.localStorage.removeItem(key+"-timeout");
    return true;
}

export const getStorageObject = (key : string) => {
    try{
        if(isBrowser()){
            const obj = window.localStorage.getItem(key);
            const timeout = window.localStorage.getItem(key+"-timeout");
            if(timeout === "-1" || (timeout && new Date().getTime() < parseInt(timeout))){
                if(obj){
                    return JSON.parse(obj);
                }
            } else {
                removeStorage(key);
                return false;
            }
        }
        return false;
    } catch{
        return false;
    }
}

export const setStorageObject = (key : string, value : string, expires? : number) => {
    try{
        if (!isBrowser()){
            return false;
        }
        window.localStorage.setItem(key, JSON.stringify(value));
        window.localStorage.setItem(key + "-timeout", (expires ? expires : "-1").toString());
        return true;
    } catch{
        return false;
    }
}
