import React from 'react';
import {SearchPage} from './SearchPage';
import "../../css/SearchPages.css"
import apiFetch from '../../../Site_code/api';

class GenericSearch extends React.Component {
    constructor(props){
        super();
        this.apiLocation = null; ///Overwrite
        this.state = {
            'results':[]
        };
        this.getResults = this.getResults.bind(this);
        this.processResults = this.processResults.bind(this);
    }

    getResults(x){
        apiFetch(this.apiLocation + "?search="+x).then(d =>{
            console.log(d);
            d.json().then(data => {
                this.setState({
                    results: data
                })
            })
        });
    }

    render(){
        return(
            <SearchPage title={this.title} getResults={this.getResults} results={this.processResults()}>

            </SearchPage>
        )
    }

    ///Overwrite in inheriting classes
    processResults(){
        console.log(this.state);
        let r = []
        for(let x of this.state.results){
            r.push({"key":x.id, "element":(<b key={x.id}>{JSON.stringify(x)}</b>)});
        }
        return r;
    }
}
 
export default GenericSearch;