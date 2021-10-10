import React from 'react';
import {SearchPage} from './SearchPage';
import "../../css/SearchPages.css"

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
        let data = JSON.stringify({"search":{"name":x}});
        fetch(this.apiLocation + "?data="+data).then(x => x.json()).then(data => {
            if(data.success){
                this.setState({results:data.results});
            }
        });
    }

    render(){
        return(
            <SearchPage title={this.title} getResults={this.getResults} results={this.processResults()}>

            </SearchPage>
        )
    }

    ///Overwrite in inheriting classes
    processResults(data){
        let r = []
        for(let x of this.state.results){
            r.push({"key":x.id, "element":(<b key={x.id}>{JSON.stringify(x)}</b>)});
        }
        return r;
    }
}
 
export default GenericSearch;