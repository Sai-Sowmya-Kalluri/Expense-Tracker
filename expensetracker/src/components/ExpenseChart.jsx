import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts"

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f97316",
  "#06b6d4",
  "#e11d48",
  "#a855f7"
]

function ExpenseChart({ expenses }) {

  const data = []

  expenses.forEach((expense) => {

    const existingCategory =
      data.find(
        item => item.name === expense.category
      )

    if (existingCategory) {

      existingCategory.value += expense.amount

    }

    else {

      data.push({

        name: expense.category,

        value: expense.amount

      })

    }

  })

  return (

    <div className="chart-section">

      <h2>
        📈 Expense Distribution
      </h2>

      <PieChart width={450} height={350}>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >

          {

            data.map((_, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />

            ))

          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </div>

  )
}

export default ExpenseChart