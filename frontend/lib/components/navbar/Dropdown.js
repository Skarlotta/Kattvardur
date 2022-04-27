import React from 'react';
import "../../styles/Dropdown.module.css";


const Toggle = (props) => <span className="navbar-toggle" onMouseEnter ={props.handleOnMouseEnter}>
    {props.children}
</span>

class Dropdown extends React.Component{
    constructor(props){
        super();
        this.state = {
            show: false
        };
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    }
    handleOnMouseEnter(){
        this.setState({
            show:true
        });
    }
    handleOnMouseLeave(){
        this.setState({show:false});
    }
    render(){
        let  menu= this.state.show ? <div className="dropdown">{React.Children.map(this.props.children,child => <div className="dropdown-child">{child}</div>)}</div> : null;
        return <div className="navbar-menu-wrapper" onMouseLeave={this.handleOnMouseLeave}>
            <Toggle  handleOnMouseEnter={this.handleOnMouseEnter}>{this.props.toggle}</Toggle>
            {menu}
        </div>
    }
}

export default Dropdown;