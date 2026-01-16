import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from '../components/Weather'

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
    <div style={{ padding: '20px', backgroundColor: 'rgba(255, 107, 107, 0.1)', borderRadius: '10px' }}>
      <p>Too many matches, specify another filter</p>
    </div>
  )

  const renderCountryList = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '15px'
    }}>
      {countries.map(country => (
        <div
          key={country.name.common}
          style={{
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '15px',
            borderRadius: '10px',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>{country.name.common}</span>
          <button
            onClick={() => handleShowCountry(country)}
            style={{
              padding: '5px 10px',
              background: 'linear-gradient(135deg, #a855f7, #c084fc)',
              border: 'none',
              color: 'white',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  )

  const renderCountryDetails = () => (
    <div>
      <button
        onClick={() => setSelectedCountry(null)}
        style={{
          padding: '8px 12px',
          marginBottom: '20px',
          background: 'rgba(168, 85, 247, 0.2)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: '#e8def8',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Back to list
      </button>

      <div style={{
        background: 'rgba(168, 85, 247, 0.08)',
        padding: '30px',
        borderRadius: '15px',
        border: '1px solid rgba(168, 85, 247, 0.2)'
      }}>
        <h2>{selectedCountry.name.common}</h2>
        <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
        <p><strong>Area:</strong> {selectedCountry.area} km²</p>
        
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
          <div style={{ marginTop: '20px' }}>
            <img 
              src={selectedCountry.flags.svg} 
              alt={`Flag of ${selectedCountry.name.common}`}
              style={{ width: '200px', borderRadius: '8px' }}
            />
          </div>
        )}

        {selectedCountry.capital && <Weather capital={selectedCountry.capital[0]} />}
      </div>
    </div>
  )

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '12px',
          fontSize: '16px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          borderRadius: '10px',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          backgroundColor: 'rgba(168, 85, 247, 0.08)',
          color: '#e8def8'
        }}
      />

      {search.trim() === '' ? (
        <p style={{ color: '#b8a5d1' }}>Enter a country name to search</p>
      ) : countries.length > 10 ? (
        renderTooManyMatches()
      ) : countries.length === 0 ? (
        <p style={{ color: '#b8a5d1' }}>No countries found</p>
      ) : selectedCountry ? (
        renderCountryDetails()
      ) : (
        renderCountryList()
      )}
    </div>
  )
}

export default CountriesApp
