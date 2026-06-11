import { useEffect, useState } from "react"
import { getExpensesAPI } from "../api"

const LIMITS = { transportation:10000, grocery:8000, entertainment:5000, maintenance:3000, education:5000, miscellaneous:2000 }

export default function Report({ user, setPage, setUser }) {
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)

  useEffect(()=> {
    if(!user) return
    getExpensesAPI(user).then(r=> { if(r.success) setExpenses(r.data || []) })
    setIncome(Number(localStorage.getItem(`${user}-income`) || 0))
  }, [user])

  const totals = {}
  expenses.forEach(e=> totals[e.category] = (totals[e.category]||0) + e.amount)
  const total = Object.values(totals).reduce((a,b)=>a+b,0)
  const balance = income - total
  const ratio = income>0 ? total/income : 0
  let rating = "No Data"
  if(income>0) {
    rating = ratio < 0.5 ? "Good" : ratio < 0.8 ? "Can do better" : "Bad"
  }

  function logout() {
    localStorage.removeItem("username")
    setUser(null)
    setPage("login")
  }

  return (
    <div className="report-page">
      <div className="page-header">
        <div>
          <h1>Monthly Report</h1>
          <p className="subtext">Expenses are loaded per user until logout.</p>
        </div>
        <button className="btn-secondary" onClick={logout}>Logout</button>
      </div>

      <div className="summary-grid">
        <div className="card green-card"><h4>Income</h4><p>₹{income.toLocaleString()}</p></div>
        <div className="card orange-card"><h4>Spent</h4><p>₹{total.toLocaleString()}</p></div>
        <div className="card blue-card"><h4>Balance</h4><p>₹{balance.toLocaleString()}</p></div>
      </div>

      <div className="rating-card">
        <h2>{rating}</h2>
        <p>{ratio<0.5 ? "Great job!" : ratio<0.8 ? "Watch spending" : "Reduce non-essential expenses"}</p>
      </div>

      <div className="warning-card">
        {Object.entries(totals).filter(([c,v])=> v > (LIMITS[c]||0)).length > 0 && (
          <div>
            <h3>Over limit</h3>
            <ul>
              {Object.entries(totals).map(([c,v])=>{
                if(v <= (LIMITS[c]||0)) return null
                return <li key={c}>{c}: ₹{v} (limit ₹{LIMITS[c]})</li>
              })}
            </ul>
          </div>
        )}
      </div>

      <button className="btn-secondary" onClick={()=>setPage("dashboard")}>Back</button>
    </div>
  )
}