import React from 'react';
import { Component } from 'react';
import '../../css/forms.css';

const Progressbar = ({currentStep, totalSteps}) => {
    var perc = currentStep/totalSteps;
    var percPlusOne = (currentStep + 1)/totalSteps;
    return <div className="progress-bar-wrapper">
        <span style={{width:100*percPlusOne+"%"}} className="orange">

        </span>
        <span style={{width:100*perc+"%"}} className="green">

</span>
    </div>
}

class MultistepForm extends Component{
    constructor(p){
        super();
        this.steps = [];
        this.BackButton = this.BackButton.bind(this);
        this.NextButton = this.NextButton.bind(this);
    }

    BackButton({steps}){
        if(this.props.page === 0){
            return null;
        } else{
            return <span className="form-button" onClick={this.props.lastPage}>Bakka</span>;
        }
    }
    NextButton({steps}){
        if(this.props.page === steps.length - 1){
            return <span className="form-button" onClick={this.props.onSave}>Vista</span>;
        } else{
            return <span className="form-button" onClick={this.props.nextPage}>Áfram</span>;
        }
    }
    render(){
        let steps = React.Children.toArray(this.props.children);
        return <div style={{paddingLeft:"10%"}}>
            {steps[this.props.page]}
            <div>
                <this.BackButton steps={steps}></this.BackButton>
                <this.NextButton steps={steps}></this.NextButton>
            </div>
        </div>
    }
}

export default MultistepForm;
export {MultistepForm, Progressbar                                                                    };