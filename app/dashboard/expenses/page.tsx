"use client"

import { useEffect, useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ExpenseTable } from "@/components/expense-table"
import { ExpenseForm } from "@/components/expense-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Download } from "lucide-react"
import { getExpensesByUser, getCurrentUser, addExpense } from "@/lib/data"
import { FloatingChatbotButton } from "@/components/floating-chatbot-button"

export default function ExpensesPage() {
  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = "/"
      return
    }

    setUser(currentUser)
    setExpenses(getExpensesByUser(currentUser))
  }, [])

  const handleAddExpense = (expenseData) => {
    const newExpense = addExpense(expenseData, user)
    setExpenses((prev) => [newExpense, ...prev])
    setIsDialogOpen(false)
  }

  const exportToCSV = () => {
    const headers = ["Fecha", "Descripción", "Categoría", "Monto", "Equipo", "Usuario"]
    const csvContent = [
      headers.join(","),
      ...expenses.map((expense) =>
        [
          expense.date,
          `"${expense.description}"`,
          expense.category,
          expense.amount,
          expense.teamName,
          expense.userName,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `gastos-flipzen-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
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
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Gastos</h1>
              <p className="text-gray-600 mt-2">Administra y monitorea todos los gastos del equipo</p>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Gasto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Registrar Nuevo Gasto</DialogTitle>
                    <DialogDescription>
                      Completa la información del gasto para registrarlo en el sistema
                    </DialogDescription>
                  </DialogHeader>
                  <ExpenseForm onSubmit={handleAddExpense} user={user} />
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total de Gastos</CardTitle>
                <CardDescription>Suma total de todos los gastos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Número de Registros</CardTitle>
                <CardDescription>Total de gastos registrados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{expenses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Promedio por Gasto</CardTitle>
                <CardDescription>Monto promedio por registro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  $
                  {expenses.length > 0
                    ? (expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length).toFixed(0)
                    : 0}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expenses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de Gastos</CardTitle>
              <CardDescription>Lista completa de gastos con filtros y búsqueda</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseTable expenses={expenses} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add this line */}
      <FloatingChatbotButton />
    </div>
  )
}
