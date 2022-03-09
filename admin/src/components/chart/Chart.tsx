import './chart.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DataStats } from '../../pages/analytics/Analytics'

interface ChartProps {
  data: Array<DataStats>
  title: string
  dataKey: string
}

export const Chart: React.FC<ChartProps> = ({ data, title, dataKey }) => {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
