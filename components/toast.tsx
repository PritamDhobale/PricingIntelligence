"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Toast {
  id: string
  title: string
  description?: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const toastContext = {
  toasts: [] as Toast[],
  addToast: () => {},
  removeToast: () => {},
}

let toastState: Toast[] = []
let listeners: ((toasts: Toast[]) => void)[] = []

export const toast = {
  success: (title: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, type: "success" as const }
    toastState = [...toastState, newToast]
    listeners.forEach((listener) => listener(toastState))
    setTimeout(() => {
      toastState = toastState.filter((t) => t.id !== id)
      listeners.forEach((listener) => listener(toastState))
    }, 3000)
  },
  error: (title: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, type: "error" as const }
    toastState = [...toastState, newToast]
    listeners.forEach((listener) => listener(toastState))
    setTimeout(() => {
      toastState = toastState.filter((t) => t.id !== id)
      listeners.forEach((listener) => listener(toastState))
    }, 3000)
  },
  info: (title: string, description?: string) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, title, description, type: "info" as const }
    toastState = [...toastState, newToast]
    listeners.forEach((listener) => listener(toastState))
    setTimeout(() => {
      toastState = toastState.filter((t) => t.id !== id)
      listeners.forEach((listener) => listener(toastState))
    }, 3000)
  },
}

// Add the missing showToast export
export const showToast = toast

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter((listener) => listener !== setToasts)
    }
  }, [])

  const removeToast = (id: string) => {
    toastState = toastState.filter((t) => t.id !== id)
    setToasts(toastState)
  }

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg shadow-lg border max-w-sm",
              toast.type === "success" && "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
              toast.type === "error" && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
              toast.type === "info" && "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800",
            )}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />}
            {toast.type === "info" && <Info className="w-5 h-5 text-blue-600 mt-0.5" />}
            <div className="flex-1">
              <h4
                className={cn(
                  "font-medium text-sm",
                  toast.type === "success" && "text-green-800 dark:text-green-200",
                  toast.type === "error" && "text-red-800 dark:text-red-200",
                  toast.type === "info" && "text-blue-800 dark:text-blue-200",
                )}
              >
                {toast.title}
              </h4>
              {toast.description && (
                <p
                  className={cn(
                    "text-xs mt-1",
                    toast.type === "success" && "text-green-700 dark:text-green-300",
                    toast.type === "error" && "text-red-700 dark:text-red-300",
                    toast.type === "info" && "text-blue-700 dark:text-blue-300",
                  )}
                >
                  {toast.description}
                </p>
              )}
            </div>
            <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
