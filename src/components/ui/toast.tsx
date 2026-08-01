'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react'

export interface ToastProps {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

interface ToastContainerProps {
  toasts: ToastProps[]
  onRemove: (id: string) => void
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
      ))}
    </div>
  )
}

function Toast({ id, message, type = 'info', duration = 4000, onClose }: ToastProps & { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
    
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 size={20} className="text-primary shrink-0" />,
    error: <AlertCircle size={20} className="text-red-500 shrink-0" />,
    info: <Info size={20} className="text-fg shrink-0" />,
  }

  const bgColors = {
    success: 'bg-secondary border-primary',
    error: 'bg-red-100 dark:bg-red-900 border-red-500',
    info: 'bg-surface border-fg',
  }

  return (
    <div
      className={`
        pointer-events-auto
        flex items-start gap-3 p-4 pr-12 border-2 shadow-brutal font-bold text-sm
        transition-all duration-300 ease-out
        ${bgColors[type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-[120%] opacity-0'}
        max-w-md animate-slide-in-right rounded-md
      `}
    >
      {icons[type]}
      <p className="text-fg leading-snug flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="absolute top-3 right-3 text-fg/60 hover:text-fg transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(7)
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return {
    toasts,
    showToast,
    removeToast,
    ToastContainer: () => <ToastContainer toasts={toasts} onRemove={removeToast} />,
  }
}
