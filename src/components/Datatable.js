import { tableHeaders,tablekeys } from "./util";
import "./styles/DataTable.css"
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function Datatable({data}){
       return (data.length>0 ? <TableComponent data={data}/> : <div></div>)
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
        
    return (
<TableContainer component={Paper} className="vaccination-datatable">
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <TableCell component="th" scope="row"></TableCell>
            {tableHeaders.map(head=> <TableCell key={head} component="th" scope="row" style={{width:"20px",textAlign:"center",fontWeight:"bold",backgroundColor:"#d6dbe0"}}>{head}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody className="vaccination-datatable-body">
          {
            data.map((row,i)=> row.sessions.length > 0 ? <SessionFound  key ={i} slots={row.sessions}/> : <SessionNotFound key={i} date={row.date}/>)
          }
        </TableBody>
      </Table>
</TableContainer>
    )
}

function SessionFound({slots}){
  return(
    slots.map(slot =>
     <TableRow key={slot.session_id}><TableCell style={{textAlign:"center",fontWeight:"bold",backgroundColor:"#d6dbe0"}}>{slot.date}</TableCell>
        {tablekeys.map(keys=>(<TableCell key={keys} style={{textAlign:"center",fontWeight:"normal"}}>{slot[keys]}</TableCell>))}
        </TableRow>
        ))
}

function SessionNotFound({date}){
  return(
    <TableRow key={date}><TableCell style={{textAlign:"center",fontWeight:"bold",backgroundColor:"#d6dbe0"}}>{date}</TableCell>
    <TableCell colSpan={tablekeys.length} style={{textAlign:"center",fontWeight:"normal"}}>No slot available</TableCell>
    </TableRow>
  )
}

export default Datatable;
