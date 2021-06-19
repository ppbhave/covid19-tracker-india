import "./styles/Linegraph.css";
import React, {Component} from 'react';
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import { Canvas } from "leaflet";

// function Linegraph() {
//   const graphdata= [];
//   useEffect(()=>{
//     fetch("https://api.covid19india.org/data.json")
//       .then((response) => response.json())
//       .then((data) => {
//         let labels=[]
//         let active=[]
//         let recovered=[]
//         let deaths=[]
//         data.cases_time_series.map((daily)=>{
//           labels.push(daily.dateymd);
//           active.push(daily.dailyconfirmed);
//           recovered.push(daily.dailyrecovered);
//           deaths.push(daily.dailydeceased)
//         });
       
//         //active
//         graphdata.push({
//           labels:labels,
//           label: "Active cases",
//           data: active,
//           fill: false,
//           backgroundColor: "blue",
//           borderColor: "blue"});
//         //recovered
//         graphdata.push({
//           labels:labels,
//           label: "Recoveries",
//           data: recovered,
//           fill: false,
//           backgroundColor: "green",
//           borderColor: "green"});
//         //deaths
//         graphdata.push({
//           labels:labels,
//           label: "Deaths",
//           data: deaths,
//           fill: false,
//           backgroundColor: "red",
//           borderColor: "red"}); 
//       });
//   },[])

//   const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

//   return (
//     <div className="linegraph_div">
//       <Line data={graphdata[0]} />
//     </div>
//   );

// }
// export default Linegraph;  

const chartData = {
  chartData:{
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets:[
      {
        label:'Population',
        data:[
          617594,
          181045,
          153060,
          106519,
          105162,
          95072
        ],
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }
};

const defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

 const  location="Massachusetts";
 const  legendPosition="bottom";

 function Linegraph() {

    return (
      <div className="inegraph_div">
        <h2>Line Example</h2>
        <Canvas>
        <Line
          data={chartData}
          options={{
            title:{
              display:defaultProps.displayTitle,
              text:'Largest Cities In '+location,
              fontSize:25
            },
            legend:{
              display:defaultProps.displayLegend,
              position:legendPosition
            }
          }}
        />
        </Canvas>
      </div>
    );
  }

  export default Linegraph;