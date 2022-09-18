import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCountries =
    searchText.length > 0
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
      : countries;

  return (
    <div>
      find countires <input value={searchText} onChange={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
