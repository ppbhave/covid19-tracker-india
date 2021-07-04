import { Card, Typography } from "@material-ui/core";
import "./styles/cards.css"

function CasesCard({stateName,casesLabel,cases,total,casetype,onCaseTypeChange}) {
  const upperborder= () =>{
    let bordercolor={borderTop:"4px solid white"};
    if(casetype===casesLabel) {
      switch(casesLabel) {
        case "cases" : bordercolor.borderTop="4px solid blue";
                              break;
        case "recovered" : bordercolor.borderTop="4px solid green";
                              break;
        case "deaths" : bordercolor.borderTop="4px solid red"; 
                              break;
        default : bordercolor.borderTop="4px solid blue";
                              break;
      }
    }
    return bordercolor;
  } 

    return (
      <Card className="cases-card" style={upperborder()} onClick={()=>{
        onCaseTypeChange(casesLabel);
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