"use client"

import { useEffect, useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { getExpensesByUser, getCurrentUser } from "@/lib/data"
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react"
import { FloatingChatbotButton } from "@/components/floating-chatbot-button"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [analytics, setAnalytics] = useState({
    categoryData: [],
    monthlyData: [],
    teamData: [],
    trends: {},
  })

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = "/"
      return
    }

    setUser(currentUser)
    const userExpenses = getExpensesByUser(currentUser)
    setExpenses(userExpenses)

    calculateAnalytics(userExpenses, selectedPeriod)
  }, [selectedPeriod])

  const calculateAnalytics = (expenseData, period) => {
    const now = new Date()
    const periodMonths = period === "3months" ? 3 : period === "6months" ? 6 : 12
    const startDate = new Date(now.getFullYear(), now.getMonth() - periodMonths, 1)

    const filteredExpenses = expenseData.filter((exp) => new Date(exp.date) >= startDate)

    // Category analysis
    const categoryTotals = {}
    filteredExpenses.forEach((exp) => {
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount
    })

    const categoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)) * 100).toFixed(1),
    }))

    // Monthly analysis
    const monthlyTotals = {}
    filteredExpenses.forEach((exp) => {
      const monthKey = new Date(exp.date).toLocaleDateString("es-ES", { year: "numeric", month: "short" })
      monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + exp.amount
    })

    const monthlyData = Object.entries(monthlyTotals)
      .map(([month, amount]) => ({
        month,
        amount,
      }))
      .sort((a, b) => new Date(a.month) - new Date(b.month))

    // Team analysis (if admin)
    const teamTotals = {}
    if (user?.role === "admin_manager") {
      filteredExpenses.forEach((exp) => {
        teamTotals[exp.teamName] = (teamTotals[exp.teamName] || 0) + exp.amount
      })
    }

    const teamData = Object.entries(teamTotals).map(([team, amount]) => ({
      team,
      amount,
    }))

    // Trends
    const currentMonth = filteredExpenses
      .filter((exp) => {
        const expDate = new Date(exp.date)
        return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, exp) => sum + exp.amount, 0)

    const lastMonth = filteredExpenses
      .filter((exp) => {
        const expDate = new Date(exp.date)
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        return expDate.getMonth() === lastMonthDate.getMonth() && expDate.getFullYear() === lastMonthDate.getFullYear()
      })
      .reduce((sum, exp) => sum + exp.amount, 0)

    const monthlyChange = lastMonth > 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0

    setAnalytics({
      categoryData,
      monthlyData,
      teamData,
      trends: {
        currentMonth,
        lastMonth,
        monthlyChange,
        totalPeriod: filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0),
        avgMonthly: filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0) / periodMonths,
      },
    })
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Análisis Financiero</h1>
              <p className="text-gray-600 mt-2">Insights y tendencias de gastos para toma de decisiones</p>
            </div>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="12months">Último año</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Período</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.trends.totalPeriod?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {selectedPeriod === "3months" ? "3 meses" : selectedPeriod === "6months" ? "6 meses" : "12 meses"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Promedio Mensual</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.trends.avgMonthly?.toFixed(0)}</div>
                <p className="text-xs text-muted-foreground">Gasto promedio por mes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Este Mes</CardTitle>
                {analytics.trends.monthlyChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.trends.currentMonth?.toLocaleString()}</div>
                <p className={`text-xs ${analytics.trends.monthlyChange >= 0 ? "text-red-500" : "text-green-500"}`}>
                  {analytics.trends.monthlyChange >= 0 ? "+" : ""}
                  {analytics.trends.monthlyChange?.toFixed(1)}% vs anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mes Anterior</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${analytics.trends.lastMonth?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Referencia comparativa</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Tendencia Mensual</CardTitle>
                <CardDescription>Evolución de gastos por mes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Gastos"]} />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Categoría</CardTitle>
                <CardDescription>Gastos agrupados por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analytics.categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, percentage }) => `${category} (${percentage}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {analytics.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Gastos"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Gastos por Categoría</CardTitle>
                <CardDescription>Comparación detallada por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Gastos"]} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Team Comparison (Admin only) */}
            {user.role === "admin_manager" && analytics.teamData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Gastos por Equipo</CardTitle>
                  <CardDescription>Comparación entre equipos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.teamData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="team" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Gastos"]} />
                      <Bar dataKey="amount" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Add this line */}
      <FloatingChatbotButton />
    </div>
  )
}
