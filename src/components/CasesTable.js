import "./styles/Table.css";
import { Card, Button } from "@material-ui/core";
import CardContent from '@material-ui/core/CardContent';
import Linegraph from "./Linegraph";

function CasesTable ({tabledata,setinfoGraph}) {

    return (
        <div className="casesTracker-bottom-right">
        <Card className="today-cases-card">
            <div className="today-cases-card-header">
            <h4 className="txt-c">Live updates for Today</h4>
            <Button variant="outlined" onClick={()=> {setinfoGraph(true)}} color="primary" className="txt-r">
                Primary
            </Button>
            </div>
             
            <CardContent className="tableFixHead">
            <table className="today-cases-table" style={{display: "table-header-group",overflowY:"auto",marginTop:"2px"}}>
            <thead className="today-cases-table-th" style={{position: "sticky"}}>

            <th style={{width:"40%",margin: "10px"}}>Region</th>
            <th >Active cases</th>
            <th >Recoveries</th>
            <th >Deaths</th>

            </thead>
            <tbody className="today-cases-table-td">
            {
                tabledata.map(region=> {
                    return (
                        <tr key={region.state}>
                        <td style={{width:"50%",margin: "10px"}}>{region.state}</td>
                        <td style={{color:"blue"}}>{region.todayActive}</td>
                        <td style={{color:"green"}}>{region.todayRecovered}</td>
                        <td style={{color:"red"}}>{region.todayDeaths}</td>
                        </tr>
                    )
                })
            }
            </tbody>
            </table>  
            </CardContent>          
        </Card>
        
        {/* <Linegraph/> */}
        
        </div>
    );
}
export default CasesTable;