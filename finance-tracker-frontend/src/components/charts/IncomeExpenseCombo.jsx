import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const income  = [12000, 15000, 18000, 35000, 18000, 16000, 22000, 24000, 23000, 26000, 28000, 20239];
const expense = [ 6000,  9000, 12000, 20000, 10000, 15000, 14000, 12000, 16000, 18000, 15000, 20239];
const data = months.map((m,i)=>({m, income:income[i], expense:expense[i]}));

export default function IncomeExpenseCombo(){
  return (
    <div style={{width:"100%", height:220}}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{left:0,right:10,top:10,bottom:0}}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,.06)"/>
          <XAxis dataKey="m" tick={{fill:"#97a0b8"}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fill:"#97a0b8"}} axisLine={false} tickLine={false}/>
          <Tooltip contentStyle={{background:"#0e1426", border:"0", borderRadius:10, color:"#e6e8ee"}}/>
          <Line type="monotone" dataKey="expense" stroke="#ff6a6a" strokeWidth={2.4} dot={false}/>
          <Line type="monotone" dataKey="income" stroke="#22d3ee" strokeWidth={2.4} strokeDasharray="5 6" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
