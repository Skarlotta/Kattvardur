import fetcher from '../../../../fetcher';
import {GenericSearch} from '../genericSearch/genericSearch';
import {GenericSearchResult} from '../genericSearch/searchresults';
import {Cat, Cattery} from '../../../types';

interface ExtendedCat extends Cat{
    catteryObject?: Cattery
};

const styleData = (cat:ExtendedCat) => {
    const birthDay = (cat.isMale ? "fæddur " : "fædd ") + new Date(cat.birth_date).toLocaleDateString();
    const catteryObject = cat.catteryObject;
    let name;
    if(catteryObject){
        name = (catteryObject.prefix ? catteryObject.name+ " " + cat.name : cat.name+ " "+ catteryObject.name); 
    } else{
        name = cat.name;
    }
    return <GenericSearchResult
        url={'/cat/'+cat.id+"/"}
        key={cat.id}
        heading={name}
        subheading={cat.registries[0]?.registry || "Ekkert örmerki skráð"}
        topString={cat.colors[0]?.ems || "Ekkert EMS skráð"}
        bottomString={birthDay}
    />
}

const processCatResults = (cats : ExtendedCat[]) => {
    let p = new Promise<ExtendedCat[]>((resolve, fail) => {
        let num:number = cats.length;
        let catArray : ExtendedCat[] = [];
        for(let cat of cats){
            console.log(cat.id, num);
            if(cat.cattery) {
                fetcher<Cattery>("/api/v1/cattery/" + cat.cattery).then(cattery => {
                const newCat : ExtendedCat = cat;
                newCat.catteryObject = cattery;
                catArray.push(newCat);
                }).finally(() => {
                    num--;
                    if(num<=0){
                        console.log(catArray);
                        resolve(catArray);
                    }
                })
            } else {
                catArray.push(cat);
                num--;
                if(num<=0){
                    console.log(catArray);
                    resolve(catArray);
                }
            }
        }
    });
    return p;
};

export const CatSearch = () => {
    return <GenericSearch
        title="Kattaleit"
        url="/api/v1/cat/"
        styleData={styleData}
        processData = {processCatResults}
    />
}
/*
const CatSearchResult = (cat: Cat) => {
    let fullName = cat.cattery ? (cat.cattery.object.prefix ? cat.cattery.object.name +" "+ cat.object.name : cat.object.name +" "+ cat.cattery.object.name) : cat.object.name;
    let ems = cat.object.colors.length > 0 ? "Ems : " + cat.object.colors[0].ems : "Ems óþekkt";
    let microchip =  cat.object.microchips.length > 0 ? "Örmerking : " + cat.object.microchips[0].microchip : "Engin Örmerking";
    let registry = cat.object.registries.length > 0 ? cat.object.registries[0].registry : "Ekkert skráninganúmer";
    return <SearchResult>
        <Link href={"/kottur/"+cat.object.id.toString()+"/"}><a>
            <span><h2>{fullName} - <i>{registry}</i></h2> 
            <span>{ems}</span> <br></br>
            <span>{microchip}</span></span>
        </a>
        </Link>
    </SearchResult>;
}

const CatterySearchResult = (cattery: Cattery) => {
    let catteryName = cattery.object.name;
    let address = (cattery.object.address || "Óþekkt heimilisfang") + " " + (cattery.object.postcode || "") + " " + (cattery.object.city || "");
    let contact = (cattery.object.phone || "Óþekkt símanúmer") +" - " + (cattery.object.email || "Óþekkt netfang") +" - " + (cattery.object.website || "Óþekkt vefsvæði");

    return <SearchResult>
        <Link href={"/kottur/"+cattery.object.id.toString()+"/"}><a>
            <span><h2>{catteryName} - <i>{cattery.object.country}</i></h2> 
            <span>{address}</span> <br></br>
            <span>{contact}</span></span>
        </a>
        </Link>
    </SearchResult>;
}
*/