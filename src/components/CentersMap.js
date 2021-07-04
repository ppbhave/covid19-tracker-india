import { MapContainer as LeafletMap, TileLayer, Popup, CircleMarker, useMapEvents  } from "react-leaflet";
import {Icon} from "leaflet";
import { getFormattedDate } from "./util";
import 'leaflet/dist/leaflet.css';

function ChangeView({ mapcenter,setMapCenter, zoom }) {
  let center = { lat:23.12, lng:78.98};
  const map = useMapEvents({
    dblclick(e) {
      setMapCenter(e.latlng)
    }
  })
  setTimeout(() => {
    map.setView(mapcenter, map.getZoom());
  }, 1000);
    
    return null;
  };
  
  const vaccine =new Icon({
      iconUrl:"./styles/vaccine.svg",
      iconSize: [30,30]
  });

function CentersMap({centers,mapcenter,setCenterInfo,setMapCenter,setCalendar,setModalOpen}) {

    const fetchCalendarForCenter = (center_id) => {
    let today=getFormattedDate(new Date(),0)
    fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByCenter?center_id="+center_id+"&date="+today)
      .then((response) => response.json())
      .then((data) => {
        if(data.centers) 
        {setCalendar(data)}    
        else {setCalendar({centers:null})} 
      });
    } 

    return (
            <div className="centers-map">
                <LeafletMap  center={mapcenter} zoom={11}>
                <ChangeView mapcenter ={mapcenter} setMapCenter={setMapCenter} zoom={11} />
               <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
              {/* <CircleMarker
                  center={mapcenter}
                  color={"#0647F6"}
                  fillColor={"#0647F6"}
                  fillOpacity={1}
                  radius={4}
                >
                   <Popup>
                   seleccted location
                </Popup>
              </CircleMarker>  */}
            {
            centers.map( center =>  (
                <CircleMarker
                        key={center.center_id}
                        color={"#097325"}
                        center={[center.lat,center.long]}
                        fillColor={"#1cd64d"}
                        fillOpacity={1}
                        radius={5}
                        >
                    <Popup>
                        <div className="info-container">
                          <div style={{ justifySelf: "center" }}>
                              <strong>{center.name}</strong> <br/>
                           </div> 
                           <br/>
                          <div className="info-active">
                            {center.location+", "+center.block_name+", "+center.district_name+", "+center.state_name}
                          </div>
                          <div style={{color:"#0647F6",cursor:"pointer"}} id = {center.center_id} onClick={(e)=>{
                              fetchCalendarForCenter(e.target.id)
                              setModalOpen(true)}}>
                            Check slot availability
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>))
            }
            </LeafletMap>
        </div>
    )
}

export default CentersMap;