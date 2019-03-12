import React from "react";
import ReactDOM from "react-dom";
import WeatherContainer from "./js/components/container/WeatherContainer";
import { Provider } from "./js/components/container/Context";
import WeatherAdd from "./js/components/container/WeatherAdd";

class App extends React.Component  {
    constructor(){
        super();
    }

    render() {
    return (
        <Provider>
            <div>
                <WeatherAdd />
                <WeatherContainer />
            </div>
        </Provider>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));