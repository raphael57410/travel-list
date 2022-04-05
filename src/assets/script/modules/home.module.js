import { headerFetch } from "../../utils/headerFetch.js";

export class Home {
    _rootElement = document.querySelector('#root');
    _cityName = 'paris';

    constructor() {
        this.fetchWeather(this.cityName)

    }

    get cityName() {
        return this._cityName;
    }
    set cityName(value) {
        this._cityName = value;
    }

    fetchWeather(cityName) {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=1e94a8ed18cb346f1de036347bf337ec`, headerFetch('GET'))
            .then(res => {
                if (res.ok) return res.json();

                return Promise.reject(res);
            })
            .then((response) => {
                const lon = response[0].lon;
                const lat = response[0].lat;
                this.weatherApi(lon, lat);
            })
    }

    weatherApi(lon, lat) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=1e94a8ed18cb346f1de036347bf337ec`, headerFetch('GET'))
            .then(res => {
                if (res.ok) return res.json();

                return Promise.reject(res);
            })
            .then(response => {
                const divElement = document.createElement('div');
                divElement.innerText = 'Temperature de Paris: ' + response.main.temp + ' °C';

                this._rootElement.appendChild(divElement);
            })
    }
}