
import React from 'react';
import GenericSearch from '../../search/Search';
import urls from '../../../../Site_code/urls';
import { Link } from "react-router-dom";


class CatSearch extends GenericSearch{
    constructor(props){
        super();
        this.title="Leita að Ketti";
        this.apiLocation = "/api/v1/cat";
    }

    processResults(data){
        let r = []
        for(let x of this.state.results){
            var col = x.colors[0] || {ems:"N/A"};
            let result = {
                "key":x.registry_number,
                "element":(<Link to={urls.CATS+"/"+x.id} key={x.registry_number}>
                    <span>
                        <strong>{x.name}</strong> 
                        <small>
                            ({col.ems}), 
                            {x.registry_number}, 
                            f:{x.birth_date}
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