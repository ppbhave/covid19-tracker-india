import "./styles/Header.css";
function Header({pageChange}) {
  return (
    <div className="app_header">
      <h2>Covid-19 India Tracker</h2>
      <div className="casesTracker" onClick={()=>{pageChange(true)}}>cases tracker</div>
      <div className="vaccineTracker" onClick={()=>{pageChange(false)}}>vaccine tracker</div>
    </div>
  );
}
export default Header;
