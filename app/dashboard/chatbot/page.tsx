"use client"

import { useEffect, useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Zap, CheckCircle, TrendingUp } from "lucide-react"
import { getCurrentUser } from "@/lib/data"

export default function ChatbotPage() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      window.location.href = "/"
      return
    }
    setUser(currentUser)

    // Load Zapier chatbot script
    const script = document.createElement("script")
    script.async = true
    script.type = "module"
    script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"

    script.onload = () => {
      setIsLoading(false)
    }

    script.onerror = () => {
      console.error("Error loading Zapier chatbot script")
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Asistente de Gastos Flipzen</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Registra y gestiona los gastos de tu equipo de forma natural. Nuestro chatbot inteligente procesará
              automáticamente la información y la integrará en el sistema financiero.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="text-center">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Conversación Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Habla con el chatbot como lo harías con un colega. No necesitas formularios complicados.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Registro Automático</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Los gastos se registran automáticamente en el sistema con categorización inteligente.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Análisis Inmediato</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center">
                  Ve el impacto de tus gastos en tiempo real en los dashboards y reportes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Chatbot Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chatbot Embed */}
            <div className="lg:col-span-2">
              <Card className="h-[700px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-blue-600" />
                        <span>Chatbot de Gastos</span>
                        <Badge variant="secondary" className="ml-2">
                          <Zap className="h-3 w-3 mr-1" />
                          Powered by Zapier
                        </Badge>
                      </CardTitle>
                      <CardDescription>Conversa naturalmente para registrar gastos en el sistema</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="h-[600px] flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="text-gray-500">Cargando chatbot...</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <zapier-interfaces-chatbot-embed
                        is-popup="false"
                        chatbot-id="cmb1ha36c00at1156wizuak9y"
                        height="600px"
                        width="100%"
                        style={{ maxWidth: "100%", width: "100%" }}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Instructions and Tips */}
            <div className="space-y-6">
              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inicio Rápido</CardTitle>
                  <CardDescription>Cómo usar el chatbot efectivamente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-sm">Saluda al chatbot</p>
                        <p className="text-xs text-gray-500">Inicia la conversación de forma natural</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-sm">Describe tu gasto</p>
                        <p className="text-xs text-gray-500">Menciona monto, concepto y categoría</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-sm">Confirma los datos</p>
                        <p className="text-xs text-gray-500">Revisa que la información sea correcta</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Messages */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ejemplos de Mensajes</CardTitle>
                  <CardDescription>Frases que puedes usar para registrar gastos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Gasté $500 en almuerzo de equipo",
                      "Compré licencias de software por $1200",
                      "Viaje a cliente costó $800",
                      "Material de oficina $300",
                      "Campaña de marketing $2500",
                      "Equipos nuevos $1800",
                    ].map((example, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm font-medium text-gray-700">"{example}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tu Información</CardTitle>
                  <CardDescription>Datos que se usarán para registrar gastos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Usuario:</span>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Rol:</span>
                    <Badge variant="outline">{user.role === "admin_manager" ? "Admin Manager" : "Team Manager"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  {user.teamId && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Equipo:</span>
                      <span className="text-sm font-medium">
                        {user.teamId === 1 ? "Desarrollo" : user.teamId === 2 ? "Marketing" : "Ventas"}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Consejos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Sé específico con las descripciones</p>
                    <p>• Incluye el monto en tu mensaje</p>
                    <p>• Menciona la categoría si es posible</p>
                    <p>• Puedes registrar múltiples gastos</p>
                    <p>• El chatbot aprende de tus patrones</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Integration Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Integración con Zapier</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Este chatbot está conectado directamente con nuestro sistema de gestión financiera a través de
                    Zapier. Los gastos registrados aquí aparecerán automáticamente en tus dashboards y reportes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
