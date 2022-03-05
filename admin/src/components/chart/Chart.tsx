import './chart.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUserStats } from '../../store/reducers/usersReducer/ActionsCreators'
import { useEffect, useMemo, useState } from 'react'

export interface DataStats {
  _id: string
  total: string
}

interface ChartProps {
    data: Array<DataStats> | null
    title: string
    dataKey: string
}

export const Chart: React.FC<ChartProps> = ({data, title, dataKey}) => {
  const [dataByMonth, setDataByMonth] = useState<Array<DataStats | []>>([])
  const MONTHS = useMemo(
    () => ["January","February","March","April","May","June","July",
    "August","September","October","November","December"],
    [],
  )

  useEffect(() => {
    if (data) {
      const copyData = [...data]
      const sortedData = copyData.sort((a: any, b: any) => a._id - b._id)
      sortedData.map((item) => {
        //@ts-ignore
        setDataByMonth((prev) => [
          ...prev,
          //@ts-ignore
          { month: MONTHS[item._id - 1], [dataKey]: item.total },
        ])
      })
    }
  }, [data])

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={dataByMonth}>
          <XAxis dataKey='month' stroke="#5550bd" />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
