import { useState, useCallback } from "react"

/**
 * Hook for managing dialog/modal state
 */
export function useDialog<T = string | null>(initialState = false, initialData: T | null = null) {
  const [isOpen, setIsOpen] = useState(initialState)
  const [data, setData] = useState<T | null>(initialData)

  const open = useCallback((dialogData?: T) => {
    setIsOpen(true)
    if (dialogData !== undefined) {
      setData(dialogData)
    }
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setData(null)
  }, [])

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData,
  }
}
