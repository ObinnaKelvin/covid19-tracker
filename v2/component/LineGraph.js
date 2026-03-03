import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
// import './LineGraph.css';
import numeral from 'numeral';

// register components required by Chart.js v3+
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      mode: 'index',
      intersect: false,
      callbacks: {
        label(context) {
          return numeral(context.parsed.y).format('+0,0');
        },
      },
    },
  },
  elements: {
    point: { radius: 0 },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        parser: 'MM/DD/YY',
        tooltipFormat: 'll',
      },
    },
    y: {
      grid: { display: false },
      ticks: {
        callback(value) {
          return numeral(value).format('0a');
        },
      },
    },
  },
};


const buildChartData = ( data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    };
    return chartData;
};


function LineGraph({ casesType = "cases"}) {
    const [data, setData] = useState({});

    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                // setData(data);
                // console.log("Graph Data: ", data)
                let chartData = buildChartData(data, casesType);
                setData(chartData);
            })
        }

        fetchData();

        // effect
        // return () => {
        //     cleanup
        // }
    }, [casesType]);



    return (
        <div className="linegraph">
            {/* <h1>I am a Graph</h1> */}

            {data?.length > 0 &&  (
                <Line 
                    options = {options}
                    data = {{
                        datasets: [
                            {
                                data: data,
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                // backgroundColor: color,
                                // borderColor: {color},
                                borderColor: "#CC1034",
                            }
                        ],
                    }}
                />

            )}
                {/* Testing the new upload */}
                {/* <Line data options /> */}
        </div>
    )
}

export default LineGraph
