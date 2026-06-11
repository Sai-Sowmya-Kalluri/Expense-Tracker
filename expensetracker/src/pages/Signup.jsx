import { useState } from "react"
import { signupAPI } from "../api"

export default function Signup({ setPage }) {
  const [data, setData] = useState({ username: "", email: "", password: "", salary: "" })
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function handle(e) { setData({ ...data, [e.target.name]: e.target.value }) }

  async function signup() {
    setMessage("")
    if (!data.username || !data.email || !data.password || !data.salary) {
      setMessage("Please fill all fields")
      return
    }
    setLoading(true)
    try {
      const res = await signupAPI({ username: data.username, email: data.email, password: data.password, salary: Number(data.salary) })
      if (res.success) {
        setMessage("Signup success")
        setTimeout(() => setPage("login"), 900)
      } else {
        setMessage(res.message || "Signup failed")
      }
    } catch {
      setMessage("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Signup</h2>
        <input className="input-box" name="username" placeholder="Username" value={data.username} onChange={handle} />
        <input className="input-box" name="email" placeholder="Email" value={data.email} onChange={handle} />
        <input className="input-box" name="password" type="password" placeholder="Password" value={data.password} onChange={handle} />
        <input className="input-box" name="salary" type="number" placeholder="Monthly Salary" value={data.salary} onChange={handle} />
        {message && <div className="success-msg">{message}</div>}
        <button className="btn-primary" onClick={signup} disabled={loading}>{loading ? "Creating..." : "Signup"}</button>
        <p className="link-text">Already have account? <span onClick={() => setPage("login")} className="link">Login</span></p>
      </div>
    </div>
  )
}