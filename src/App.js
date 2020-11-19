import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from "@material-ui/core";
import InfoBox from "../src/InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

//API CALLS
//https://www.disease.sh/v3/covid-19/countries


function App() {
  //Using Hooks

  //useState
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  //To Fetch the "worldwide" data that appears when page loads.
  useEffect(() => {
    fetch("https://www.disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  }, [])
  //useEffect runs a piece of code based on a given condition
  useEffect(() => {
    //The code insider here will run once the component loads and not again
    //We will run an async code --> send a request, wait for it(await), do something with the info
    const getCountriesData = async () => {
      await fetch('https://www.disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        const countries = data.map((country) => (
          {
            name: country.country, //United Kingdom, Nigeria
            value: country.countryInfo.iso2 //UK, USA, NIG
          }
        ));


        const sortedData = sortData(data); //Sort Function
        setTableData(sortedData); //Set Table data
        setCountries(countries); //Set Countries data
        setMapCountries(data);
      })
    };

    getCountriesData();
  }, [])

  const onCountryChange = (event) =>{
    const countryCode = event.target.value;
    // console.log(countryCode);
    setCountry(countryCode);
    //https://www.disease.sh/v3/covid-19/countries/{country}
    const url = countryCode === 'worldwide' ? "https://www.disease.sh/v3/covid-19/all"
    : `https://www.disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
      //All of the data from the country response
      setCountryInfo(data);
      // console.log("See Data: ", data);
      setMapZoom(4);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      
      console.log("Zoom: ", mapZoom);
    });
  };
  console.log('Country Info >>>', countryInfo);

  
  return (
    //BEM Naming Convention
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className = "app__stats">
              <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases}  total={countryInfo.cases}/>
              <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>      
              <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>      
        </div>

      {/* Map */}
      <Map 
        countries = {mapCountries}
        center = {mapCenter}
        zoom = {mapZoom}
      />
      </div>   

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
        {/* Table */}
          <Table countries={tableData}/>
          <h3>Worldwide new Cases</h3>
        {/* Graph */}
        <LineGraph /> 
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
