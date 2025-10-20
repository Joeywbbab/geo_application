import { cn } from "@/lib/utils"
import { getSentimentColorClass } from "@/lib/helpers"
import type { Sentiment } from "@/types"

interface SentimentIndicatorProps {
  sentiment: Sentiment
  score?: number
  className?: string
}

/**
 * Visual indicator for sentiment with colored bar
 */
export function SentimentIndicator({ sentiment, score, className }: SentimentIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className={cn("w-1 h-4 rounded-full", getSentimentColorClass(sentiment))} />
      {score !== undefined && <span className="text-sm text-foreground">{score}</span>}
    </div>
  )
}
