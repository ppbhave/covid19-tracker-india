import React from "react";
import "./styles/Modal.css";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Modal({ setModalOpen, calendar }) {
  return (

      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          {calendar.centers ?  <div><b>{calendar.centers.name}</b><br/><p>{calendar.centers.address+", "+calendar.centers.block_name}</p></div> : "There are no slots available."  }
        </div>
        <div className="body">
        {calendar.centers ? <TableComponent data={calendar.centers}/> : null }
        </div>
      </div>
  );
}

function TableComponent({data}){
  const useStyles = makeStyles({
          table: {
            minWidth: 500,
          },
          cell:{
            height:20
          }
        });
  const classes=useStyles();

const tableHeaders=["Type","Fee","Vaccine","Dose 1","Dose 2","Age group"]
return (
<TableContainer component={Paper} className="vaccination-datatable" style={{maxHeight: "58vh"}}>
<Table className={classes.table} stickyHeader aria-label="sticky table">
  <TableHead>
    <TableRow>
    <TableCell component="th" scope="row"></TableCell>
      {tableHeaders.map(head=> <TableCell component="th" scope="row" style={{width:"20px",textAlign:"center",fontWeight:"bold",backgroundColor:"#d6dbe0"}}>{head}</TableCell>)}
    </TableRow>
  </TableHead>
  <TableBody className="vaccination-datatable-body">
    {
      data.sessions.map(row=> <SessionFound slot={row} feetype={data.fee_type} fee={data.fee}/>)
    }
  </TableBody>
</Table>
</TableContainer>
)
}

function SessionFound({slot, feetype, fee}){
  const tablekeys=["vaccine","available_capacity_dose1","available_capacity_dose2","min_age_limit"]
return(
<TableRow key={slot.session_id}>
  <TableCell style={{textAlign:"center",fontWeight:"bold",backgroundColor:"#d6dbe0"}}>{slot.date}</TableCell>
  <TableCell style={{textAlign:"center",fontWeight:"normal"}}>{feetype}</TableCell>
  <TableCell style={{textAlign:"center",fontWeight:"normal"}}>{fee}</TableCell>
  {tablekeys.map(keys=>(<TableCell key={keys} style={{textAlign:"center",fontWeight:"normal"}}>{slot[keys]}</TableCell>))}
  </TableRow>
)
}

export default Modal;