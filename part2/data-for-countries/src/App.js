import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

const Filter = ({ filter, handler }) => {
  return (
    <div>
      find countries
      <input value={filter} onChange={handler} />
    </div>
  );
};

const CountryList = ({ countries, handleClick }) => {
  if (countries.length === 1)
    return (
      <div>
        <CountryView country={countries[0]} />
      </div>
    );
  return (
    <div>
      {countries.length < 10
        ? countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleClick(country.name.common)}>
                show
              </button>
            </div>
          ))
        : 'Too many matches, specify another filter'}
    </div>
  );
};

const CountryView = ({ country }) => {
  const [weather, setWeather] = useState();
  useEffect(() => {
    console.log(country.capitalInfo.latlng.toString());
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${
          process.env.REACT_APP_API_KEY
        }&q=${country.capitalInfo.latlng.toString()}`
      )
      .then((response) => setWeather(response.data.current));
  }, [country]);
  console.log(country);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        style={{ maxWidth: 200 }}
        src={country.flags.svg}
        alt="country's flag"
      />
      <h3>Weather in {country.capital}</h3>
      <div>temperature {weather ? weather.temp_f : ''} fahrenheit</div>
      <img
        src={weather ? weather.condition.icon : ''}
        alt="weather condition icon"
      />
      <div>wind {weather ? weather.wind_mph : ''} mph</div>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter filter={filter} handler={handleFilterChange} />
      <CountryList countries={filteredCountries} handleClick={setFilter} />
    </div>
  );
};

export default App;
