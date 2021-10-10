
import React from 'react';
import GenericSearch from '../../search/Search';
import urls from '../../../../Site_code/urls';
import { Link } from "react-router-dom";


class CatSearch extends GenericSearch{
    constructor(props){
        super();
        this.title="Leita að Ketti";
        this.apiLocation = "/api/v1/kettir";
    }

    processResults(data){
        let r = []
        for(let x of this.state.results){
            let result = {
                "key":x.registry_number,
                "element":(<Link to={urls.CATS+"/"+x.id} key={x.registry_number}>
                    <span>
                        <strong>{x.name}</strong> 
                        <small>
                            ({x.ems}), 
                            {x.registry_number}, 
                            f:{x.birthdate}
                        </small>
                    </span>
                </Link>)
            };
            r.push(result);
        }
        return r;
    }
}

export default CatSearch;