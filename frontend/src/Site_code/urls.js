let urls = {};

urls.HOME = "/";
urls.CATS = "/k";
urls.CATSEARCH = urls.CATS;
urls.CATNEWHOUSECAT = urls.CATS+"/nyr/hus";
urls.CATNEWLITTER= urls.CATS+"/nyr/got";
urls.CATPROFILE = urls.CATS + "/:id";
urls.MAKECATPROFILE = (id) => urls.CATS+"/"+id;


urls.MEMBERS = "/f";
urls.MEMBERSEARCH = urls.MEMBERS;
urls.MEMBERPROFILE = urls.MEMBERS + "/:id";
urls.MAKEMEMBERPROFILE = (id) => urls.MEMBERS+"/"+id;

urls.CATTERIES = "/r";
urls.CATTERYSEARCH = urls.CATTERIES;
urls.CATTERYPROFILE = urls.CATTERIES + "/:id";
urls.MAKECATTERYPROFILE = (id) => urls.CATTERIES+"/"+id;


urls.AUTH = "/a";
urls.LOGIN = urls.AUTH + "/login";


const makePage = (name, path) => {
    return {name, path};
}

const makeCategory = (name, links) => {
    return {name, links};
}
const navbarList = [
    makeCategory("Sýningar",[]) ,    
    makeCategory("Ræktanir",[
        makePage("Leita að ræktun", urls.CATTERYSEARCH),
    ]),
    makeCategory("Félagar",[
        makePage("Leita að félaga", urls.MEMBERSEARCH),
    ]),  
    makeCategory("Kettir", [
        makePage("Leita að ketti", urls.CATSEARCH),
        makePage("Skrá húskött", urls.CATNEWHOUSECAT),
        makePage("Skrá nýtt got", urls.CATSEARCH),
        makePage("Dansa Kongó", urls.CATSEARCH),
        ]
    ),
];

const unauthorizedList = [
    makeCategory("Innskráning", urls.LOGIN)
]

export default urls;
export {urls, navbarList, unauthorizedList};