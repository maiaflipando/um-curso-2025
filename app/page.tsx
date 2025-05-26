"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { Building2, TrendingUp, Users, Shield } from "lucide-react"

const users = [
  { id: 1, email: "admin@flipzen.com", name: "Carlos Rodriguez", role: "admin_manager" },
  { id: 2, email: "manager1@flipzen.com", name: "Ana Martinez", role: "team_manager", teamId: 1 },
  { id: 3, email: "manager2@flipzen.com", name: "Luis Garcia", role: "team_manager", teamId: 2 },
  { id: 4, email: "manager3@flipzen.com", name: "Sofia Lopez", role: "team_manager", teamId: 3 },
]

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    if (selectedUser) {
      const user = users.find((u) => u.id.toString() === selectedUser)
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))
        router.push("/dashboard")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Flipzen Finance</h1>
            <p className="text-xl text-gray-600">Panel de Control Financiero</p>
            <p className="text-gray-500">
              Monitorea y controla los gastos de tu organización con análisis en tiempo real
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Multi-equipo</p>
                <p className="text-sm text-gray-500">Gestión por equipos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="font-semibold text-gray-900">Analytics</p>
                <p className="text-sm text-gray-500">Análisis financiero</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="font-semibold text-gray-900">Colaborativo</p>
                <p className="text-sm text-gray-500">Trabajo en equipo</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <p className="font-semibold text-gray-900">Seguro</p>
                <p className="text-sm text-gray-500">Control de acceso</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Selecciona tu usuario para acceder al panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">Usuario</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-gray-500">
                          {user.role === "admin_manager" ? "Admin Manager" : "Team Manager"} - {user.email}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleLogin} className="w-full" disabled={!selectedUser}>
              Acceder al Panel
            </Button>

            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <strong>Demo:</strong>
              </p>
              <p>• Admin Manager: Ve todos los equipos</p>
              <p>• Team Manager: Ve solo su equipo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
