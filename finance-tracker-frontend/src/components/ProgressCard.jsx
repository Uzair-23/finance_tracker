import "./ProgressCard.css";

export default function ProgressCard(){
  const percent = 61;
  return (
    <div className="progress-card card">
      <div className="row"><span className="small">Income Goal</span><span className="small">{percent}%</span></div>
      <div className="bar">
        <div className="fill" style={{width:`${percent}%`}} />
      </div>
      <div className="row small"><span>Progress to month</span><span>$24,050 / 39,276</span></div>
    </div>
  )
}
