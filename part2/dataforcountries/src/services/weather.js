import axios from "axios"

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`

const getWeather = (lat, lon) => {
  return axios.get(`${baseUrl}&lat=${lat}&lon=${lon}`).then(res => res.data)
}

export default { getWeather }
