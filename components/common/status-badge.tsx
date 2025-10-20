import { Badge } from "@/components/ui/badge"
import type { Sentiment } from "@/types"

interface StatusBadgeProps {
  sentiment: Sentiment
  className?: string
}

/**
 * Badge component for displaying sentiment with appropriate colors
 */
export function StatusBadge({ sentiment, className }: StatusBadgeProps) {
  const variantMap = {
    Positive: "default" as const,
    Neutral: "secondary" as const,
    Negative: "destructive" as const,
  }

  return (
    <Badge variant={variantMap[sentiment]} className={className}>
      {sentiment}
    </Badge>
  )
}
