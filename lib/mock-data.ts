// Centralized types are available in @/types
// This file contains mock data for development and testing

export type Prompt = {
  id: string
  prompt: string
  stage: "Awareness" | "Consideration" | "Decision"
  type: "Informational" | "Comparative" | "Transactional"
  mentionsMe: number
  mentionsCompetitors: number
  brandMentions: { brand: string; icon: string; color: string }[]
  visibilityScore: number
  sentiment: "Positive" | "Neutral" | "Negative"
  sentimentScore: number
  position: string
  positionRank: number
  modelsCovered: string[]
  lastUpdated: string
  status: "Active" | "Suggested" | "Inactive"
  volume: number[]
  tags: string[]
}

export type ContentBrief = {
  id: string
  title: string
  contentType: "Blog Post" | "Comparison Post" | "Listicle" | "Product Listing" | "Social Post"
  stage: "Awareness" | "Consideration" | "Decision"
  targetKeyword: string
  priority: "High" | "Medium" | "Low"
  status: "Draft" | "In Progress" | "Review" | "Published"
  dueDate: string
  opportunitySource?: string // Added opportunity source field
}

export type PromptDetail = {
  id: string
  prompt: string
  stage: "Awareness" | "Consideration" | "Decision"
  type: "Informational" | "Comparative" | "Transactional"
  sentiment: "Positive" | "Neutral" | "Negative"
  lastUpdated: string
  visibilityTrend: { date: string; score: number }[]
  competitorMentions: { competitor: string; mentions: number; avgRank: number }[]
  topSources: {
    domain: string
    pageUrl: string
    pageTitle: string
    mentions: number
    rank: number
    type: "Earned" | "Social" | "Own"
  }[]
  chatHistory: {
    id: string
    model: "GPT" | "Perplexity" | "AI Overview"
    modelIcon: string
    response: string
    brandMentions: { brand: string; icon: string; color: string }[]
    timestamp: string
    createdAt: string
    citations: {
      domain: string
      pageUrl: string
      pageTitle: string
      icon: string
    }[]
    fullConversation?: {
      query: string
      response: string
    }
  }[]
}

export type DashboardVisibilityTrend = {
  date: string
  yourBrand: number
  competitorA: number
  competitorB: number
}

export type DashboardCompetitiveRanking = {
  brand: string
  rank: number
  rankChange: number // Added rank change field
  visibilityScore: number
}

export type DashboardOpportunity = {
  id: string
  name: string
  actionType: "Creation" | "Refresh" | "Optimization"
  status: "Pending" | "In Progress" | "Evaluated"
  baselineScore: number
  baselineRank: number
  currentScore: number
  currentRank: number
  change: number
  attributionStrength: "Strong" | "Medium" | "Weak"
}

