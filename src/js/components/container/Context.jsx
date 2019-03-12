import React, { Component } from 'react';
import { request } from 'https';
import { config } from './../../../config';

const url = 'http://api.openweathermap.org/data/2.5';

const Context = React.createContext();

export class Provider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataArray: [],
			latitude: null,
			longitude: null,
			error: null,
			city: null,
			submit: () => this.submit.bind(this),
			getWeather: () => this.getWeather.bind(this),
			getDay: () => this.getDay
		};
		this.getDay = this.getDay.bind(this);
	}
	getDay(date) {
		const newDate = new Date(date);
		const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const getCorrectDay = weekDay[newDate.getDay()];
		return getCorrectDay;
	}

	getWeather(lat, lon, city) {
		const data = {};
		const arr = [];
		let newUrl =
			city != null
				? `${url}/weather?q=${city}&APPID=${config.key}&units=metric`
				: `${url}/weather?lat=${lat}&lon=${lon}&APPID=${config.key}&units=metric`;
		const { dataArray } = this.state;

		let request1 = fetch(newUrl).then(response =>
			response
				.json()
				.then(json => {
					data.city = json.name;
					data.country = json.sys.country;
					data.temp = Math.round(json.main.temp) + 'º';
					(data.weather = json.weather.map(items => {
						for (let [key, value] of Object.entries(items)) {
							if (key === 'main') {
								return value;
							}
						}
					})),
						(data.clouds = json.clouds.all + '%');
					data.speed = json.wind.speed + 'm/s';

					this.setState({
						city: data.city
					});

					let forecastUrl = `${url}/forecast?q=${data.city}&APPID=${config.key}&units=metric`;
					let request2 = fetch(forecastUrl).then(response =>
						response.json().then(json => {
							data.forecast = json.list.filter(items => {
								let time = '00:00:00';
								if (items.dt_txt.split(' ')[1] === time) {
									return items;
								}
							});
						})
					);
					Promise.all([request2]).then(responses => {
						arr.push(data);
						let newArray = dataArray.concat(data);
						this.setState({
							dataArray: newArray
						});
					});
				})
				.catch(Error('City not found'))
		);
	}
	submit(event) {
		event.preventDefault();
		let getNewCity = event.target.city.value;
		this.getWeather(undefined, undefined, getNewCity);
	}
	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.setState({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						error: null
					});
					this.getWeather(this.state.latitude, this.state.longitude, this.state.city);
				},
				error => {
					this.setState({ error: error.message });
				}
			);
		} else {
			console.log('Geolocation is not supported by the browser');
		}
	}

	render() {
		return (
			<Context.Provider
				value={{
					state: this.state,
					getDay: this.getDay,
					getWeather: this.getWeather
				}}
			>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
