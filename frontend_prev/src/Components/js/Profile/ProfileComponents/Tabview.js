import React, {Component} from 'react';
import "../../../css/profile.css";


const TabButton = ({title, onClick, selected}) => {
    let selectClass = selected ? "selected":"";
    return <span className={"profile-tab "+selectClass} onClick={onClick}>{title}</span>
}

const TabStick = ({children}) =>{
    return <div className="profile-tabStick">
        {children}
    </div>
}

const Tab = (key, title) => {
    return {key, title};
}

class Tabview extends Component{
    constructor(props){
        super();
        this.state = {
            selectedTab: props.defaultTab || null,
        }

        if(props.tabs.length > 0 && !props.defaultTab){
            this.state.selectedTab = props.tabs[0].key;
        }
    }

    render(){
        let tabs = this.props.tabs.map(
            x => <TabButton selected={x.key === this.state.selectedTab} key={x.key} title = {x.title} onClick={
                e => {
                    this.setState({selectedTab : x.key})
                }
            }> </TabButton>
        )

        let visibleView = null;
        if(this.props.children){
            visibleView = React.Children.toArray(this.props.children).find(x =>  x.props.id === this.state.selectedTab);
        }
        return <div>
            <TabStick>
                {tabs}
            </TabStick>
            {visibleView}
         </div>;
    }
}

export default Tabview;
export {Tabview, TabButton, TabStick, Tab};