export type SuggestedCompetitor = {
  id: string
  name: string
  url: string
  shareOfVoice: number
  sentiment: "Positive" | "Neutral" | "Negative"
  description: string
  reason: string
}

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    prompt: "What are the best project management tools for remote teams?",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 3,
    mentionsCompetitors: 8,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
    ],
    visibilityScore: 72,
    sentiment: "Positive",
    sentimentScore: 68,
    position: "Listed in top 5 alternatives",
    positionRank: 3.2,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-10",
    status: "Active",
    volume: [3, 5, 2, 4, 6, 3, 5],
    tags: ["remote", "collaboration"],
  },
  {
    id: "2",
    prompt: "Asana vs Monday.com: which is better for agile teams?",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 5,
    mentionsCompetitors: 5,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
    ],
    visibilityScore: 85,
    sentiment: "Positive",
    sentimentScore: 75,
    position: "Featured in direct comparison",
    positionRank: 1.8,
    modelsCovered: ["GPT", "Perplexity", "AI Overview"],
    lastUpdated: "2024-01-12",
    status: "Active",
    volume: [4, 6, 5, 7, 8, 6, 7],
    tags: ["comparison", "agile"],
  },
  {
    id: "3",
    prompt: "How to set up automated workflows in project management software?",
    stage: "Decision",
    type: "Transactional",
    mentionsMe: 7,
    mentionsCompetitors: 2,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Zapier", icon: "Z", color: "#FF4A00" },
    ],
    visibilityScore: 92,
    sentiment: "Positive",
    sentimentScore: 82,
    position: "Primary recommendation",
    positionRank: 1.2,
    modelsCovered: ["GPT", "AI Overview"],
    lastUpdated: "2024-01-11",
    status: "Active",
    volume: [5, 7, 6, 8, 9, 7, 8],
    tags: ["automation", "workflows"],
  },
  {
    id: "4",
    prompt: "What features should I look for in task management software?",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 2,
    mentionsCompetitors: 6,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Notion", icon: "N", color: "#000000" },
      { brand: "Todoist", icon: "T", color: "#E44332" },
    ],
    visibilityScore: 58,
    sentiment: "Neutral",
    sentimentScore: 55,
    position: "Mentioned as example",
    positionRank: 5.1,
    modelsCovered: ["Perplexity"],
    lastUpdated: "2024-01-09",
    status: "Suggested",
    volume: [2, 3, 2, 3, 4, 2, 3],
    tags: ["features"],
  },
  {
    id: "5",
    prompt: "Best free project management tools for startups",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 4,
    mentionsCompetitors: 9,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
      { brand: "Notion", icon: "N", color: "#000000" },
    ],
    visibilityScore: 68,
    sentiment: "Positive",
    sentimentScore: 70,
    position: "Listed in free tier comparison",
    positionRank: 2.5,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-13",
    status: "Active",
    volume: [3, 5, 4, 5, 6, 4, 5],
    tags: ["pricing", "startups"],
  },
  {
    id: "6",
    prompt: "Tools for building AI companions that remember past interactions",
    stage: "Awareness",
    type: "Informational",
    mentionsMe: 4,
    mentionsCompetitors: 7,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "Upstash", icon: "U", color: "#00E9A3" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
    ],
    visibilityScore: 83,
    sentiment: "Positive",
    sentimentScore: 72,
    position: "Listed in recommendations",
    positionRank: 2.3,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-14",
    status: "Active",
    volume: [4, 6, 5, 7, 8, 6, 7],
    tags: ["AI", "memory"],
  },
  {
    id: "7",
    prompt: "What architecture should I use for persistent memory in conversational AI?",
    stage: "Consideration",
    type: "Comparative",
    mentionsMe: 3,
    mentionsCompetitors: 5,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
    ],
    visibilityScore: 67,
    sentiment: "Neutral",
    sentimentScore: 69,
    position: "Technical comparison",
    positionRank: 3.6,
    modelsCovered: ["GPT", "Perplexity"],
    lastUpdated: "2024-01-13",
    status: "Suggested",
    volume: [3, 4, 3, 5, 6, 4, 5],
    tags: ["architecture", "AI"],
  },
  {
    id: "8",
    prompt: "Best solutions for adding long-term memory to AI applications 2025",
    stage: "Decision",
    type: "Transactional",
    mentionsMe: 5,
    mentionsCompetitors: 6,
    brandMentions: [
      { brand: "GitHub", icon: "G", color: "#181717" },
      { brand: "Replit", icon: "R", color: "#F26207" },
      { brand: "Pinecone", icon: "P", color: "#000000" },
      { brand: "LangChain", icon: "L", color: "#1C3C3C" },
    ],
    visibilityScore: 58,
    sentiment: "Positive",
    sentimentScore: 70,
    position: "Solution provider",
    positionRank: 4.1,
    modelsCovered: ["GPT"],
    lastUpdated: "2024-01-12",
    status: "Inactive",
    volume: [2, 3, 2, 4, 5, 3, 4],
    tags: ["solutions", "2025"],
  },
]

