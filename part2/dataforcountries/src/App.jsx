import { useEffect, useState } from "react"

import countryService from "./services/country"
import weatherService from "./services/weather"
import CountryList from "./components/CountryList"
import CountryData from "./components/CountryData"

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => setCountries(countries))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setWeatherData(null)
    
    if (!query) {
      setFilteredCountries([])
      return
    }
    
    const filteredCountries = countries
      .filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    
    setFilteredCountries(filteredCountries)
  }, [query])
  
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [lat, lon] = filteredCountries[0]?.capitalInfo?.latlng || []
      
      weatherService
        .getWeather(lat, lon)
        .then(data => setWeatherData(data))
        .catch(err => console.log(err))
    }
  }, [filteredCountries])
  
  const handleShow = (countryFifa) => {
    const findCountry = countries.find(country => country.fifa === countryFifa)
    
    if (findCountry) {
      setFilteredCountries([findCountry])
    }
  }
  
  return (
    <>
      <div>find countries <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}/></div>
      {filteredCountries.length > 1 && <CountryList list={filteredCountries} handleShow={handleShow} />}
      {filteredCountries.length === 1 &&  <CountryData data={filteredCountries[0]} weatherData={weatherData} />}
    </>
  )
}

export default App
