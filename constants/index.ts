import type { Tag } from "@/types"
import { Lightbulb, TrendingUp, RefreshCw, Sparkles } from "lucide-react"

// Available tags for prompts
export const AVAILABLE_TAGS: Tag[] = [
  { id: "1", name: "remote", color: "#3B82F6" },
  { id: "2", name: "collaboration", color: "#10B981" },
  { id: "3", name: "comparison", color: "#F59E0B" },
  { id: "4", name: "agile", color: "#8B5CF6" },
  { id: "5", name: "automation", color: "#EC4899" },
  { id: "6", name: "workflows", color: "#06B6D4" },
  { id: "7", name: "features", color: "#84CC16" },
  { id: "8", name: "pricing", color: "#F97316" },
  { id: "9", name: "startups", color: "#6366F1" },
  { id: "10", name: "AI", color: "#EF4444" },
  { id: "11", name: "memory", color: "#14B8A6" },
]

// Opportunity type icons mapping
export const OPPORTUNITY_ICONS = {
  Creation: Lightbulb,
  Optimization: TrendingUp,
  Refresh: RefreshCw,
  Suggestion: Sparkles,
} as const

// Opportunity type colors
export const OPPORTUNITY_COLORS = {
  Creation: "text-chart-3",
  Optimization: "text-chart-2",
  Refresh: "text-chart-4",
  Suggestion: "text-chart-5",
} as const

// Opportunity type descriptions
export const OPPORTUNITY_DESCRIPTIONS = {
  Creation: "Competitors are capturing traffic in this space while your brand has no presence.",
  Optimization: "Your content exists but competitors are outranking you with better optimization.",
  Refresh: "Your content is performing well but risks decay without updates.",
  Suggestion: "Untapped opportunity where neither you nor competitors have strong presence.",
} as const

// Sentiment color mapping
export const SENTIMENT_COLORS = {
  Positive: "bg-green-500",
  Neutral: "bg-yellow-500",
  Negative: "bg-red-500",
} as const

// Model icons
export const MODEL_ICONS = {
  GPT: "G",
  Perplexity: "🔮",
  "AI Overview": "🤖",
} as const

// Date filter options
export const DATE_FILTER_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "all", label: "All time" },
  { value: "custom", label: "Custom" },
] as const

// Model filter options
export const MODEL_FILTER_OPTIONS = [
  { value: "all", label: "All Models" },
  { value: "gpt", label: "GPT" },
  { value: "perplexity", label: "Perplexity" },
  { value: "ai-overview", label: "AI Overview" },
] as const

// Impact filter options
export const IMPACT_FILTER_OPTIONS = [
  { value: "all", label: "All Impact" },
  { value: "High", label: "High Impact" },
  { value: "Medium", label: "Medium Impact" },
  { value: "Low", label: "Low Impact" },
] as const

// Prompt status tabs
export const PROMPT_STATUS_TABS = ["Active", "Suggested", "Inactive"] as const

// Citation view tabs
export const CITATION_VIEW_TABS = ["domain", "url"] as const

// Opportunity status tabs
export const OPPORTUNITY_STATUS_TABS = ["pending", "in-progress", "evaluated"] as const

// Dashboard opportunity status tabs
export const DASHBOARD_OPPORTUNITY_STATUS = ["In Progress", "Evaluated"] as const
