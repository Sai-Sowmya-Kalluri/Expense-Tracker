import { useState } from "react"
import { loginAPI } from "../api"

export default function Login({ setPage, setUser }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function login() {
    setError("")
    if (!username || !password) {
      setError("Enter username and password")
      return
    }
    setLoading(true)
    try {
      const res = await loginAPI({ username, password })
      if (res.success) {
        localStorage.setItem("username", res.username)
        setUser(res.username)
        setPage("dashboard")
      } else {
        setError(res.message || "Login failed")
      }
    } catch (err) {
      setError("Unexpected error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <input className="input-box" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="input-box" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="error-msg">{error}</div>}
        <button className="btn-primary" onClick={login} disabled={loading}>{loading ? "Signing in..." : "Login"}</button>
        <p className="link-text">Don't have account? <span onClick={() => setPage("signup")} className="link">Signup</span></p>
      </div>
    </div>
  )
}