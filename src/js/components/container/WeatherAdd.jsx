import React, { Component } from "react";
import ReactDOM from "react-dom";
import FormContainer from "./FormContainer";
import WeatherContainer from "./WeatherContainer";

class WeatherAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopUp: false,
        }
        this.togglePopUp = this.togglePopUp.bind(this);
    }
    togglePopUp() {
        this.setState({
            showPopUp: !this.state.showPopUp
        })
    }
    render(){
        return (
            <div className="weather-add">
                <span className="icon icon-plus" onClick={this.togglePopUp}></span>
                {   this.state.showPopUp ?
                    <FormContainer closePopUp={this.togglePopUp.bind(this)}
                    /> : null
                }
            </div>
        )
    }
}

export default WeatherAdd;
