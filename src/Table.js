import React from 'react';
import numeral from "numeral";
import "./Table.css";
function Table({countries}) {
    return (
        <div className="table">
          {/* OLD CODE */}
          {/* {
            countries.map((data) => (
              <tr>
                <td>{data.country}</td>
                <td>{data.cases}</td>
              </tr>
            ))
          }   */}

          {/* NEW CODE */}
          {
              countries.map(({country, cases}) => (
                <tr>
                  <td>{country}</td>
                  <td>{numeral(cases).format("0,0")}</td>
                </tr>
              ))
          }
        </div>
    )
}

export default Table
