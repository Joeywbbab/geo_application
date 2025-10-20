"use client"

import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { mockPromptDetails } from "@/lib/mock-data"
import { notFound, useParams } from "next/navigation"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

export default function PromptDetailPage() {
  const params = useParams()
  const id = params.id as string
  const prompt = mockPromptDetails[id]
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null)

  if (!prompt) {
    notFound()
  }

  const toggleChat = (chatId: string) => {
    setExpandedChatId(expandedChatId === chatId ? null : chatId)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with Breadcrumb */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4 mb-3">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href="/analytics/prompts">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <BreadcrumbNav
            items={[
              { label: "Analytics", href: "/analytics/prompts" },
              { label: "Prompts", href: "/analytics/prompts" },
              { label: "Detail" },
            ]}
          />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{prompt.prompt}</h1>
        <div className="flex items-center gap-3 mt-3">
          <Badge
            variant={
              prompt.sentiment === "Positive" ? "default" : prompt.sentiment === "Neutral" ? "secondary" : "destructive"
            }
          >
            {prompt.sentiment}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h2 className="text-base font-semibold text-foreground mb-4">Visibility Score Trend</h2>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={prompt.visibilityTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      stroke="#e0e0e0"
                      fontSize={11}
                      tick={{ fill: "#999" }}
                      tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      }
                    />
                    <YAxis stroke="#e0e0e0" fontSize={11} tick={{ fill: "#999" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        fontSize: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h2 className="text-base font-semibold text-foreground mb-4">Competitor Mentions & Rankings</h2>
              <div className="rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">Competitor</TableHead>
                      <TableHead className="text-muted-foreground text-right">Mentions</TableHead>
                      <TableHead className="text-muted-foreground text-right">Avg. Rank</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompt.competitorMentions.map((comp) => (
                      <TableRow key={comp.competitor} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {comp.competitor.includes("Me") ? (
                            <span className="text-primary">{comp.competitor}</span>
                          ) : (
                            comp.competitor
                          )}
                        </TableCell>
                        <TableCell className="text-right text-foreground">{comp.mentions}</TableCell>
                        <TableCell className="text-right text-foreground">{comp.avgRank.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h2 className="text-base font-semibold text-foreground mb-4">Top Sources</h2>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Domain</TableHead>
                  <TableHead className="text-muted-foreground">Page Title</TableHead>
                  <TableHead className="text-muted-foreground text-center">Mentions</TableHead>
                  <TableHead className="text-muted-foreground text-center">Rank</TableHead>
                  <TableHead className="text-muted-foreground text-center">Type</TableHead>
                  <TableHead className="text-muted-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompt.topSources.map((source, idx) => (
                  <TableRow key={idx} className="border-border">
                    <TableCell className="font-medium text-foreground">{source.domain}</TableCell>
                    <TableCell className="text-foreground max-w-md truncate">{source.pageTitle}</TableCell>
                    <TableCell className="text-center text-foreground">{source.mentions}</TableCell>
                    <TableCell className="text-center text-foreground">#{source.rank}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          source.type === "Earned" ? "default" : source.type === "Social" ? "secondary" : "outline"
                        }
                        className="text-xs"
                      >
                        {source.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                        <a href={source.pageUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="bg-card border-border">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Chat History</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground w-12"></TableHead>
                  <TableHead className="text-muted-foreground">Chat</TableHead>
                  <TableHead className="text-muted-foreground text-right">Mentions</TableHead>
                  <TableHead className="text-muted-foreground text-right w-32">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompt.chatHistory.map((chat) => (
                  <>
                    <TableRow
                      key={chat.id}
                      className="border-border cursor-pointer hover:bg-muted/30"
                      onClick={() => toggleChat(chat.id)}
                    >
                      <TableCell className="text-center">
                        <span className="text-xl">{chat.modelIcon}</span>
                      </TableCell>
                      <TableCell className="text-foreground max-w-2xl">
                        <div className="truncate">{chat.response}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {chat.brandMentions.map((mention, idx) => (
                            <div
                              key={idx}
                              className="inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium text-white"
                              style={{ backgroundColor: mention.color }}
                            >
                              {mention.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">{chat.createdAt}</TableCell>
                    </TableRow>
                    {expandedChatId === chat.id && (
                      <TableRow className="border-border bg-muted/10">
                        <TableCell colSpan={4} className="p-6">
                          <div className="space-y-4">
                            {/* Full Conversation */}
                            {chat.fullConversation && (
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm font-semibold text-foreground mb-2">Query:</div>
                                  <div className="text-sm text-muted-foreground">{chat.fullConversation.query}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-foreground mb-2">Response:</div>
                                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                    {chat.fullConversation.response}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Citations */}
                            {chat.citations && chat.citations.length > 0 && (
                              <div className="pt-4 border-t border-border">
                                <div className="text-sm font-semibold text-foreground mb-3">Citations:</div>
                                <div className="space-y-2">
                                  {chat.citations.map((citation, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm">
                                      <div className="inline-flex items-center justify-center w-6 h-6 rounded bg-muted text-xs font-medium">
                                        {citation.icon}
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-foreground">{citation.domain}</div>
                                        <div className="text-xs text-muted-foreground truncate">
                                          {citation.pageTitle}
                                        </div>
                                      </div>
                                      <Button variant="ghost" size="sm" asChild className="h-7 w-7 p-0">
                                        <a href={citation.pageUrl} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-3.5 w-3.5" />
                                        </a>
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  )
}
