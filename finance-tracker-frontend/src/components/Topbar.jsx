import { FiGrid, FiTable, FiCalendar } from "react-icons/fi";
import "./Topbar.css";

export default function Topbar(){
  return (
    <div className="topbar">
      <div className="tabs">
        <button className="btn active"><FiGrid/> Dashboard</button>
        <button className="btn"><FiTable/> Spreadsheet</button>
        <button className="btn"><FiCalendar/> Sunday, February 5, 2023</button>
      </div>

      <div className="profile">
        <img src={`https://i.pravatar.cc/100?img=12`} alt="avatar"/>
        <div>
          <div className="name">Simon K. Jimmy</div>
          <div className="role small">Mortgage consultant</div>
        </div>
      </div>
    </div>
  )
}
