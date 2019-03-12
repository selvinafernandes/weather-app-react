import React, {Component} from "react";
import ReactDOM from "react-dom";
import { Consumer } from './Context';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return  (
            <Consumer>
            {value =>  {
                return value.state.dataArray.map(item => {
                    console.log(item);
                    return (
                        <div className="weather-tile">
                            <div className="weather-tile__current">
                                <div className="weather-tile__main">
                                    <div className="weather-tile__place">
                                        <span className="weather-tile__city">{item.city}</span>
                                        <span className="weather-tile__country">{item.country}</span>
                                    </div>
                                    <div className="weather-tile__content">
                                        <p className="weather-tile__temp">{item.temp} </p>
                                        <ul className="weather-tile__details">
                                            <li>{item.weather[0]}</li>
                                            <li>{item.speed}</li>
                                            <li>{item.clouds}</li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="weather-tile__forecast">

                                {item.forecast.map(item => {
                                    return (
                                        <div className="weather-tile__forecast-day">
                                            <div className="day-title">{value.getDay(item.dt_txt)}</div>
                                            <div className="day-icon icon-cloud1"></div>
                                            <div className="day-temp">{ Math.round(item.main.temp)}</div>
                                        </div>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }}
            </Consumer>
        )
    }
}

export default WeatherContainer;
