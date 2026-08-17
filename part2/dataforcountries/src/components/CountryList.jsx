const CountryList = (props) => {
  if (props.list.length > 10) {
    return 'Too many matches, specify another filter'
  }
  
  return props.list.map(country => (
    <div key={country.fifa}>
      {country.name.common} <button onClick={() => props.handleShow(country.fifa)}>Show</button>
    </div>
  ))
}

export default CountryList
