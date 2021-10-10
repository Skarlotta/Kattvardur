//import moment from 'moment';
var getCache = {};
const APIVERSION = "v1";

function apiFetch(url, configuration){
    if(!configuration || !("method" in configuration) || configuration.method === "GET"){
        if(url in getCache){
            //var date = moment(new Date());
            //if(moment(getCache[url].expires) > date){
                return new Promise((resolve) => {
                    resolve(getCache[url].data);
                })
            //}
        }
    }
    return new Promise((resolve, fail) => {
        fetch("/api/"+APIVERSION+"/"+url, configuration).then(data => data.json()).then(data =>{
            //let expires = moment(new Date()).add(5,'m');
            getCache[url] = {
                //expires,
                data
            };

            resolve(data);
        }).catch(fail);
    });
}

export default apiFetch;