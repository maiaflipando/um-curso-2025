import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ExpenseChart({ expenses }) {
  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date)
    const monthKey = date.toLocaleDateString("es-ES", { year: "numeric", month: "short" })

    if (!acc[monthKey]) {
      acc[monthKey] = 0
    }
    acc[monthKey] += expense.amount

    return acc
  }, {})

  const chartData = Object.entries(monthlyData)
    .map(([month, amount]) => ({
      month,
      amount,
    }))
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .slice(-6) // Last 6 months

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendencia de Gastos</CardTitle>
        <CardDescription>Gastos mensuales de los últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`$${value.toLocaleString()}`, "Gastos"]}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
