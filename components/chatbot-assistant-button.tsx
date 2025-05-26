"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Sparkles } from "lucide-react"

interface ChatbotAssistantButtonProps {
  onToggle: () => void
  isActive: boolean
}

export function ChatbotAssistantButton({ onToggle, isActive }: ChatbotAssistantButtonProps) {
  return (
    <Button variant={isActive ? "default" : "outline"} size="sm" onClick={onToggle} className="relative">
      <MessageCircle className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Asistente</span>
      <span className="sm:hidden">Chat</span>
      {!isActive && (
        <Badge variant="secondary" className="ml-2 px-1 py-0 text-xs">
          <Sparkles className="h-3 w-3" />
        </Badge>
      )}
    </Button>
  )
}