export const mockCitations: Citation[] = [
  {
    id: "1",
    domain: "techcrunch.com",
    pageTitle: "The Best Project Management Software for 2024",
    url: "https://techcrunch.com/best-pm-software",
    prompt: "What are the best project management tools for remote teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
      { brand: "Trello", icon: "T", color: "#0079BF" },
    ],
    visibilityRank: 3,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-10",
    snippet: "Among the top contenders, Asana stands out for its intuitive interface and robust automation features...",
    type: "blog post",
    mentioned: true,
    usedTotal: 29,
    avgCitations: 1.7,
    updated: "3 days ago",
  },
  {
    id: "2",
    domain: "forbes.com",
    pageTitle: "Asana vs Monday: A Comprehensive Comparison",
    url: "https://forbes.com/asana-vs-monday",
    prompt: "Asana vs Monday.com: which is better for agile teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "Monday", icon: "M", color: "#FF3D57" },
    ],
    visibilityRank: 1,
    sentiment: "Positive",
    model: "Perplexity",
    capturedAt: "2024-01-12",
    snippet: "For agile teams, Asana offers superior sprint planning and backlog management capabilities...",
    type: "comparison post",
    mentioned: false,
    usedTotal: 45,
    avgCitations: 2.3,
    updated: "1 day ago",
  },
  {
    id: "3",
    domain: "pcmag.com",
    pageTitle: "Best Project Management Tools 2024",
    url: "https://pcmag.com/best-pm-tools",
    prompt: "What are the best project management tools for remote teams?",
    mentionsMe: true,
    mentionsCompetitor: true,
    brandMentions: [
      { brand: "Asana", icon: "A", color: "#F06A6A" },
      { brand: "ClickUp", icon: "C", color: "#7B68EE" },
      { brand: "Notion", icon: "N", color: "#000000" },
    ],
    visibilityRank: 2,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-11",
    snippet: "PCMag's top picks include Asana for its comprehensive feature set...",
    type: "listicle",
    mentioned: true,
    usedTotal: 38,
    avgCitations: 1.9,
    updated: "2 days ago",
  },
  {
    id: "4",
    domain: "python.langchain.com",
    pageTitle: "How to add memory to chatbots | 🦜🔗 LangChain",
    url: "https://python.langchain.com/docs/how_to/chatbots_memory/",
    prompt: "Tools for building AI companions with memory",
    mentionsMe: false,
    mentionsCompetitor: true,
    brandMentions: [{ brand: "LangChain", icon: "L", color: "#1C3C3C" }],
    visibilityRank: 1,
    sentiment: "Positive",
    model: "GPT",
    capturedAt: "2024-01-13",
    snippet: "LangChain provides comprehensive memory management for chatbots...",
    type: "how-to guide",
    mentioned: false,
    usedTotal: 29,
    avgCitations: 1.7,
    updated: "3 days ago",
  },
]

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Create guide on project management for healthcare teams",
    type: "Creation",
    sourcePrompts: ["Best PM tools for healthcare", "HIPAA-compliant task management"],
    evidence: ["Competitors mentioned 12 times", "Zero brand presence"],
    suggestedContentType: "Ultimate Guide",
    estimatedImpact: "High",
    stage: "Awareness",
  },
  {
    id: "2",
    title: "Optimize existing automation features page",
    type: "Optimization",
    sourcePrompts: ["How to automate workflows", "Best automation features"],
    evidence: ["Competitor ranks higher", "Missing key entities"],
    suggestedContentType: "Feature Page",
    estimatedImpact: "Medium",
    stage: "Decision",
  },
  {
    id: "3",
    title: "Refresh pricing comparison content",
    type: "Refresh",
    sourcePrompts: ["Project management software pricing", "Best value PM tools"],
    evidence: ["Content is 6 months old", "Competitor updated recently"],
    suggestedContentType: "Comparison Post",
    estimatedImpact: "High",
    stage: "Consideration",
  },
  {
    id: "4",
    title: "Create content for nonprofit organizations",
    type: "Suggestion",
    sourcePrompts: ["PM tools for nonprofits", "Volunteer management software"],
    evidence: ["Neither brand nor competitor mentioned", "High search volume"],
    suggestedContentType: "Blog Post",
    estimatedImpact: "Medium",
    stage: "Awareness",
  },
  {
    id: "5",
    title: "Optimize integration marketplace page",
    type: "Optimization",
    sourcePrompts: ["Best integrations for project management", "Connect PM tools with Slack"],
    evidence: ["Competitor has better structured data", "Missing integration examples"],
    suggestedContentType: "Feature Page",
    estimatedImpact: "High",
    stage: "Decision",
  },
  {
    id: "6",
    title: "Create mobile app comparison guide",
    type: "Creation",
    sourcePrompts: ["Best mobile PM apps", "Project management on the go"],
    evidence: ["Competitors dominate mobile queries", "No mobile-specific content"],
    suggestedContentType: "Comparison Post",
    estimatedImpact: "Medium",
    stage: "Consideration",
  },
]

