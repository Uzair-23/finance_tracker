import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
const data = [20100,22000,24050,23000,24050].map((v,i)=>({i,v}));

export default function IncomeLine(){
  return (
    <div style={{width:"100%", height:90}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Tooltip contentStyle={{background:"#0e1426", border:"0", borderRadius:10, color:"#e6e8ee"}}/>
          <Line type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={2.6} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
