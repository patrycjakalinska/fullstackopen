import Country from "./Country";
import { useEffect, useState } from "react";

const Countries = ({ countries }) => {
  const [countryToShow, setCountryToShow] = useState();

  useEffect(() => {
    if (countries.length === 1) {
      setCountryToShow(countries[0]);
    }
  }, [countries]);

  const countriesList = countries.map((country) => (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => setCountryToShow(country)}>show</button>
    </div>
  ));

  return (
    <div>
      {countries.length < 10
        ? countriesList
        : "Too many matches, specify another filter"}
      {countryToShow && <Country country={countryToShow} />}
    </div>
  );
};

export default Countries;
