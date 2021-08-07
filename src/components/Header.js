import "./styles/Header.css";
function Header({pageChange,highlighter}) {
let selected={
  color:"rgb(39, 27, 212)"
}

let unselected={
  color:"brown"
}

  return (
    <div className="app_header">
      <h2>CoviWatchman</h2>
      <div className="casesTracker" onClick={()=>{pageChange(true)}} style={highlighter?selected:unselected}>cases tracker</div>
      <div className="vaccineTracker" onClick={()=>{pageChange(false)}} style={!highlighter?selected:unselected}>vaccine tracker</div>
    </div>
  );
}
export default Header;
