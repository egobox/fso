const WeatherData = (props) => {
  if (!props.data) {
    return
  }
  
  const { main, wind, weather } = props.data
  
  return (
    <>
      <h2>Weather in {props.capital}</h2>
      <div>Temperature: {main.temp} Celsius</div>
      {weather && weather.length > 0 && <img src={`https://openweathermap.org/payload/api/media/file/${weather[0].icon}.png`} alt="Weather icon" />}
      <div>Wind: {wind.speed} m/s</div>
    </>
  )
}

const CountryData = (props) => {
  const { name, capital, area, languages, flags } = props.data
  const weatherData = props.weatherData
  
  return (<>
    <h1>{name.common}</h1>
    <div>Capital {capital[0]}</div>
    <div>Area {area}</div>
    <h2>Languages</h2>
    <ul>
      {Object.entries(languages).map(([key, language]) => (<li key={key}>{language}</li>))}
    </ul>
    <img src={flags.png} alt={flags.alt} />
    <WeatherData data={weatherData} capital={capital[0]} />
  </>)
}

export default CountryData
