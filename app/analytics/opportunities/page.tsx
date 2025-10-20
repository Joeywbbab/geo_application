"use client"

import * as React from "react"
import { Lightbulb, TrendingUp, RefreshCw, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockOpportunities } from "@/lib/mock-data"

const opportunityIcons = {
  Creation: Lightbulb,
  Optimization: TrendingUp,
  Refresh: RefreshCw,
  Suggestion: Sparkles,
}

const opportunityColors = {
  Creation: "text-chart-3",
  Optimization: "text-chart-2",
  Refresh: "text-chart-4",
  Suggestion: "text-chart-5",
}

export default function OpportunitiesPage() {
  const router = useRouter()
  const [statusTab, setStatusTab] = React.useState<"pending" | "in-progress" | "evaluated">("pending")
  const [impactFilter, setImpactFilter] = React.useState("all")

  const filteredOpportunities = mockOpportunities.filter((opp) => {
    // For demo purposes, we'll distribute opportunities across statuses
    const oppStatus = opp.id % 3 === 0 ? "pending" : opp.id % 3 === 1 ? "in-progress" : "evaluated"
    if (oppStatus !== statusTab) return false
    if (impactFilter !== "all" && opp.estimatedImpact !== impactFilter) return false
    return true
  })

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Opportunity Radar</h1>
        <p className="text-sm text-muted-foreground">
          Turn prompt and citation gaps into actionable content opportunities
        </p>
      </div>

      <div className="border-b border-border bg-card px-8 py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStatusTab("pending")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                statusTab === "pending"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusTab("in-progress")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                statusTab === "in-progress"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setStatusTab("evaluated")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                statusTab === "evaluated"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              Evaluated
            </button>
          </div>

          {/* Impact Filter */}
          <Select value={impactFilter} onValueChange={setImpactFilter}>
            <SelectTrigger className="w-[160px] bg-background">
              <SelectValue placeholder="Impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impact</SelectItem>
              <SelectItem value="High">High Impact</SelectItem>
              <SelectItem value="Medium">Medium Impact</SelectItem>
              <SelectItem value="Low">Low Impact</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div className="flex-1 overflow-auto p-6">
        {filteredOpportunities.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">No opportunities found.</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOpportunities.map((opportunity) => {
              const Icon = opportunityIcons[opportunity.type]
              const iconColor = opportunityColors[opportunity.type]

              return (
                <Card key={opportunity.id} className="bg-card hover:bg-secondary/30 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`mt-1 ${iconColor}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base text-foreground leading-snug mb-2">
                            {opportunity.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant={
                                opportunity.estimatedImpact === "High"
                                  ? "default"
                                  : opportunity.estimatedImpact === "Medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {opportunity.estimatedImpact} Impact
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Source Prompts */}
                    <div>
                      <CardDescription className="text-xs text-muted-foreground mb-2 font-medium">
                        Source Prompts
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.sourcePrompts.map((prompt, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs font-normal">
                            {prompt}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Evidence */}
                    <div>
                      <CardDescription className="text-xs text-muted-foreground mb-2 font-medium">
                        Key Evidence
                      </CardDescription>
                      <ul className="space-y-1">
                        {opportunity.evidence.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Why It Matters */}
                    <div>
                      <CardDescription className="text-xs text-muted-foreground mb-2 font-medium">
                        Why It Matters
                      </CardDescription>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {opportunity.type === "Creation" &&
                          "Competitors are capturing traffic in this space while your brand has no presence."}
                        {opportunity.type === "Optimization" &&
                          "Your content exists but competitors are outranking you with better optimization."}
                        {opportunity.type === "Refresh" &&
                          "Your content is performing well but risks decay without updates."}
                        {opportunity.type === "Suggestion" &&
                          "Untapped opportunity where neither you nor competitors have strong presence."}
                      </p>
                    </div>

                    {/* Suggested Content Type */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div>
                        <CardDescription className="text-xs text-muted-foreground mb-1">Suggested Type</CardDescription>
                        <span className="text-sm font-medium text-foreground">{opportunity.suggestedContentType}</span>
                      </div>
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => router.push("/action/content-workshop")}
                      >
                        {opportunity.type === "Creation" && "Generate Brief"}
                        {opportunity.type === "Optimization" && "Optimize Page"}
                        {opportunity.type === "Refresh" && "Refresh Plan"}
                        {opportunity.type === "Suggestion" && "Draft Outline"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
