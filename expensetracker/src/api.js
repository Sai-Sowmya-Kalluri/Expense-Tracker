import axios from "axios"

const API_BASE = "http://127.0.0.1:8000"

function readLocalUsers() {
  return JSON.parse(localStorage.getItem("et_users") || "[]")
}
function writeLocalUsers(users) {
  localStorage.setItem("et_users", JSON.stringify(users))
}
function readLocalExpenses(username) {
  return JSON.parse(localStorage.getItem(`et_expenses_${username}`) || "[]")
}
function writeLocalExpenses(username, expenses) {
  localStorage.setItem(`et_expenses_${username}`, JSON.stringify(expenses))
}

export async function signupAPI(payload) {
  try {
    const res = await axios.post(`${API_BASE}/signup`, payload, { timeout: 4000 })
    return res.data
  } catch (err) {
    // fallback to localStorage
    const users = readLocalUsers()
    if (users.find(u => u.username === payload.username)) {
      return { success: false, message: "User exists (local)" }
    }
    users.push({ username: payload.username, email: payload.email, password: payload.password, salary: payload.salary })
    writeLocalUsers(users)
    return { success: true, message: "Signup saved locally" }
  }
}

export async function loginAPI(payload) {
  try {
    const res = await axios.post(`${API_BASE}/login`, payload, { timeout: 4000 })
    return res.data
  } catch (err) {
    // fallback to localStorage
    const users = readLocalUsers()
    const u = users.find(x => x.username === payload.username)
    if (!u) return { success: false, message: "User not found (local)" }
    if (u.password !== payload.password) return { success: false, message: "Wrong password (local)" }
    return { success: true, username: u.username, salary: u.salary }
  }
}

export async function addExpenseAPI(payload) {
  try {
    const res = await axios.post(`${API_BASE}/add-expense`, payload, { timeout: 4000 })
    return res.data
  } catch (err) {
    // fallback local
    const cur = readLocalExpenses(payload.username)
    cur.push({
      amount: payload.amount,
      category: payload.category,
      date: payload.date,
      month: payload.month,
      note: payload.note || ""
    })
    writeLocalExpenses(payload.username, cur)
    return { success: true, message: "Expense saved locally" }
  }
}

export async function getExpensesAPI(username) {
  try {
    const res = await axios.get(`${API_BASE}/get-expenses/${username}`, { timeout: 4000 })
    return { success: true, data: res.data }
  } catch (err) {
    // fallback local
    const data = readLocalExpenses(username)
    return { success: true, data }
  }
}