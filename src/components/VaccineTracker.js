import "./styles/vaccinetracker.css";
import DistrictProcessor from "./DistrictProcessor";
import PinProcessor from "./PinProcessor";
import MapProcessor from "./MapProcessor";
import { useState } from "react";

function VaccineTracker() {
  const [searchCriteria,updateCriteria] = useState(1);
  const selected={backgroundColor:"#0d2ca2",color:"#ffff",fontWeight:"bold"}
  const notSelected={backgroundColor:"#f8f9fa"}
    return (
    
      <div className="vaccine-tracker-container">
      <div className="vaccine-tracker-header">
      <h4>Check your nearest vaccination center and slots availability</h4>
     </div>

     <div className="vaccine-tracker-top">
     <div className="search-by-selector" style={searchCriteria===1 ? selected : notSelected} onClick={()=>updateCriteria(1)}>Search by PIN</div>
     <div className="search-by-selector" style={searchCriteria===2 ? selected : notSelected} onClick={()=>updateCriteria(2)}>Search by District</div>
     <div className="search-by-selector" style={searchCriteria===3 ? selected : notSelected} onClick={()=>updateCriteria(3)}>Search by MAP</div>
   </div>

   <div className="vaccine-tracker-bottom">
     { searchCriteria===1 ? <PinProcessor /> : searchCriteria===2 ? <DistrictProcessor /> : <MapProcessor /> }
  </div>
 </div>
      );
  }
  export default VaccineTracker;
  