export const mockContentBriefs: ContentBrief[] = [
  {
    id: "1",
    title: "Ultimate Guide to Project Management for Remote Teams",
    contentType: "Blog Post",
    stage: "Awareness",
    targetKeyword: "project management remote teams",
    priority: "High",
    status: "In Progress",
    dueDate: "2024-01-20",
    opportunitySource: "Create guide on project management for healthcare teams", // Added opportunity source
  },
  {
    id: "2",
    title: "Asana vs Competitors: Feature Comparison 2024",
    contentType: "Comparison Post",
    stage: "Consideration",
    targetKeyword: "asana vs competitors",
    priority: "Medium",
    status: "Draft",
    dueDate: "2024-01-25",
    opportunitySource: "Refresh pricing comparison content", // Added opportunity source
  },
]

export const mockPromptDetails: Record<string, PromptDetail> = {
  "1": {
    id: "1",
    prompt: "What are the best project management tools for remote teams?",
    stage: "Awareness",
    type: "Informational",
    sentiment: "Positive",
    lastUpdated: "2024-01-10",
    visibilityTrend: [
      { date: "2024-01-01", score: 65 },
      { date: "2024-01-02", score: 68 },
      { date: "2024-01-03", score: 67 },
      { date: "2024-01-04", score: 70 },
      { date: "2024-01-05", score: 72 },
      { date: "2024-01-06", score: 71 },
      { date: "2024-01-07", score: 74 },
      { date: "2024-01-08", score: 76 },
      { date: "2024-01-09", score: 75 },
      { date: "2024-01-10", score: 78 },
    ],
    competitorMentions: [
      { competitor: "Monday.com", mentions: 8, avgRank: 2.3 },
      { competitor: "Trello", mentions: 7, avgRank: 3.1 },
      { competitor: "Asana (Me)", mentions: 3, avgRank: 4.5 },
      { competitor: "ClickUp", mentions: 6, avgRank: 3.8 },
      { competitor: "Notion", mentions: 5, avgRank: 5.2 },
    ],
    topSources: [
      {
        domain: "techcrunch.com",
        pageUrl: "https://techcrunch.com/2024/best-pm-tools-remote",
        pageTitle: "The Best Project Management Tools for Remote Teams in 2024",
        mentions: 5,
        rank: 1,
        type: "Earned",
      },
      {
        domain: "forbes.com",
        pageUrl: "https://forbes.com/advisor/business/software/best-project-management-software",
        pageTitle: "Best Project Management Software For 2024",
        mentions: 4,
        rank: 2,
        type: "Earned",
      },
      {
        domain: "pcmag.com",
        pageUrl: "https://pcmag.com/picks/best-project-management-software",
        pageTitle: "The Best Project Management Software for 2024",
        mentions: 3,
        rank: 3,
        type: "Earned",
      },
      {
        domain: "capterra.com",
        pageUrl: "https://capterra.com/project-management-software",
        pageTitle: "Best Project Management Software 2024 Reviews",
        mentions: 4,
        rank: 4,
        type: "Social",
      },
      {
        domain: "g2.com",
        pageUrl: "https://g2.com/categories/project-management",
        pageTitle: "Best Project Management Software 2024",
        mentions: 3,
        rank: 5,
        type: "Own",
      },
    ],
    chatHistory: [
      {
        id: "1",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language mod...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-15T10:30:00Z",
        createdAt: "9 hr. ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/langchain-ai/langchain",
            pageTitle: "LangChain - Building applications with LLMs",
            icon: "G",
          },
          {
            domain: "upstash.com",
            pageUrl: "https://upstash.com/docs/redis/features/vector",
            pageTitle: "Vector Database for AI Memory",
            icon: "U",
          },
        ],
        fullConversation: {
          query: "What are the best tools for building AI companions with memory?",
          response:
            "The best tools for building AI companions with memory combine long-term conversation storage, semantic recall, and seamless integration with large language models. Key solutions include:\n\n1. **LangChain** - Provides memory management abstractions and conversation chains\n2. **Upstash Vector** - Redis-based vector database for semantic memory\n3. **Pinecone** - Managed vector database for storing embeddings\n4. **Mem0** - Purpose-built memory layer for AI applications\n\nThese tools enable persistent context across conversations, allowing AI companions to remember user preferences, past interactions, and build more personalized experiences.",
        },
      },
      {
        id: "2",
        model: "AI Overview",
        modelIcon: "🤖",
        response:
          "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider for this are a combination o...",
        brandMentions: [
          { brand: "Replit", icon: "R", color: "#F26207" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-15T10:15:00Z",
        createdAt: "9 hr. ago",
        citations: [
          {
            domain: "replit.com",
            pageUrl: "https://replit.com/ai",
            pageTitle: "Build AI Apps with Replit",
            icon: "R",
          },
        ],
        fullConversation: {
          query: "How do I build AI companions that remember conversations?",
          response:
            "Building AI companions that remember past interactions involves utilizing both technical and design strategies. The key tools to consider for this are a combination of vector databases, conversation management frameworks, and LLM integration platforms. Replit provides an excellent development environment for prototyping these applications quickly.",
        },
      },
      {
        id: "3",
        model: "GPT",
        modelIcon: "G",
        response:
          "Tools for building AI companions with memory include semantic memory management systems like Mem0 and Zep, which store and retrieve conversational context ...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "LangChain", icon: "L", color: "#1C3C3C" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T16:20:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/mem0ai/mem0",
            pageTitle: "Mem0 - Memory Layer for AI",
            icon: "G",
          },
          {
            domain: "langchain.com",
            pageUrl: "https://langchain.com/memory",
            pageTitle: "Memory in LangChain",
            icon: "L",
          },
        ],
        fullConversation: {
          query: "What tools help AI companions remember past interactions?",
          response:
            "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which en...",
        },
      },
      {
        id: "4",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "Here are a bunch of tools, research, and design-patterns for building AI companions that *remember* — including ways to structure memory, open source framewor...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T09:45:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/patterns/ai-memory",
            pageTitle: "AI Memory Design Patterns",
            icon: "G",
          },
        ],
        fullConversation: {
          query: "Show me tools and patterns for AI memory",
          response:
            "Here are a bunch of tools, research, and design-patterns for building AI companions that *remember* — including ways to structure memory, open source frameworks, and best practices for maintaining conversation context across sessions.",
        },
      },
      {
        id: "5",
        model: "GPT",
        modelIcon: "G",
        response:
          "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which en...",
        brandMentions: [
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T08:30:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "upstash.com",
            pageUrl: "https://upstash.com/blog/ai-memory",
            pageTitle: "Building AI Memory with Upstash",
            icon: "U",
          },
        ],
        fullConversation: {
          query: "What are the best memory frameworks for AI?",
          response:
            "Tools for building AI companions with memory include memory frameworks like MemU and Agno, and semantic memory management systems like mem0, which enable persistent context. Upstash provides vector storage, GitHub hosts open-source implementations, and Replit offers a development environment for rapid prototyping.",
        },
      },
      {
        id: "6",
        model: "Perplexity",
        modelIcon: "🔮",
        response:
          "The best tools for building AI companions that remember past interactions use specialized memory architectures to maintain conversation history and context, allowi...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Upstash", icon: "U", color: "#00E9A3" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-14T07:15:00Z",
        createdAt: "1 day ago",
        citations: [
          {
            domain: "github.com",
            pageUrl: "https://github.com/ai-memory-systems",
            pageTitle: "AI Memory Systems Repository",
            icon: "G",
          },
        ],
        fullConversation: {
          query: "How do AI companions maintain memory?",
          response:
            "The best tools for building AI companions that remember past interactions use specialized memory architectures to maintain conversation history and context, allowing for more personalized and coherent interactions over time.",
        },
      },
      {
        id: "7",
        model: "AI Overview",
        modelIcon: "🤖",
        response:
          "If you're building an AI companion that *remembers* past interactions (and not just what was said a few minutes ago), there are a number of useful tools, framework...",
        brandMentions: [
          { brand: "GitHub", icon: "G", color: "#181717" },
          { brand: "Pinecone", icon: "P", color: "#000000" },
          { brand: "Replit", icon: "R", color: "#F26207" },
        ],
        timestamp: "2024-01-13T14:20:00Z",
        createdAt: "2 days ago",
        citations: [
          {
            domain: "pinecone.io",
            pageUrl: "https://pinecone.io/learn/ai-memory",
            pageTitle: "AI Memory with Vector Databases",
            icon: "P",
          },
        ],
        fullConversation: {
          query: "Tools for long-term AI memory?",
          response:
            "If you're building an AI companion that *remembers* past interactions (and not just what was said a few minutes ago), there are a number of useful tools, frameworks, and design patterns to consider. Vector databases like Pinecone enable semantic search, while GitHub provides open-source implementations.",
        },
      },
    ],
  },
}

