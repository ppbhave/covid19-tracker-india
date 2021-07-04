import { useEffect, useState } from "react";
import { Box, FormControl, MenuItem, Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import "./styles/DistrictProcessor.css"
import { getSlotCalendar } from "./util";
import Datatable from "./Datatable";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formBlock: {
    marginBottom:10,
    WebkitAlignItems:"center"
  },
});


function DistrictProcessor() {
const [stateCode,setStateCode] = useState('');
const [districtCode,setDistrictCode] =useState('');
const [vaccinedata,setvaccinedata] = useState([]);
const [stateData,setStateData] = useState([]);
const [districtData,setDistrictData] =useState([]);
const classes = useStyles();
useEffect(()=>{
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then((response) => response.json())
    .then((data) => {
        setStateData(data.states)
    });
});

useEffect(()=>{
    if(stateCode!==''){
    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+stateCode)
    .then((response) => response.json())
    .then((data) => {
        setDistrictData(data.districts)
    });}
},[stateCode]);

const callDistrictApi=()=>{
    if(districtCode===''){
        console.log("Select state and district first.");
    } else {
    let url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+ districtCode +"&date=";
    getSlotCalendar(url,setvaccinedata)
    }
    
};

return (
<div>
<Box className={classes.formBlock}>
<FormControl  >
    <InputLabel id="states-label">Select state:</InputLabel>
      <Select className="select-component"
        labelId="states-label"
        value={stateCode}
        onChange={(e)=>{ setStateCode(e.target.value) }}
      >
        {
          stateData.map(std => {
            return (<MenuItem key = {std.state_id} value={std.state_id}>
              {std.state_name}
            </MenuItem> );
          })
        }
      </Select>
    </FormControl>

    <FormControl >
    <InputLabel id="district-label">Select District:</InputLabel>
      <Select
        className="select-component"
        labelId="district-label"
        value={districtCode}
        onChange={(e)=>{ setDistrictCode(e.target.value) }}
      >
        {
          districtData.map(district => {
            return (<MenuItem key = {district.district_id} value={district.district_id}>
              {district.district_name}
            </MenuItem> );
          })
        }
      </Select>
    </FormControl>

    <button className="district-launch" onClick={(e)=>{
                e.preventDefault();
                callDistrictApi()}}>Search</button>
    </Box>
    <div className="datatable">
    <Datatable data={vaccinedata}/>
    </div>

</div>)
}
export default DistrictProcessor;