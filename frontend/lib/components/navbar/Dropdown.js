import React from 'react';
import styles from "../../styles/Headercomponents.module.css";


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
        let  menu= this.state.show ? <div className={styles.dropdownMenu}>{React.Children.map(this.props.children,child => <div className={styles.dropdownChild}>{child}</div>)}</div> : null;
        return <div className={styles.dropdownLink}>
            <Toggle  handleOnMouseEnter={this.handleOnMouseEnter}>{this.props.toggle}</Toggle>
            {menu}
        </div>
    }
}

export default Dropdown;