export const mockDashboardVisibilityTrend: DashboardVisibilityTrend[] = [
  { date: "Jan 1", yourBrand: 65, competitorA: 72, competitorB: 68 },
  { date: "Jan 5", yourBrand: 68, competitorA: 74, competitorB: 70 },
  { date: "Jan 10", yourBrand: 72, competitorA: 76, competitorB: 71 },
  { date: "Jan 15", yourBrand: 75, competitorA: 78, competitorB: 73 },
  { date: "Jan 20", yourBrand: 78, competitorA: 80, competitorB: 75 },
  { date: "Jan 25", yourBrand: 82, competitorA: 81, competitorB: 76 },
  { date: "Jan 30", yourBrand: 85, competitorA: 82, competitorB: 78 },
]

export const mockDashboardCompetitiveRanking: DashboardCompetitiveRanking[] = [
  {
    brand: "Your Brand (Asana)",
    rank: 1,
    rankChange: 2, // Added rank change values
    visibilityScore: 85,
  },
  {
    brand: "Monday.com",
    rank: 2,
    rankChange: 0,
    visibilityScore: 82,
  },
  {
    brand: "Trello",
    rank: 3,
    rankChange: -1,
    visibilityScore: 78,
  },
  {
    brand: "ClickUp",
    rank: 4,
    rankChange: 1,
    visibilityScore: 76,
  },
  {
    brand: "Notion",
    rank: 5,
    rankChange: 0,
    visibilityScore: 72,
  },
]

