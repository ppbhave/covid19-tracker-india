import "./App.css";
import Header from "./components/Header";
import CasesTracker from "./components/CasesTracker";
import VaccineTracker from "./components/VaccineTracker";
import { useState } from "react";

export default function App() {
  const [casetracker,setPage] = useState(true);
  const pageChange = (pageval) => {
    setPage(pageval);
  }
  return (
    <div className="App">
      <Header pageChange={pageChange} highlighter={casetracker}/>
      {casetracker ? <CasesTracker/> : <VaccineTracker/>}
    </div>
  );
}
