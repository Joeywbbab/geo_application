"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, TrendingUp, Minus } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  mockDashboardVisibilityTrend,
  mockDashboardCompetitiveRanking,
  mockDashboardOpportunities,
} from "@/lib/mock-data"
import { useState } from "react"

export default function DashboardPage() {
  const [opportunityStatus, setOpportunityStatus] = useState<"In Progress" | "Evaluated">("In Progress")

  const filteredOpportunities = mockDashboardOpportunities.filter((opp) => opp.status === opportunityStatus)

  return (
    <div className="flex h-full flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of visibility trends, competitive rankings, and opportunity tracking
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-secondary/50 rounded-lg border border-border">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-muted-foreground">Visibility Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">78</span>
              <div className="flex items-center gap-1 text-chart-3">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 rounded-lg border border-border">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-muted-foreground">Sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">82%</span>
              <Badge variant="default" className="text-xs">
                Positive
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 rounded-lg border border-border">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs text-muted-foreground">Share of Voice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">22%</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Minus className="h-4 w-4" />
                <span className="text-sm font-medium">0%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Section: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Visibility Trend Chart */}
        <Card className="rounded-lg border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium">Visibility Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockDashboardVisibilityTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" style={{ fontSize: "12px" }} />
                <YAxis stroke="#999" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Line
                  type="monotone"
                  dataKey="yourBrand"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Your Brand"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="competitorA"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  name="Competitor A"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="competitorB"
                  stroke="#d1d5db"
                  strokeWidth={2}
                  name="Competitor B"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right: Competitive Ranking Table */}
        <Card className="rounded-lg border border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-medium">Competitive Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-medium text-xs">Brand / Product</TableHead>
                    <TableHead className="font-medium text-xs text-center">Rank</TableHead>
                    <TableHead className="font-medium text-xs text-center">Visibility Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDashboardCompetitiveRanking.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="text-sm py-4 font-medium">{row.brand}</TableCell>
                      <TableCell className="text-sm text-center font-semibold">#{row.rank}</TableCell>
                      <TableCell className="text-sm text-center">{row.visibilityScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Opportunity & Attribution Table */}
      <Card className="rounded-lg border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-medium">Opportunity Tracking & Attribution</CardTitle>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => setOpportunityStatus("In Progress")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                opportunityStatus === "In Progress"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setOpportunityStatus("Evaluated")}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                opportunityStatus === "Evaluated"
                  ? "bg-background text-foreground border-2 border-primary"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Evaluated
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-medium text-xs">Opportunity Name</TableHead>
                  <TableHead className="font-medium text-xs">Action</TableHead>
                  <TableHead className="font-medium text-xs text-center">Baseline</TableHead>
                  <TableHead className="font-medium text-xs text-center">Current</TableHead>
                  <TableHead className="font-medium text-xs text-center">Δ Change</TableHead>
                  <TableHead className="font-medium text-xs text-center">Attribution</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOpportunities.map((opp) => (
                  <TableRow key={opp.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="text-sm py-4 max-w-[300px]">{opp.name}</TableCell>
                    <TableCell className="text-sm py-4">
                      <span className="text-sm text-foreground">{opp.actionType}</span>
                    </TableCell>
                    <TableCell className="text-sm text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{opp.baselineScore}</span>
                        <span className="text-xs text-muted-foreground">#{opp.baselineRank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium">{opp.currentScore}</span>
                        <span className="text-xs text-muted-foreground">#{opp.currentRank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-center">
                      <span
                        className={`font-medium ${
                          opp.change > 0 ? "text-green-600" : opp.change < 0 ? "text-red-600" : "text-gray-500"
                        }`}
                      >
                        {opp.change > 0 ? "+" : ""}
                        {opp.change}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        {opp.attributionStrength === "Strong" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs text-muted-foreground">Strong</span>
                          </>
                        )}
                        {opp.attributionStrength === "Medium" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <span className="text-xs text-muted-foreground">Medium</span>
                          </>
                        )}
                        {opp.attributionStrength === "Weak" && (
                          <>
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-xs text-muted-foreground">Weak</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
