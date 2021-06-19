import { MapContainer as LeafletMap, TileLayer, useMap, Popup, Circle  } from "react-leaflet";
// import numeral from "numeral";
import "./styles/Map.css"

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };

// const setRadius = (region,dotType) => {
//   let radius = 900*(dotType === 1 ? region.active/region.cases : dotType === 2 ? region.recovered/region.cases : region.deaths/region.cases);
//   return radius;
// }

const showCircle = (statedata,latlongInfo,casesType) => {
    statedata.map( region =>  { return (
      <Circle
      center={latlongInfo[region.state]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(region[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
       <Popup>
       <div className="info-container">
        <div className="state-name" style={{ justifySelf: "center" }}>
            <strong>{region.state}</strong> <br/>
              Live updates for today</div> <br/>
        <div className="info-active">
          Active cases: {region.todayActive}
        </div>
        <div className="info-recovered">
          Recovered: {region.todayRecovered}
        </div>
        <div className="info-deaths">
          Deaths: {region.todayDeaths}
        </div>
      </div>
    </Popup>
  </Circle>)})
}


function CasesMap ({mapcenter,mapzoom,statesData,latlongInfo,casesType}) {
    return (
        <div className="cases-map">
        <LeafletMap center={mapcenter} zoom={mapzoom}>
            <ChangeView center={mapcenter} zoom={mapzoom} />
           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
          {showCircle(statesData,latlongInfo,casesType)}
        </LeafletMap>
            
        </div>
    );
}
export default CasesMap;