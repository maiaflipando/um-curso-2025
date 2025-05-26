"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

const categoryColors = {
  Oficina: "bg-blue-100 text-blue-800",
  Viajes: "bg-green-100 text-green-800",
  Comidas: "bg-yellow-100 text-yellow-800",
  Software: "bg-purple-100 text-purple-800",
  Marketing: "bg-pink-100 text-pink-800",
  Equipos: "bg-indigo-100 text-indigo-800",
  Otros: "bg-gray-100 text-gray-800",
}

export function ExpenseTable({ expenses }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const categories = [...new Set(expenses.map((exp) => exp.category))]

  const filteredAndSortedExpenses = expenses
    .filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.teamName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "amount":
          aValue = a.amount
          bValue = b.amount
          break
        case "date":
          aValue = new Date(a.date)
          bValue = new Date(b.date)
          break
        case "description":
          aValue = a.description.toLowerCase()
          bValue = b.description.toLowerCase()
          break
        default:
          aValue = a.date
          bValue = b.date
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por descripción, usuario o equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("date")}>
                Fecha {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("description")}>
                Descripción {sortBy === "description" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="cursor-pointer hover:bg-gray-50 text-right" onClick={() => handleSort("amount")}>
                Monto {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead>Equipo</TableHead>
              <TableHead>Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{new Date(expense.date).toLocaleDateString("es-ES")}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <Badge className={categoryColors[expense.category] || categoryColors["Otros"]}>
                    {expense.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">${expense.amount.toLocaleString()}</TableCell>
                <TableCell>{expense.teamName}</TableCell>
                <TableCell>{expense.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredAndSortedExpenses.length === 0 && (
          <div className="text-center py-8 text-gray-500">No se encontraron gastos que coincidan con los filtros</div>
        )}
      </div>

      <div className="text-sm text-gray-500">
        Mostrando {filteredAndSortedExpenses.length} de {expenses.length} gastos
      </div>
    </div>
  )
}
