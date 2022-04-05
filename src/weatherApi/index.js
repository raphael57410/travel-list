import { headerFetch } from "../assets/utils/headerFetch"

export const fetchWeather = () => {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=paris&limit=5&appid=1e94a8ed18cb346f1de036347bf337ec', headerFetch('GET'))
        .then(res => {
            if (res.ok) return res.json();

            return Promise.reject(res);
        })
        .then(response => console.log(response))
}