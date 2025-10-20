import { useState } from "react"

/**
 * Generic hook for managing tab state
 */
export function useTabs<T extends string>(initialTab: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab)

  const isActive = (tab: T) => activeTab === tab

  return {
    activeTab,
    setActiveTab,
    isActive,
  }
}
