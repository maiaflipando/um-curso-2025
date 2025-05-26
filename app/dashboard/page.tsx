"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardNav } from "@/components/dashboard-nav"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentExpenses } from "@/components/recent-expenses"
import { TrendingUp, TrendingDown, DollarSign, Building2, AlertTriangle } from "lucide-react"
import { getExpensesByUser, getTeams, getCurrentUser } from "@/lib/data"
import { FloatingChatbotButton } from "@/components/floating-chatbot-button"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [teams, setTeams] = useState([])
  const [stats, setStats] = useState({
    totalExpenses: 0,
    monthlyExpenses: 0,
    teamCount: 0,
    avgExpense: 0,
    monthlyChange: 0,
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = "/"
      return
    }

    setUser(currentUser)
    const userExpenses = getExpensesByUser(currentUser)
    const allTeams = getTeams()

    setExpenses(userExpenses)
    setTeams(allTeams)

    // Calculate stats
    const total = userExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyExpenses = userExpenses
      .filter((exp) => {
        const expDate = new Date(exp.date)
        return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear
      })
      .reduce((sum, exp) => sum + exp.amount, 0)

    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const lastMonthExpenses = userExpenses
      .filter((exp) => {
        const expDate = new Date(exp.date)
        return expDate.getMonth() === lastMonth && expDate.getFullYear() === lastMonthYear
      })
      .reduce((sum, exp) => sum + exp.amount, 0)

    const monthlyChange = lastMonthExpenses > 0 ? ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100 : 0

    setStats({
      totalExpenses: total,
      monthlyExpenses,
      teamCount: currentUser.role === "admin_manager" ? allTeams.length : 1,
      avgExpense: userExpenses.length > 0 ? total / userExpenses.length : 0,
      monthlyChange,
    })
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Financiero</h1>
            <p className="text-gray-600 mt-2">
              Bienvenido, {user.name} - {user.role === "admin_manager" ? "Administrador General" : "Manager de Equipo"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalExpenses.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Acumulado histórico</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
                {stats.monthlyChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyExpenses.toLocaleString()}</div>
                <p className={`text-xs ${stats.monthlyChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                  {stats.monthlyChange >= 0 ? "+" : ""}
                  {stats.monthlyChange.toFixed(1)}% vs mes anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {user.role === "admin_manager" ? "Equipos" : "Mi Equipo"}
                </CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.teamCount}</div>
                <p className="text-xs text-muted-foreground">
                  {user.role === "admin_manager" ? "Equipos activos" : "Equipo asignado"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.avgExpense.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">Por gasto registrado</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Recent Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseChart expenses={expenses} />
            <RecentExpenses expenses={expenses.slice(0, 10)} />
          </div>
        </div>
      </main>

      {/* Add this line */}
      <FloatingChatbotButton />
    </div>
  )
}
