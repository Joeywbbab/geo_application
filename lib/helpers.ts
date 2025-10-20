import type { Citation, Tag, BrandMention } from "@/types"
import { AVAILABLE_TAGS } from "@/constants"

/**
 * Get tag color by tag name
 */
export function getTagColor(tagName: string): string {
  return AVAILABLE_TAGS.find((tag) => tag.name === tagName)?.color || "#6B7280"
}

/**
 * Group citations by domain
 */
export function groupCitationsByDomain(
  citations: Citation[],
): Map<string, Citation[]> {
  const grouped = new Map<string, Citation[]>()
  citations.forEach((citation) => {
    const existing = grouped.get(citation.domain) || []
    grouped.set(citation.domain, [...existing, citation])
  })
  return grouped
}

/**
 * Calculate average rank for citations
 */
export function calculateAverageRank(citations: Citation[]): string {
  if (citations.length === 0) return "0.0"
  const sum = citations.reduce((acc, citation) => acc + citation.visibilityRank, 0)
  return (sum / citations.length).toFixed(1)
}

/**
 * Get unique brand mentions from multiple citations
 */
export function getUniqueBrandMentions(citations: Citation[]): BrandMention[] {
  const allBrandMentions = citations.flatMap((c) => c.brandMentions)
  return Array.from(new Map(allBrandMentions.map((b) => [b.brand, b])).values())
}

/**
 * Format date string to relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Today"
  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  return `${Math.floor(diffInDays / 30)} months ago`
}

/**
 * Get sentiment color class
 */
export function getSentimentColorClass(sentiment: "Positive" | "Neutral" | "Negative"): string {
  const colorMap = {
    Positive: "bg-green-500",
    Neutral: "bg-yellow-500",
    Negative: "bg-red-500",
  }
  return colorMap[sentiment]
}

/**
 * Get badge variant based on impact level
 */
export function getImpactBadgeVariant(
  impact: "High" | "Medium" | "Low",
): "default" | "secondary" | "outline" {
  const variantMap = {
    High: "default" as const,
    Medium: "secondary" as const,
    Low: "outline" as const,
  }
  return variantMap[impact]
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Format percentage change
 */
export function formatPercentageChange(change: number): string {
  const prefix = change > 0 ? "+" : ""
  return `${prefix}${change}%`
}

/**
 * Check if value is in range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Sort array by property
 */
export function sortByProperty<T>(
  array: T[],
  property: keyof T,
  direction: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[property]
    const bVal = b[property]

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal
    }

    return 0
  })
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Filter array by search term
 */
export function filterBySearchTerm<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchFields: (keyof T)[],
): T[] {
  if (!searchTerm.trim()) return items

  const lowerSearchTerm = searchTerm.toLowerCase()

  return items.filter((item) =>
    searchFields.some((field) => {
      const value = item[field]
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearchTerm)
      }
      return false
    }),
  )
}
