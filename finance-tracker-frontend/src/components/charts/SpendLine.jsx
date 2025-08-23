import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";

const data = [8200,8600,9000,8700,9228].map((v,i)=>({i,v}));

export default function SpendLine(){
  return (
    <div style={{width:"100%", height:90}}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <Tooltip contentStyle={{background:"#0e1426", border:"0", borderRadius:10, color:"#e6e8ee"}}/>
          <Line type="monotone" dataKey="v" stroke="#ff6a6a" strokeWidth={2.6} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
