'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from './button'

interface CopyButtonProps {
  text: string
  label?: string
}

export function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="gap-2 font-bold border-2 shadow-brutal hover-lift transition-all"
    >
      {copied ? (
        <>
          <Check size={16} className="text-primary" />
          {label ? 'Tersalin!' : ''}
        </>
      ) : (
        <>
          <Copy size={16} />
          {label}
        </>
      )}
    </Button>
  )
}
