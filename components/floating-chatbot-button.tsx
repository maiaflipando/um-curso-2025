"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Minimize2, Maximize2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FloatingChatbotButton() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPulse, setShowPulse] = useState(true)

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"]',
    )

    if (existingScript) {
      setIsScriptLoaded(true)
      return
    }

    // Load Zapier chatbot script
    const script = document.createElement("script")
    script.async = true
    script.type = "module"
    script.src = "https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"

    script.onload = () => {
      setIsScriptLoaded(true)
    }

    script.onerror = () => {
      console.error("Error loading Zapier chatbot script")
    }

    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    // Hide pulse after 10 seconds
    const timer = setTimeout(() => {
      setShowPulse(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const togglePopup = () => {
    setIsVisible(!isVisible)
    setIsMinimized(false)
    setShowPulse(false)
  }

  const closePopup = () => {
    setIsVisible(false)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              onClick={togglePopup}
              size="lg"
              className="rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 group"
            >
              <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
            </Button>

            {/* Status indicator */}
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full"></div>
            </div>

            {/* Pulse animation */}
            {showPulse && <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></div>}

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                Asistente de Gastos
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Chatbot */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`bg-white rounded-xl shadow-2xl border transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-xl">
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-white/20 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-medium text-sm">Asistente de Gastos</span>
                  <div className="flex items-center space-x-1 mt-0.5">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-90">En línea</span>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closePopup}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="h-[calc(600px-73px)] flex items-center justify-center">
                {!isScriptLoaded ? (
                  <div className="flex flex-col items-center space-y-4 p-8">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                      <MessageCircle className="h-5 w-5 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 text-sm font-medium">Iniciando asistente...</p>
                      <p className="text-gray-400 text-xs mt-1">Conectando con Zapier</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full">
                    <zapier-interfaces-chatbot-embed
                      is-popup="true"
                      chatbot-id="cmb1ha36c00at1156wizuak9y"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Minimized Content */}
            {isMinimized && (
              <div className="p-3 cursor-pointer" onClick={toggleMinimize}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Asistente minimizado</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">Activo</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
