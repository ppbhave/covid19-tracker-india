import { Card, Typography } from "@material-ui/core";
import "./styles/cards.css"

function CasesCard({stateName,casesLabel,cases,total,onCaseTypeChange}) {
  let caseType;
  const upperborder= () =>{
    let bordercolor={borderTop:""};
    switch(casesLabel) {
      case "Active cases" : bordercolor.borderTop="4px solid blue";
                            caseType = "cases";
                            break;
      case "Recoveries" : bordercolor.borderTop="4px solid green";
                            caseType = "recovered"; 
                            break;
      case "Deaths" : bordercolor.borderTop="4px solid red"; 
                            caseType = "deaths";
                            break;
    }
    return bordercolor;
  } 
    return (
      <Card className="cases-card" style={upperborder()} onClick={()=>{
        onCaseTypeChange(caseType);
      }}>
        <Typography className="card-header" color="textSecondary">{stateName}</Typography>
        <Typography className="card-region-Name" variant="h5" component="h2">{cases}</Typography>
        <Typography variant="body2" component="p">
          <b>{casesLabel}</b>
          </Typography>
          <Typography className="card-footer" color="textSecondary">total {total}</Typography>
      </Card>
    );
  }
  export default CasesCard;