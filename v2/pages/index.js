import { useState, useEffect } from 'react';
import Image from "next/image";
import { Montserrat } from "next/font/google";
import Head from "next/head";
import CountUp from "react-countup";
import style from '../styles/spiral.module.css'
import numeral from 'numeral';
// import LineGraph from '@/component/LineGraph';


const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
  
});

export default function Home() {

  //Using Hooks

  //useState
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  // const [mapCenter, setMapCenter] = useState({ lat: 0.0, lng: 0.0 } || { lat: 34.80746, lng: -40.4796 });
  // const [mapZoom, setMapZoom] = useState(3);
  // const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [color, setColor] = useState("#CC1034");

  //To Fetch the "worldwide" data that appears when page loads.
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
      console.log("Worldwide Data: ", data)
    })
  }, [])

  //useEffect runs a piece of code based on a given condition
  useEffect(() => {
    //The code insider here will run once the component loads and not again
    //We will run an async code --> send a request, wait for it(await), do something with the info
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        const countries = data.map((country) => (
          {
            name: country.country, //United Kingdom, Nigeria
            value: country.countryInfo.iso2 //UK, USA, NIG
          }
        ));


        //const sortedData = sortData(data); //Sort Function
        //setTableData(sortedData); //Set Table data
        setCountries(countries); //Set Countries data
        console.log("Countries Data: ", countries);
        // setMapCountries(data);
      })
    };

    getCountriesData();
  }, [])



  useEffect(() => {
    //The code insider here will run once the component loads and not again
    //We will run an async code --> send a request, wait for it(await), do something with the info
    const getCountrizData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data => {
        console.log("Countriz Data: ", data);
        // setMapCountries(data);
      })
    };

    getCountrizData();
  }, [])






  const onCountryChange = (event) =>{
    const countryCode = event.target.value;
    // console.log(countryCode);
    setCountry(countryCode);
    //https://www.disease.sh/v3/covid-19/countries/{country}
    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
      //All of the data from the country response
      setCountryInfo(data);
      // console.log("See Data: ", data);
      // setMapZoom(4);
      // setMapCenter(0 || [data.countryInfo.lat, data.countryInfo.long]);
      
      // console.log("Zoom: ", mapZoom);
    });
  };
  console.log('Country Info >>>', countryInfo);



  return (
    <>
          <Head>
            <title>COVID 19 Tracker by Obinna Kelvin Okere</title>
            <meta name="description" content="Kobisoft Digitals is a leading digital solutions agency dedicated to creating impactful online experiences through creativity, strategy, and technology." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/virus.ico" />
          </Head>


          <div className='flex flex-col w-full h-max items-center py-5 gap-3'>
            <div className='text-3xl font-bold text-[#7847f7]'>
              COVID 19 Tracker
            </div>
            <form>
              <select onChange={onCountryChange} value={country} className="bg-[#ebe1ff80] text-[#7847f7] border-[#7847f7] font-bold rounded-[10px] px-6 py-2">
                <option value="worldwide">Worldwide</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>{country.name}</option>
                ))}
              </select>
            </form>
          </div>

          {/* Container */}
          <div className="flex flex-col w-full h-120 ">
            
            <div className="flex w-full h-max bg-[#f5f0ff60] px-10 py-5">

              {/* Stats Cards */}
              <div className="flex flex-col xl:flex-row lg:flex-row w-full gap-5 items-center justify-between">

                <div className="flex w-[300px] h-[200px] xl:w-87 lg:w-87 rounded-[2em] overflow-hidden relative bg-[url(/covidcases.png)] shadow-xl">
                  <div className="flex flex-col px-3 py-8 absolute top-0 left-0 w-[50%] h-full">
                    <div className="w-full font-bold">Cases</div>
                    <div className="w-full text-3xl font-bold text-[#9c7a16]"><CountUp end={countryInfo.todayCases || 0} enableScrollSpy={true} duration={2}/></div>
                    <div className="w-full text-sm text-[#757575]"><CountUp end={countryInfo.cases || 0} enableScrollSpy={true} duration={2}/> Total</div>
                  </div>
                  <Image src="/covidcases.png" alt="Total Cases" width={600} height={400} />
                </div>
                <div className="flex w-[300px] h-[200px] xl:w-87 lg:w-87 rounded-[2em] overflow-hidden relative bg-[url(/covidrecovered.png)] shadow-xl">
                  <div className="flex flex-col px-3 py-8 absolute top-0 left-0 w-[50%] h-full">
                    <div className="w-full font-bold">Recovered</div>
                    <div className="w-full text-3xl font-bold text-[#7847f7]"><CountUp end={countryInfo.todayRecovered || 0} enableScrollSpy={true} duration={2}/></div>
                    <div className="w-full text-sm text-[#757575]"><CountUp end={countryInfo.recovered || 0} enableScrollSpy={true} duration={2}/> Total</div>
                  </div>
                  <Image src="/covidrecovered.png" alt="Total Recovered" width={600} height={400} />
                </div>
                <div className="flex w-[300px] h-[200px] xl:w-87 lg:w-87 rounded-[2em] overflow-hidden relative bg-[url(/coviddeath.png)] shadow-xl">
                  <div className="flex flex-col px-3 py-8 absolute top-0 left-0 w-[50%] h-full">
                    <div className="w-full font-bold">Deaths</div>
                    <div className="w-full text-3xl font-bold text-[#fd2d5f]"><CountUp end={countryInfo.todayDeaths || 0} enableScrollSpy={true} duration={2}/></div>
                    <div className="w-full text-sm text-[#757575]"><CountUp end={countryInfo.deaths || 0} enableScrollSpy={true} duration={2}/> Total</div>
                  </div>
                  <Image src="/coviddeath.png" alt="Total Deaths" width={600} height={400} />
                </div>

              </div>

            </div>  
            
            <div className="flex w-full  px-0 lg:px-10 xl:px-10">

              {/* Section 1 */}
              <div className="flex flex-col xl:flex-row lg:flex-row w-full px-7 py-7">
                <div className="w-full xl:w-[60%] lg:w-[60%] flex items-center justify-center">
                  <Image src="/covid3dd.png" alt="Disease 3D emoji"  className={`${style.spiral}`} width={450} height={400} />
                </div>
                <div className="flex flex-col w-full items-center gap-3 xl:w-[40%] lg:w-[40%] justify-around">
                  <div className="flex flex-col gap-3 w-full rounded-[10px] py-2 px-2 bg-[#ebe1ff80]">
                    <div className="text-[#7947f7b8] text-s">Strain</div>
                    <div className="text-[#7847f7] font-bold text-[20px]">SARS-CoV-2</div>
                  </div>
                  <div className="flex flex-col gap-3 w-full rounded-[10px] py-2 px-2 bg-[#ebe1ff80]">
                    <div className="text-[#7947f7b8] text-s">Usual onset</div>
                    <div className="text-[#7847f7] font-bold text-[20px]">2-14 days</div>
                  </div>
                  <div className="flex flex-col gap-3 w-full rounded-[10px] py-2 px-2 bg-[#ebe1ff80]">
                    <div className="text-[#7947f7b8] text-s">Origin</div>
                    <div className="text-[#7847f7] font-bold text-[20px]">Wuhan, China</div>
                  </div>
                  <div className="flex flex-col gap-3 w-full rounded-[10px] py-2 px-2 bg-[#ebe1ff80]">
                    <div className="text-[#7947f7b8] text-s">Symptoms</div>
                    <div className="text-[#7847f7] font-bold text-[20px]">Fever, Cough, Shortness of breath, Fatigue</div>
                  </div>
                </div>
              </div>

            </div>

            {/* <div className="flex w-[50%] h-120 bg-[#f5f0ff60] px-3 border-2">
              
            </div> */}
            
          </div>

    </>
  );
}
