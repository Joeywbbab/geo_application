// Import types from centralized location
import type {
  Prompt,
  Citation,
  Opportunity,
  ContentBrief,
  PromptDetail,
  DashboardVisibilityTrend,
  DashboardCompetitiveRanking,
  DashboardOpportunity,
  SuggestedCompetitor,
} from "@/types"

// Re-export types for backward compatibility
export type {
  Prompt,
  Citation,
  Opportunity,
  ContentBrief,
  PromptDetail,
  DashboardVisibilityTrend,
  DashboardCompetitiveRanking,
  DashboardOpportunity,
  SuggestedCompetitor,
}

// Mock data exports
export { mockPrompts } from "./mock-data/prompts"
export { mockCitations } from "./mock-data/citations"
export { mockOpportunities } from "./mock-data/opportunities"
export { mockContentBriefs } from "./mock-data/content-briefs"
export { mockPromptDetails } from "./mock-data/prompt-details"
export {
  mockDashboardVisibilityTrend,
  mockDashboardCompetitiveRanking,
  mockDashboardOpportunities
} from "./mock-data/dashboard"
export { mockSuggestedCompetitors } from "./mock-data/competitors"
