import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const CountriesApp = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    if (search.trim() === '') {
      setCountries([])
      setSelectedCountry(null)
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filtered = response.data.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
        
        if (filtered.length > 10) {
          setCountries([])
          setSelectedCountry(null)
        } else {
          setCountries(filtered)
          if (filtered.length === 1) {
            setSelectedCountry(filtered[0])
          } else {
            setSelectedCountry(null)
          }
        }
      })
  }, [search])

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  const renderTooManyMatches = () => (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  )

  const renderCountryList = () => (
    <div>
      {countries.map(country => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={() => handleShowCountry(country)}>show</button>
        </div>
      ))}
    </div>
  )

  const renderCountryDetails = () => (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>Capital: {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
      <p>Area: {selectedCountry.area} km²</p>
      
      <h3>Languages</h3>
      <ul>
        {selectedCountry.languages ? 
          Object.values(selectedCountry.languages).map((lang, idx) => (
            <li key={idx}>{lang}</li>
          ))
          : <li>No languages found</li>
        }
      </ul>

      {selectedCountry.flags && (
        <div>
          <img 
            src={selectedCountry.flags.svg} 
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: '200px', marginTop: '20px' }}
          />
        </div>
      )}

      {selectedCountry.capital && <Weather capital={selectedCountry.capital[0]} />}
    </div>
  )

  return (
    <div style={{ padding: '20px' }}>
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '20px'
        }}
      />

      {search.trim() === '' ? (
        <p>Enter a country name to search</p>
      ) : countries.length > 10 ? (
        renderTooManyMatches()
      ) : countries.length === 0 ? (
        <p>No countries found</p>
      ) : selectedCountry ? (
        renderCountryDetails()
      ) : (
        renderCountryList()
      )}
    </div>
  )
}

export default CountriesApp
