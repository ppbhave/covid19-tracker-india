import CasesCard from "./CasesCard";
import CasesMap from "./CasesMap";
import Linegraph from "./Linegraph";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import "./styles/casestracker.css";
import "leaflet/dist/leaflet.css"

function CasesTracker() {
  const [casesdata,updatecaseData] = useState([{active: 0,
    cases: 1,
    deaths: 1,
    recovered: 1,
    state: "India",
    todayActive: 1,
    todayCases: 1,
    todayDeaths: 1,
    todayRecovered: 1}]);
  const [stateindex,setStateindex] = useState(0);
  const [mapcenter,setmapcenter] = useState({ lat:23.111412927136396, lng:78.97626932452121});
  const [mapzoom,setmapzoom] = useState(3);
  const [casesType,setCasesType] = useState("cases");

  const dataprocessing = async () => {
    fetch("https://disease.sh/v3/covid-19/gov/India")
      .then((response) => response.json())
      .then((data) => {
        data.total={...data.total,state:"India"};
        updatecaseData(sortData([data.total,...data.states]));             
      });
  };

const latlongdict= {
'India':[23.111412927136396,78.97626932452121],
'Andaman and Nicobar Islands':[11.66702557,92.73598262],
'Andhra Pradesh':[14.7504291,78.57002559],
'Arunachal Pradesh':[27.10039878,93.61660071],
'Assam':[26.7499809,94.21666744],
'Bihar':[25.78541445,87.4799727],
'Chandigarh':[30.71999697,76.78000565],
'Chhattisgarh':[22.09042035,82.15998734],
'Dadra and Nagar Haveli and Daman and Diu':[20.26657819,73.0166178],
'Delhi':[28.6699929,77.23000403],
'Goa':[15.491997,73.81800065],
'Gujarat':[22.258652,71.192383],
'Haryana':[28.45000633,77.01999101],
'Himachal Pradesh':[31.10002545,77.16659704],
'Jammu and Kashmir':[34.29995933,74.46665849],
'Jharkhand':[23.80039349,86.41998572],
'Karnataka':[12.57038129,76.91999711],
'Kerala':[8.900372741,76.56999263],
'Ladakh':[35.447601,76.274803],
'Lakshadweep':[10.56257331,72.63686717],
'Madhya Pradesh':[21.30039105,76.13001949],
'Maharashtra':[19.25023195,73.16017493],
'Manipur':[24.79997072,93.95001705],
'Meghalaya':[25.57049217,91.8800142],
'Mizoram':[23.71039899,92.72001461],
'Nagaland':[25.6669979,94.11657019],
'Odisha':[19.82042971,85.90001746],
'Puducherry':[11.93499371,79.83000037],
'Punjab':[31.51997398,75.98000281],
'Rajasthan':[26.44999921,74.63998124],
'Sikkim':[27.3333303,88.6166475],
'Tamil Nadu':[12.92038576,79.15004187],
'Telangana':[18.112436,79.019302],
'Tripura':[23.83540428,91.27999914],
'Uttar Pradesh':[27.59998069,78.05000565],
'Uttarakhand':[30.32040895,78.05000565],
'West Bengal':[22.58039044,88.32994665]
  }

  useEffect(() => {
    dataprocessing()
  },[]);

  const sortData = (data) => {
    let sortedData=data;
    sortedData.sort((a, b) => {
      if ((a.active+a.deaths) > (b.active+b.deaths)) {
        return -1;
      } else {
        return 1;
      }
  })
  return sortedData;
};

  const onStateChange = (value) => {
    setStateindex(casesdata.indexOf(value));
    let region=value.state;
    region==="India" ? setmapzoom(3) : setmapzoom(7);
    setmapcenter([latlongdict[region][0],latlongdict[region][1]]);
  };

  const onCaseTypeChange=(casetype)=> {
        setCasesType(casetype);
  }

  return (
    
    <div className="cases-tracker-container">
       <div className="cases-tracker-header">
       <h4>COVID 19 cases tracker</h4>
      </div>

      <div className="cases-tracker-top">
      <CasesCard stateName={casesdata[stateindex].state}
      casesLabel={"cases"}
      cases={casesdata[stateindex].active}
      total={casesdata[stateindex].cases}
      casetype={casesType}
      onCaseTypeChange={onCaseTypeChange}/>

      <CasesCard stateName={casesdata[stateindex].state}
      casesLabel={"recovered"}
      cases={casesdata[stateindex].recovered}
      total={casesdata[stateindex].cases}
      casetype={casesType}
      onCaseTypeChange={onCaseTypeChange}/>

      <CasesCard stateName={casesdata[stateindex].state}
      casesLabel={"deaths"}
      cases={casesdata[stateindex].deaths}
      total={casesdata[stateindex].cases}
      casetype={casesType}
      onCaseTypeChange={onCaseTypeChange}/>

      <FormControl className="cases_state_dropdown">
    <InputLabel id="states-label">Region:</InputLabel>
      <Select
        variant="outlined"
        labelId="states-label"
        value={casesdata[stateindex]}
        onChange={(e)=>{ onStateChange(e.target.value) }}
      >
        {
          casesdata.map(statedata => {
            return (<MenuItem key = {statedata.state} value={statedata}>
              {statedata.state}
            </MenuItem> );
          })
        }
      </Select>
    </FormControl>
    </div>

    <div className="cases-tracker-bottom">
      <div className="cases-tracker-left-bottom">
      <Linegraph casetype={casesType}/>
      </div>
  
  <div className="cases-tracker-right-bottom">   
  <CasesMap mapcenter={mapcenter} mapzoom={mapzoom} statesData={casesdata} latlongInfo={latlongdict}/>
  </div>

  </div>
  </div>
  
  );
}
export default CasesTracker;
