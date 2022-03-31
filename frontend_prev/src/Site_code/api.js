import Cookies from 'js-cookie';
//import moment from 'moment';
var getCache = {};
const APIVERSION = "v1";
import urls from './urls';


function apiFetch(url, configuration = {method:"GET"}){
    if(!("method" in configuration) || configuration.method === "GET"){
        if(url in getCache){
            //var date = moment(new Date());
            //if(moment(getCache[url].expires) > date){
                return new Promise((resolve) => {
                    resolve(getCache[url].data);
                })
            //}
        }
    }

    if(configuration.method === "POST" || configuration.method === "DELETE" || configuration.method === "PATCH" || configuration.method === "PUT"){
        const csrftoken = Cookies.get('csrftoken'); // or the value from settings.CSRF_COOKIE_NAME
        if (csrftoken) {
            e.headers['X-CSRFTOKEN'] = csrftoken;
        }
    }
    return new Promise((resolve, fail) => {
        fetch("/api/"+APIVERSION+"/"+url, configuration).then(data => {
            if (data.status == 403) {
                window.location = urls.LOGIN;
            } else{
                getCache[url] = {
                    data
                };
                resolve(data);
            }
        }).catch(fail);
    });
}

export default apiFetch;