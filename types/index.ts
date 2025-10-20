// Core domain types
export type Stage = "Awareness" | "Consideration" | "Decision"
export type PromptType = "Informational" | "Comparative" | "Transactional"
export type Sentiment = "Positive" | "Neutral" | "Negative"
export type PromptStatus = "Active" | "Suggested" | "Inactive"
export type Model = "GPT" | "Perplexity" | "AI Overview"
export type SourceType = "Earned" | "Social" | "Own"

// Brand mention type
export interface BrandMention {
  brand: string
  icon: string
  color: string
}

// Prompt types
export interface Prompt {
  id: string
  prompt: string
  stage: Stage
  type: PromptType
  mentionsMe: number
  mentionsCompetitors: number
  brandMentions: BrandMention[]
  visibilityScore: number
  sentiment: Sentiment
  sentimentScore: number
  position: string
  positionRank: number
  modelsCovered: string[]
  lastUpdated: string
  status: PromptStatus
  volume: number[]
  tags: string[]
}

// Citation types
export type ContentType =
  | "blog post"
  | "ultimate guide"
  | "how-to guide"
  | "listicle"
  | "comparison post"
  | "product listing"
  | "reddit"
  | "linkedin"

export interface Citation {
  id: string
  domain: string
  pageTitle: string
  url: string
  prompt: string
  mentionsMe: boolean
  mentionsCompetitor: boolean
  brandMentions: BrandMention[]
  visibilityRank: number
  sentiment: Sentiment
  model: Model
  capturedAt: string
  snippet: string
  type: ContentType
  mentioned: boolean
  usedTotal: number
  avgCitations: number
  updated: string
}

// Opportunity types
export type OpportunityType = "Creation" | "Optimization" | "Refresh" | "Suggestion"
export type Impact = "High" | "Medium" | "Low"

export interface Opportunity {
  id: string
  title: string
  type: OpportunityType
  sourcePrompts: string[]
  evidence: string[]
  suggestedContentType: string
  estimatedImpact: Impact
  stage: Stage
}

// Content brief types
export type ContentBriefType = "Blog Post" | "Comparison Post" | "Listicle" | "Product Listing" | "Social Post"
export type BriefStatus = "Draft" | "In Progress" | "Review" | "Published"
export type Priority = "High" | "Medium" | "Low"

export interface ContentBrief {
  id: string
  title: string
  contentType: ContentBriefType
  stage: Stage
  targetKeyword: string
  priority: Priority
  status: BriefStatus
  dueDate: string
  opportunitySource?: string
}

// Prompt detail types
export interface VisibilityTrendPoint {
  date: string
  score: number
}

export interface CompetitorMention {
  competitor: string
  mentions: number
  avgRank: number
}

export interface TopSource {
  domain: string
  pageUrl: string
  pageTitle: string
  mentions: number
  rank: number
  type: SourceType
}

export interface CitationReference {
  domain: string
  pageUrl: string
  pageTitle: string
  icon: string
}

export interface ChatHistoryItem {
  id: string
  model: Model
  modelIcon: string
  response: string
  brandMentions: BrandMention[]
  timestamp: string
  createdAt: string
  citations: CitationReference[]
  fullConversation?: {
    query: string
    response: string
  }
}

export interface PromptDetail {
  id: string
  prompt: string
  stage: Stage
  type: PromptType
  sentiment: Sentiment
  lastUpdated: string
  visibilityTrend: VisibilityTrendPoint[]
  competitorMentions: CompetitorMention[]
  topSources: TopSource[]
  chatHistory: ChatHistoryItem[]
}

// Dashboard types
export interface DashboardVisibilityTrend {
  date: string
  yourBrand: number
  competitorA: number
  competitorB: number
}

export interface DashboardCompetitiveRanking {
  brand: string
  rank: number
  rankChange: number
  visibilityScore: number
}

export type OpportunityStatus = "Pending" | "In Progress" | "Evaluated"
export type ActionType = "Creation" | "Refresh" | "Optimization"
export type AttributionStrength = "Strong" | "Medium" | "Weak"

export interface DashboardOpportunity {
  id: string
  name: string
  actionType: ActionType
  status: OpportunityStatus
  baselineScore: number
  baselineRank: number
  currentScore: number
  currentRank: number
  change: number
  attributionStrength: AttributionStrength
}

// Competitor types
export interface SuggestedCompetitor {
  id: string
  name: string
  url: string
  shareOfVoice: number
  sentiment: Sentiment
  description: string
  reason: string
}

// Tag types
export interface Tag {
  id: string
  name: string
  color: string
}
