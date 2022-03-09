import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DataStats } from '../../pages/analytics/Analytics'

interface BasicTableProps {
  data: Array<DataStats>
}

export const StatsTable: React.FC<BasicTableProps> = React.memo(({ data }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell align="right">Total count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any, index: any) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.month}
              </TableCell>
              <TableCell align="right">{row["Total count"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
