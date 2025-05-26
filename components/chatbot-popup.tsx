"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"

export function ChatbotPopup() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

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

    return () => {
      // Don't remove script on unmount as it might be used by other components
    }
  }, [])

  const togglePopup = () => {
    setIsVisible(!isVisible)
    setIsMinimized(false)
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
          <Button
            onClick={togglePopup}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      )}

      {/* Popup Chatbot */}
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
              isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">Asistente de Gastos</span>
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimize}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closePopup}
                  className="text-white hover:bg-blue-700 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="h-[calc(600px-65px)] flex items-center justify-center p-4">
                {!isScriptLoaded ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="text-gray-500 text-sm">Cargando asistente...</p>
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
              <div className="p-3">
                <p className="text-sm text-gray-600">Haz clic para expandir el asistente</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
