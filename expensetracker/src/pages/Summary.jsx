import { useEffect, useState } from "react"
import { getExpensesAPI } from "../api"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#3b82f6","#10b981","#f59e0b","#ef4444","#8b5cf6","#ec4899"]

export default function Summary({ user, setPage, setUser }) {
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)

  useEffect(()=> {
    if (!user) return
    getExpensesAPI(user).then(r=> { if(r.success) setExpenses(r.data || []) })
    setIncome(Number(localStorage.getItem(`${user}-income`) || 0))
  }, [user])

  const totals = {}
  expenses.forEach(e=> totals[e.category] = (totals[e.category]||0) + e.amount)
  const chartData = Object.entries(totals).map(([k,v])=>({name:k, value:v}))
  const total = Object.values(totals).reduce((a,b)=>a+b,0)
  const balance = income - total

  function logout() {
    localStorage.removeItem("username")
    setUser(null)
    setPage("login")
  }

  return (
    <div className="summary-page">
      <div className="page-header">
        <div>
          <h1>Summary</h1>
          <p className="subtext">Your expenses are loaded for this account.</p>
        </div>
        <button className="btn-secondary" onClick={logout}>Logout</button>
      </div>

      <div className="summary-grid">
        <div className="card green-card"><h4>Income</h4><p>₹{income.toLocaleString()}</p></div>
        <div className="card orange-card"><h4>Spent</h4><p>₹{total.toLocaleString()}</p></div>
        <div className="card blue-card"><h4>Balance</h4><p>₹{balance.toLocaleString()}</p></div>
      </div>

      <div className="chart-section">
        {chartData.length ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
                {chartData.map((_,i)=> <Cell key={i} fill={COLORS[i%COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : <p className="no-data">No data</p>}
      </div>

      <button className="btn-secondary" onClick={()=>setPage("dashboard")}>Back</button>
    </div>
  )
}