import "./styles/Linegraph.css";
import React, {useState} from 'react';
import { Line } from "react-chartjs-2";
import { useEffect } from "react";

function Linegraph( {casetype} ) {
  const [data,setData] = useState({});
  const labels=[]
  const yAxisData=[]

  const properties={
    'cases':{
      graphTitle:"Active cases per day.",
      backgroundColor: "rgba(204, 16, 52, 0.5)",
      borderColor: "rgb(79, 98, 241)",
      fillColor: 'rgb(177, 185, 245)'
    },
    'deaths':{
      graphTitle:"Deaths per day.",
      backgroundColor: "rgba(204, 16, 52, 0.5)",
      borderColor: "#CC1034",
      fillColor: 'rgba(220,220,220,0.2)'
    },
    'recovered':{
      graphTitle:"Covid recoveries per day.",
      backgroundColor: "rgba(204, 16, 52, 0.5)",
      borderColor: "#29680C",
      fillColor: '#8FF55F'
    }
  }

  useEffect(()=>{
    fetch("https://api.covid19india.org/data.json")
      .then((response) => response.json())
      .then((data) => {
        data.cases_time_series.forEach(daily => {
          labels.push(daily.dateymd);
          switch (casetype) {
            case 'cases'    : yAxisData.push(daily.dailyconfirmed); break;
            case 'recovered': yAxisData.push(daily.dailyrecovered); break;
            case 'deaths': yAxisData.push(daily.dailydeceased); break;
            default : yAxisData.push(daily.dailyconfirmed); break;
          }
        });
 
  setData({
    labels: labels,
    datasets: [
      {
        label:properties[casetype].graphTitle,
        xAxisID:'axisX',
        yAxisID:'axisY',
        backgroundColor: properties[casetype].backgroundColor,
        borderColor: properties[casetype].borderColor,
        fillColor: 'rgb(177, 185, 245)', //properties[casetype].fillColor,
        data: yAxisData
      }]
          });
      });
  },[casetype]);

  const options = {
    fill:false,
    layout: {
      padding: {left:10}
  },
    elements:{
      point:{
        radius:0
      },
      line:{
        borderWidth:2
      }
    },
    plugins: {
      title:{
        text:properties[casetype].graphTitle,
        display:true,
        position:'bottom'
      },
      legend: {
          display: false,
      }
  }
  }

  return (
    <div className="linegraph_div">
      <Line data={data} options={options}/>
    </div>
  );

}
export default Linegraph;  