import { useState, useMemo } from "react"

/**
 * Generic hook for managing filters
 */
export function useFilter<T>(
  items: T[],
  filterFn: (item: T, filterValue: string) => boolean,
  initialFilter = "all",
) {
  const [filterValue, setFilterValue] = useState(initialFilter)

  const filteredItems = useMemo(() => {
    if (filterValue === "all") return items
    return items.filter((item) => filterFn(item, filterValue))
  }, [items, filterValue, filterFn])

  return {
    filterValue,
    setFilterValue,
    filteredItems,
    itemCount: filteredItems.length,
    totalCount: items.length,
  }
}
