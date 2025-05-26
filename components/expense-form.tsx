"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getTeams } from "@/lib/data"

const categories = ["Oficina", "Viajes", "Comidas", "Software", "Marketing", "Equipos", "Otros"]

export function ExpenseForm({ onSubmit, user }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    teamId: user.teamId || "",
    date: new Date().toISOString().split("T")[0],
  })

  const teams = getTeams()
  const availableTeams = user.role === "admin_manager" ? teams : teams.filter((team) => team.id === user.teamId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.description && formData.amount && formData.category && formData.teamId) {
      onSubmit({
        ...formData,
        amount: Number.parseFloat(formData.amount),
      })
      setFormData({
        description: "",
        amount: "",
        category: "",
        teamId: user.teamId || "",
        date: new Date().toISOString().split("T")[0],
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          placeholder="Describe el gasto..."
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Monto</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Fecha</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoría</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team">Equipo</Label>
        <Select
          value={formData.teamId.toString()}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, teamId: Number.parseInt(value) }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un equipo" />
          </SelectTrigger>
          <SelectContent>
            {availableTeams.map((team) => (
              <SelectItem key={team.id} value={team.id.toString()}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Registrar Gasto
      </Button>
    </form>
  )
}
