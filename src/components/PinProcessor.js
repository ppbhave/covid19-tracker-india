import {  useState } from "react";
import { getSlotCalendar } from "./util";
import "./styles/PinProcessor.css";
import Datatable from "./Datatable";

function PinProcessor() {
     const [vaccinedata,setvaccinedata] = useState([]);
    
const callPINapi=(pin)=>{
    if(isNaN(pin) || pin.length < 6) {
        alert("Enter valid PIN");
        document.getElementById("pin-input").value="";
        return;
        }
    let url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pin+"&date=";
    getSlotCalendar(url,setvaccinedata)
}

    return (
    <div className="pin-container">
        <form className="pin-form-container">
        {/* <TextField id="pin-input" label="Outlined" variant="outlined"/> */}
        <input type="text" id="pin-input" style={{minWidth:"30%",height:"20px",alignSelf:"center",marginRight:"20px"}} placeholder="Enter the pin"></input>
            <button onClick={(e)=>{
                e.preventDefault();
                callPINapi(document.getElementById("pin-input").value)}}>Search</button>
        </form>

        <div className="datatable">
            <Datatable data={vaccinedata}/>
        </div>
    </div>)
}
export default PinProcessor;