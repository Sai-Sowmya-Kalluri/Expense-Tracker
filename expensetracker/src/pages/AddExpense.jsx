import { useState } from "react"
import { addExpenseAPI } from "../api"

const categories = ["transportation","grocery","entertainment","maintenance","education","miscellaneous"]

export default function AddExpense({ user, setPage, setUser }) {
  const today = new Date().toISOString().split("T")[0]
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(today)
  const [note, setNote] = useState("")
  const [msg, setMsg] = useState("")

  async function add() {
    if (!amount || Number(amount) <= 0) { setMsg("Enter valid amount"); return }
    const payload = { username: user, amount: Number(amount), category, date, month: new Date(date).toLocaleString("default",{month:"long"}), note }
    const res = await addExpenseAPI(payload)
    setMsg(res.message || "Added")
    setAmount(""); setNote(""); setCategory(categories[0])
  }

  function logout() {
    localStorage.removeItem("username")
    setUser(null)
    setPage("login")
  }

  return (
    <div className="form-page">
      <div className="form-card">
        <div className="page-header">
          <h2>Add Expense</h2>
          <button className="btn-secondary" onClick={logout}>Logout</button>
        </div>
        <input className="input-box" type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
        <select className="input-box" value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input-box" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        <input className="input-box" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
        {msg && <div className="info-msg">{msg}</div>}
        <button className="btn-primary" onClick={add}>Add Expense</button>
        <button className="btn-secondary" onClick={() => setPage("dashboard")}>Back</button>
      </div>
    </div>
  )
}