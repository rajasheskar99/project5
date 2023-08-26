import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccineAge} = props

  return (
    <div className="bar-bg">
      <h1 className="bar-title">Vaccination by age</h1>
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart className="chart">
            <Pie
              cx="50%"
              cy="40%"
              data={vaccineAge}
              endAngle={360}
              startAngle={0}
              innerRadius="0%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="18-44" fill=" #5a8dee" />
              <Cell name="44-60" fill=" #2cc6c6" />
              <Cell name="Above 60" fill=" #a3df9f " />
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
