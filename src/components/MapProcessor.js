import "./styles/MapProcessor.css"
import { useEffect, useState } from "react";
import Modal from './Modal';
import CentersMap from "./CentersMap";

function MapProcessor() {
    const [mapcenter,setMapCenter] = useState({ lat:23.12, lng:78.98});
    const [centers,setCenterInfo] = useState([]);
    const [calendar,setCalendar] = useState({centers:null});
    const [modalOpen,setModalOpen] = useState(false);

    useEffect(()=>{
        fetch("https://cdn-api.co-vin.in/api/v2/appointment/centers/public/findByLatLong?lat="+mapcenter.lat+"&long="+mapcenter.lng)
      .then((response) => response.json())
      .then((data) => {
        setCenterInfo(data.centers)        
      });
    },[mapcenter]);

    return (
      <div>
        <b>Double click your current location and know the nearest vaccination centers and slots availability</b>
        {modalOpen ? <Modal setModalOpen={setModalOpen} calendar={calendar}/> : <CentersMap centers={centers} mapcenter={mapcenter} setCenterInfo={setCenterInfo} setMapCenter={setMapCenter} setCalendar={setCalendar} setModalOpen={setModalOpen}/>}
      </div>
    )
}
export default MapProcessor;