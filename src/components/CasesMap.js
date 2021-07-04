import { MapContainer as LeafletMap, TileLayer, useMap, Popup, CircleMarker  } from "react-leaflet";
// import numeral from "numeral";
import "./styles/Map.css"

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const setZone=(region)=>{
    if(region.state==="India"){
      return "blue";
    }
      let weight=region.deaths;
      if(weight < 1000) {
        return "green"
      } else if (weight < 10000) {
        return "yellow";
      } else if(weight < 15000) {
        return "orange";
      } else return "red";
  }

  const zoneColors = {
    blue: {
      hex: "#0647F6",
      half_op: "#688EF3",
      multiplier: 6,
    },
    green: {
      hex: "#26B60E",
      half_op: "#94ED85",
      multiplier: 4,
    },
    yellow:{
      hex: "#CACF23",
      half_op: "#F2F867",
      multiplier: 6,
    },
    orange: {
      hex: "#F38E12",
      half_op: "#F8C967",
      multiplier: 8,
    },
    red: {
      hex: "#E41C4A",
      half_op: "#E06C51",
      multiplier: 10,
    },
  };

export const showCircle = (statedata,latlongInfo) => (
    statedata.map( region =>  (
      <CircleMarker
              key={region.state}
              center={latlongInfo[region.state]}
              color={zoneColors[setZone(region)].hex}
              fillColor={zoneColors[setZone(region)].half_op}
              fillOpacity={0.2}
              radius={zoneColors[setZone(region)].multiplier}
            >
               <Popup>
               <div className="info-container">
                <div className="state-name" style={{ justifySelf: "center" }}>
                    <strong>{region.state}</strong> <br/>
                 </div> 
                 <b>Live updates for today</b><br/>
                <div className="info-active">
                  <b>Active cases:</b> {region.todayActive}
                </div>
                <div className="info-recovered">
                <b>Recovered:</b> {region.todayRecovered}
                </div>
                <div className="info-deaths">
                <b>Deaths:</b> {region.todayDeaths}
                </div>
              </div>
              <b>Covid zone: </b>{setZone(region)} <br/>
            </Popup>
          </CircleMarker>))
)


function CasesMap ({mapcenter,mapzoom,statesData,latlongInfo}) {
    return (
        <div className="cases-map">
        <LeafletMap center={mapcenter} zoom={mapzoom}>
            <ChangeView center={mapcenter} zoom={mapzoom} />
           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          {showCircle(statesData,latlongInfo)}
        </LeafletMap>           
        </div>
    );
}
export default CasesMap;