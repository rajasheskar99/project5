import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccineGender} = props

  return (
    <div className="bar-bg">
      <h1 className="bar-title">Vaccination by gender</h1>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart className="chart">
            <Pie
              cx="50%"
              cy="40%"
              data={vaccineGender}
              endAngle={180}
              startAngle={0}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="Male" fill=" #f54394" />
              <Cell name="Female" fill="#5a8dee" />
              <Cell name="Others" fill="#2cc6c6" />
            </Pie>
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VaccinationByAge
