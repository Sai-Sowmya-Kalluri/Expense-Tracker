import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AddExpense from "./pages/AddExpense"
import Summary from "./pages/Summary"
import Report from "./pages/Report"
import "./App.css"

function App() {
  const [page, setPage] = useState("login")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem("username")
    if (u) {
      setUser(u)
      setPage("dashboard")
    }
  }, [])

  return (
    <>
      {/* small HMR badge */}
      <div style={{
        position: "fixed",
        right: 12,
        top: 12,
        background: "#fff",
        padding: "6px 10px",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        zIndex: 9999,
        fontSize: 13,
        fontWeight: 600
      }}>
        Count is 15
      </div>

      {page === "login" && <Login setPage={setPage} setUser={setUser} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} user={user} setUser={setUser} />}
      {page === "add" && <AddExpense setPage={setPage} user={user} setUser={setUser} />}
      {page === "summary" && <Summary setPage={setPage} user={user} setUser={setUser} />}
      {page === "report" && <Report setPage={setPage} user={user} setUser={setUser} />}
    </>
  )
}

export default App