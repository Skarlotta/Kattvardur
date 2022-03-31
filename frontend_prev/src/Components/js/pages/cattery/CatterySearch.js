
import React from 'react';
import GenericSearch from '../../search/Search';

class CatterySearch extends GenericSearch{
    constructor(props){
        super();
        this.title="Leita að Ræktun";
        this.apiLocation = "/api/v1/raektanir"
    }

    processResults(data){
        let r = []
        for(let x of this.state.results){
            let phone_number = x.phone_number ? " - "+x.phone_number: ""
            let address = x.address ? " - "+x.address : " - Heimilisfang ekki skráð";
            let result = {
                "key":x.id,
                "element":(<a href="/#" key={x.id}>
                    <span>
                        <strong>{x.name} </strong> 
                        <small>
                             {x.email}{phone_number}{address}
                        </small>
                    </span>
                </a>)
            };
            r.push(result);
        }
        return r;
    }
}


export default CatterySearch;