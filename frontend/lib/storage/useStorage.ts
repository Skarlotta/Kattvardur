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

