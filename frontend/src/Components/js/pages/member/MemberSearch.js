
import React from 'react';
import GenericSearch from '../../search/Search';


class MemberSearch extends GenericSearch{
    constructor(props){
        super();
        this.title = "Leita að Félaga";
        this.apiLocation = "/api/v1/felagar";
    }

    getBubble(last_payment){        
        let currYear = new Date().getUTCFullYear();
        let year = new Date(last_payment).getUTCFullYear();
        let lastPayment = null;
        if(year !== "Invalid Date"){
            lastPayment = currYear - year;
        }

        let color = "red";
        let text = "Ógreitt";
        if(lastPayment){
            color = lastPayment === 0 ? "green": lastPayment === 1 ? "orange" : "red";
            text = year;
        }
        return (
            <span className={"bubble "+color}>{text}</span>
        );
    }

    processResults(data){
        let r = []
        for(let x of this.state.results){
            let bubble = this.getBubble(x.last_payment);
            //let address = x.address ? " - "+x.address : " - Heimilisfang ekki skráð";
            let result = {
                "key":x.id,
                "element":(<a href="/#" key={x.id}>
                    <span>
                        {bubble}<strong>{x.name}[{x.member_id}] - </strong> 
                        <small>
                              {x.email}
                        </small>
                        <br/>
                        <small><i>{x.ssn}</i> - {x.address}</small>
                    </span>
                </a>)
            };
            r.push(result);
        }
        return r;
    }
}

export default MemberSearch;