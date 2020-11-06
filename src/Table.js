import React from 'react'
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
                  <td>{cases}</td>
                </tr>
              ))
          }
        </div>
    )
}

export default Table
