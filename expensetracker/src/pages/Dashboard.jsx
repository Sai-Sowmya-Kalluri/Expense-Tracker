import { useEffect, useState } from "react"
import { getExpensesAPI } from "../api"

export default function Dashboard({ setPage, user, setUser }) {
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(() => Number(localStorage.getItem(`${user}-income`) || 0))

  useEffect(() => {
    if (!user) return
    getExpensesAPI(user).then(r => { if (r.success) setExpenses(r.data || []) })
    const saved = Number(localStorage.getItem(`${user}-income`) || 0)
    setIncome(saved)
  }, [user])

  const totalExpense = expenses.reduce((s, e) => s + (e.amount || 0), 0)
  const balance = income - totalExpense

  function saveIncome(v) {
    const n = Number(v) || 0
    setIncome(n)
    localStorage.setItem(`${user}-income`, n)
  }

  function logout() {
    localStorage.removeItem("username")
    setUser(null)
    setPage("login")
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Welcome {user}</h1>
          <p className="subtext">Your expense history is stored for this account until logout.</p>
        </div>
        <div>
          <button className="btn-secondary" onClick={logout}>Logout</button>
          <button className="btn-primary" onClick={() => setPage("add")}>Add Expense</button>
          <button className="btn-secondary" onClick={() => setPage("summary")}>Summary</button>
          <button className="btn-secondary" onClick={() => setPage("report")}>Report</button>
        </div>
      </div>

      <div className="summary-grid">
        <div className="card green-card">
          <h4>Income</h4>
          <p>₹{income.toLocaleString()}</p>
          <input className="input-box" type="number" placeholder="Set income" onBlur={e => saveIncome(e.target.value)} />
        </div>
        <div className="card orange-card"><h4>Spent</h4><p>₹{totalExpense.toLocaleString()}</p></div>
        <div className="card blue-card"><h4>Balance</h4><p>₹{balance.toLocaleString()}</p></div>
      </div>
    </div>
  )
}