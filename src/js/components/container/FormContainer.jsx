import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";
import { Consumer } from './Context';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:" "
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value : event.target.value,
        });
    }

    render() {
        const {value} = this.state;
        return (
            <Consumer>

            {context => {
                return (
                <form id="weather-form" className="weather-form" onSubmit={context.state.submit()}>
                    <Input
                        text="Search a city"
                        label="title"
                        type="text"
                        id="title"
                        value={value}
                        name="city"
                        handleChange={this.handleChange}
                    />
                    <span onClick={this.props.closePopUp} className="icon icon-close"></span>
                </form>
            )
            }}
            </Consumer>
        );
    }
}

export default FormContainer;

const getForm = document.getElementById("weather-form");
getForm ? ReactDOM.render(<FormContainer />, getForm) : false;
