import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#ef4444","#8b5cf6","#16a34a","#22d3ee"];
const data = [
  {name:"Gold", value:15700},
  {name:"Stock", value:22500},
  {name:"Warehouse", value:120000},
  {name:"Land", value:135000},
];

export default function AssetsDonut(){
  return (
    <div style={{width:"100%", height:230}}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={3}>
            {data.map((_,i)=><Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{color:"#e6e8ee"}}/>
          <Tooltip contentStyle={{background:"#0e1426", border:"0", borderRadius:10, color:"#e6e8ee"}}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
