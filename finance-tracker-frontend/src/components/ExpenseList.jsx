import "./ExpenseList.css";

export default function ExpenseList(){
  const rows = [
    {k:'Routine Vet', v:140},
    {k:'Food', v:950},
    {k:'Food Treats', v:231},
    {k:'Kennel Boarding', v:65},
  ];
  return (
    <div className="exp card">
      <div className="header">
        <div className="title">Expenses for My Dogs and Cats</div>
        <div className="small">www.other-levels.com</div>
      </div>
      <ul className="list">
        {rows.map(r=>(
          <li key={r.k}><span>{r.v}</span><span>{r.k}</span></li>
        ))}
      </ul>
      <div className="dog" aria-hidden>
  {/* simple inline dog */}
  <svg viewBox="0 0 140 90" width="120" height="78">

          <rect x="40" y="35" width="50" height="30" rx="10" fill="#f4a259"/>
          <circle cx="25" cy="45" r="18" fill="#f4a259"/>
          <circle cx="22" cy="43" r="5" fill="#000"/>
          <circle cx="27" cy="50" r="3" fill="#fff"/>
          <rect x="65" y="60" width="14" height="18" rx="5" fill="#f4a259"/>
          <rect x="88" y="55" width="30" height="12" rx="6" fill="#f4a259"/>
          <rect x="20" y="30" width="14" height="12" rx="3" fill="#7a4a2f"/>
        </svg>
      </div>
    </div>
  )
}
