import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts"

const data = [

  {
    month: "Jan",
    expense: 4000
  },

  {
    month: "Feb",
    expense: 7000
  },

  {
    month: "Mar",
    expense: 5000
  },

  {
    month: "Apr",
    expense: 8000
  }

]

function MonthlyReport({
  setPage
}) {

  return (

    <div className="report-page">

      <h1>
        📈 Monthly Analysis
      </h1>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="report"
        className="dashboard-image"
      />

      <div className="chart-section">

        <BarChart
          width={600}
          height={350}
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="expense"
            fill="#3b82f6"
          />

        </BarChart>

      </div>

      <div className="rating-card">

        <h2>
          Monthly Analysis
        </h2>

        <p>
          Your expenses increased
          during April.
          Try reducing unnecessary
          entertainment spending.
        </p>

      </div>

      <button
        className="blue-btn"
        onClick={() =>
          setPage("dashboard")
        }
      >
        ⬅ Back Dashboard
      </button>

    </div>

  )
}

export default MonthlyReport