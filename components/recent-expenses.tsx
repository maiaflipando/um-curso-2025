import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categoryColors = {
  Oficina: "bg-blue-100 text-blue-800",
  Viajes: "bg-green-100 text-green-800",
  Comidas: "bg-yellow-100 text-yellow-800",
  Software: "bg-purple-100 text-purple-800",
  Marketing: "bg-pink-100 text-pink-800",
  Equipos: "bg-indigo-100 text-indigo-800",
  Otros: "bg-gray-100 text-gray-800",
}

export function RecentExpenses({ expenses }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos Recientes</CardTitle>
        <CardDescription>Últimos 10 gastos registrados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{expense.description}</p>
                  <p className="font-bold text-lg">${expense.amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={categoryColors[expense.category] || categoryColors["Otros"]}>
                    {expense.category}
                  </Badge>
                  <span className="text-xs text-gray-500">{expense.teamName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{new Date(expense.date).toLocaleDateString("es-ES")}</span>
                </div>
              </div>
            </div>
          ))}
          {expenses.length === 0 && <div className="text-center py-8 text-gray-500">No hay gastos registrados</div>}
        </div>
      </CardContent>
    </Card>
  )
}
