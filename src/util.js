import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//Dictionary of Case Color Fills
const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        fillColor: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        fillColor: "#7dd71d",
        multiplier: 1200,        
    },
    deaths: {
        hex: "#fb4443",
        fillColor: "#fb4443",
        multiplier: 2000,
    }
};

export const sortData = (data) => {
    const sortedData = [...data];
    //VANILLA OLD CODE
    // sortedData.sort((a,b) => {
    //     if(a.cases > b.cases){
    //         return -1;
    //     } else {
    //         return 1
    //     }
    // })
    // return sortedData;

    //ES6 NEW CODE
    return sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1);

};

export const prettyPrintStat = (stat) => {
    // stat ? `+${numeral(stat).format("0.0a")}`
   return  `${numeral(stat).format("0,0")}`
};



//Draw Circles on the Map with interactive tooltips
export const showDataOnMap = (data, casesType = "cases", color) => {
    // const onColorChange = (casesType) => {
    //     var caseType = "cases";
    //     switch (caseType) {
    //       case "cases":
    //       setColor("#CC1034");
    //       break;
    
    //       case "recovered":
    //       setColor("#7dd71d");
    //       break;
    
    //       case "deaths":
    //         setColor("#fb4443");
    //         break;
    //     }
    //     console.log(casesType)
    
    //   } 

    return data.map(country => (
        <div key={country.countryInfo._id}>
            <Circle
                center = {[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity = {0.4}
                // pathOptions = {casesTypeColors[casesType].fillColor}
                // color = {casesTypeColors[casesType].hex}
                color = {{color}}
                pathOptions = {{color}}
                // fillColor = {casesTypeColors[casesType].hex}
                radius = {
                    Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
                }
            >  
                <Popup>
                    <div className="info-container">
                        <div
                            className = "info-flag"
                            style = {{backgroundImage: `url(${country.countryInfo.flag})`}}
                        />
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                        <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        </div>
    )) 
};