export const mockDashboardOpportunities: DashboardOpportunity[] = [
  {
    id: "1",
    name: "Create a blog post due to low market awareness",
    actionType: "Creation",
    status: "In Progress",
    baselineScore: 62,
    baselineRank: 5,
    currentScore: 80,
    currentRank: 2,
    change: 18,
    attributionStrength: "Strong",
  },
  {
    id: "2",
    name: "Refresh pricing comparison content",
    actionType: "Refresh",
    status: "Evaluated",
    baselineScore: 68,
    baselineRank: 4,
    currentScore: 85,
    currentRank: 1,
    change: 17,
    attributionStrength: "Strong",
  },
  {
    id: "3",
    name: "Optimize automation features page",
    actionType: "Optimization",
    status: "In Progress",
    baselineScore: 72,
    baselineRank: 3,
    currentScore: 78,
    currentRank: 2,
    change: 6,
    attributionStrength: "Medium",
  },
  {
    id: "4",
    name: "Create guide on project management for healthcare teams",
    actionType: "Creation",
    status: "Pending",
    baselineScore: 45,
    baselineRank: 8,
    currentScore: 45,
    currentRank: 8,
    change: 0,
    attributionStrength: "Weak",
  },
  {
    id: "5",
    name: "Optimize integration marketplace page",
    actionType: "Optimization",
    status: "Evaluated",
    baselineScore: 70,
    baselineRank: 4,
    currentScore: 88,
    currentRank: 1,
    change: 18,
    attributionStrength: "Strong",
  },
  {
    id: "6",
    name: "Create mobile app comparison guide",
    actionType: "Creation",
    status: "Pending",
    baselineScore: 52,
    baselineRank: 6,
    currentScore: 52,
    currentRank: 6,
    change: 0,
    attributionStrength: "Weak",
  },
]

export const mockSuggestedCompetitors: SuggestedCompetitor[] = [
  {
    id: "s1",
    name: "Notion",
    url: "https://notion.so",
    shareOfVoice: 24,
    sentiment: "Positive",
    description: "All-in-one workspace for notes, docs, and project management",
    reason: "Frequently mentioned alongside your brand in awareness stage prompts",
  },
  {
    id: "s2",
    name: "Jira",
    url: "https://atlassian.com/jira",
    shareOfVoice: 26,
    sentiment: "Neutral",
    description: "Issue tracking and agile project management for software teams",
    reason: "Strong competitor in technical project management queries",
  },
  {
    id: "s3",
    name: "Basecamp",
    url: "https://basecamp.com",
    shareOfVoice: 15,
    sentiment: "Positive",
    description: "Simple project management and team communication tool",
    reason: "Emerging in small business and startup-focused prompts",
  },
  {
    id: "s4",
    name: "Wrike",
    url: "https://wrike.com",
    shareOfVoice: 12,
    sentiment: "Neutral",
    description: "Enterprise-grade work management platform",
    reason: "Competing in enterprise and large team segments",
  },
]
