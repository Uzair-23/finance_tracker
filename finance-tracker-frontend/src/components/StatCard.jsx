import "./StatCard.css";

export default function StatCard({title, value, subtitle, gradient=false, children}){
  return (
    <div className={`stat card ${gradient?'gradient':''}`}>
      <div className="stat-text">
        {title && <div className="stat-title small">{title}</div>}
        <div className="stat-value">{value}</div>
        {subtitle && <div className="stat-sub small">{subtitle}</div>}
      </div>
      {children}
    </div>
  )
}
