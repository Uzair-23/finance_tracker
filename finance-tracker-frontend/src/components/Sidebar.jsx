import { FiHome } from "react-icons/fi";
import "./Sidebar.css";

export default function Sidebar(){
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">OL</div>
        <span className="brand-name">Other<br/>Level's</span>
      </div>

      <nav className="months">
        {months.map((m,idx)=>(
          <button key={m} className={`month ${idx===5?'active':''}`}>{m}</button>
        ))}
      </nav>

      <div className="home">
        <FiHome size={20}/>
        <span>Dashboard</span>
      </div>

      <div className="footer-illustration" aria-hidden>
  {/* simple snowy house emoji look */}
  <span>🏠❄️</span>
</div>

    </aside>
  )
}
