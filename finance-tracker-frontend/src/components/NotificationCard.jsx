import "./NotificationCard.css";

export default function NotificationCard(){
  return (
    <div className="notify card">
      <div className="bubble">
        <div className="dot"></div>
        <div className="msg">
          <strong>3 Bills are past Due</strong>, Pay soon to avoid late fees.
        </div>
      </div>
    </div>
  )
}
