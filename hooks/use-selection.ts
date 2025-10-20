import { useState, useCallback } from "react"

/**
 * Hook for managing item selection (checkboxes, multi-select)
 */
export function useSelection<T extends string | number>(initialSelected: Set<T> = new Set()) {
  const [selectedItems, setSelectedItems] = useState<Set<T>>(initialSelected)
  const [isSelectionMode, setIsSelectionMode] = useState(false)

  const toggleItem = useCallback((itemId: T) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }, [])

  const selectAll = useCallback((itemIds: T[]) => {
    setSelectedItems(new Set(itemIds))
  }, [])

  const deselectAll = useCallback(() => {
    setSelectedItems(new Set())
  }, [])

  const toggleSelectAll = useCallback(
    (itemIds: T[]) => {
      if (selectedItems.size === itemIds.length && itemIds.length > 0) {
        deselectAll()
      } else {
        selectAll(itemIds)
      }
    },
    [selectedItems.size, selectAll, deselectAll],
  )

  const toggleSelectionMode = useCallback(() => {
    setIsSelectionMode((prev) => !prev)
    if (isSelectionMode) {
      deselectAll()
    }
  }, [isSelectionMode, deselectAll])

  const isSelected = useCallback((itemId: T) => selectedItems.has(itemId), [selectedItems])

  return {
    selectedItems,
    isSelectionMode,
    toggleItem,
    selectAll,
    deselectAll,
    toggleSelectAll,
    toggleSelectionMode,
    isSelected,
    selectedCount: selectedItems.size,
  }
}
