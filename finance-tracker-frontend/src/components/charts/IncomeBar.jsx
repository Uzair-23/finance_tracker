import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  {name:"E-commerce", val:2100},
  {name:"Google Adsense", val:950},
  {name:"My Shop", val:8000},
  {name:"Salary", val:13000},
];

export default function IncomeBar(){
  return (
    <div style={{width:"100%", height:150}}>
      <ResponsiveContainer>
        <BarChart data={data} barSize={22}>
          <XAxis dataKey="name" tick={{fill:"#97a0b8", fontSize:12}} axisLine={false} tickLine={false}/>
          <Tooltip cursor={{fill:"rgba(255,255,255,.05)"}} contentStyle={{background:"#0e1426", border:"0", borderRadius:10, color:"#e6e8ee"}}/>
          <Bar dataKey="val" radius={[8,8,0,0]} fill="url(#grad)" />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee"/>
              <stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
