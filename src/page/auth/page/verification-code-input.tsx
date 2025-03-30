

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface VerificationCodeInputProps {
  length?: number
  onComplete?: (code: string) => void
}

export function VerificationCodeInput({ length = 4, onComplete }: VerificationCodeInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
    if (newCode.every((digit) => digit !== "") && onComplete) {
      onComplete(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.slice(0, length).split("")
    const newCode = [...code]
    digits.forEach((digit, index) => {
      if (index < length) {
        newCode[index] = digit
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = digit
        }
      }
    })

    setCode(newCode)
    const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()
    if (newCode.every((digit) => digit !== "") && onComplete) {
      onComplete(newCode.join(""))
    }
  }

  return (
    <div className="flex justify-center space-x-2 md:space-x-4">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 text-center text-xl font-bold"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}

