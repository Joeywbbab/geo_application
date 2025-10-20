"use client"

import * as React from "react"
import { Plus, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockSuggestedCompetitors, type SuggestedCompetitor } from "@/lib/mock-data"

type Competitor = {
  id: string
  name: string
  url: string
  status: "Recommended" | "User-added"
  shareOfVoice: number
  sentiment: "Positive" | "Neutral" | "Negative"
  notes: string
}

const mockCompetitors: Competitor[] = [
  {
    id: "1",
    name: "Monday.com",
    url: "https://monday.com",
    status: "Recommended",
    shareOfVoice: 32,
    sentiment: "Positive",
    notes: "Strong in visual project management",
  },
  {
    id: "2",
    name: "Trello",
    url: "https://trello.com",
    status: "Recommended",
    shareOfVoice: 28,
    sentiment: "Neutral",
    notes: "Popular for simple kanban workflows",
  },
  {
    id: "3",
    name: "ClickUp",
    url: "https://clickup.com",
    status: "User-added",
    shareOfVoice: 18,
    sentiment: "Positive",
    notes: "All-in-one workspace competitor",
  },
]

export default function CompetitorManagementPage() {
  const [competitors, setCompetitors] = React.useState<Competitor[]>(mockCompetitors)
  const [suggestedCompetitors, setSuggestedCompetitors] =
    React.useState<SuggestedCompetitor[]>(mockSuggestedCompetitors)
  const [showSuggestions, setShowSuggestions] = React.useState(false)
  const [showAddDialog, setShowAddDialog] = React.useState(false)
  const [newCompetitorName, setNewCompetitorName] = React.useState("")
  const [newCompetitorUrl, setNewCompetitorUrl] = React.useState("")

  const handleAddCompetitor = (suggested: SuggestedCompetitor) => {
    const newCompetitor: Competitor = {
      id: suggested.id,
      name: suggested.name,
      url: suggested.url,
      status: "User-added",
      shareOfVoice: suggested.shareOfVoice,
      sentiment: suggested.sentiment,
      notes: suggested.description,
    }
    setCompetitors([...competitors, newCompetitor])
    setSuggestedCompetitors(suggestedCompetitors.filter((c) => c.id !== suggested.id))
  }

  const handleManualAddCompetitor = () => {
    if (!newCompetitorName.trim() || !newCompetitorUrl.trim()) return

    const newCompetitor: Competitor = {
      id: `manual-${Date.now()}`,
      name: newCompetitorName.trim(),
      url: newCompetitorUrl.trim(),
      status: "User-added",
      shareOfVoice: 0,
      sentiment: "Neutral",
      notes: "Manually added competitor",
    }
    setCompetitors([...competitors, newCompetitor])
    setNewCompetitorName("")
    setNewCompetitorUrl("")
    setShowAddDialog(false)
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">Competitors</h1>
            <p className="text-sm text-muted-foreground">Track and analyze competitor performance</p>
          </div>
          <Sheet open={showSuggestions} onOpenChange={setShowSuggestions}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                Suggested ({suggestedCompetitors.length})
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Suggested Competitors</SheetTitle>
                <SheetDescription>
                  AI-recommended competitors based on your product and market analysis
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {suggestedCompetitors.map((suggested) => (
                  <Card key={suggested.id} className="bg-card">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-foreground mb-1">{suggested.name}</h4>
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-xs text-muted-foreground truncate">{suggested.url}</span>
                              <Button variant="ghost" size="sm" className="h-4 w-4 p-0 flex-shrink-0" asChild>
                                <a href={suggested.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">{suggested.description}</p>

                        <div className="flex items-center gap-3 pt-2 border-t border-border">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground">Share:</span>
                            <span className="text-xs font-medium text-foreground">{suggested.shareOfVoice}%</span>
                          </div>
                          <Badge
                            variant={
                              suggested.sentiment === "Positive"
                                ? "default"
                                : suggested.sentiment === "Neutral"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {suggested.sentiment}
                          </Badge>
                        </div>

                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">
                            <span className="font-medium">Why:</span> {suggested.reason}
                          </p>
                          <Button
                            size="sm"
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => handleAddCompetitor(suggested)}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add to Tracked
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content - Competitors Table */}
      <div className="flex-1 overflow-auto p-6">
        <Card className="bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-foreground">Tracked Competitors</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Monitor competitor visibility and sentiment
                </CardDescription>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Competitor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Competitor</DialogTitle>
                    <DialogDescription>
                      Enter the competitor's brand name and website URL to start tracking them.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="brand-name">Brand Name</Label>
                      <Input
                        id="brand-name"
                        placeholder="e.g., Asana"
                        value={newCompetitorName}
                        onChange={(e) => setNewCompetitorName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="e.g., https://asana.com"
                        value={newCompetitorUrl}
                        onChange={(e) => setNewCompetitorUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleManualAddCompetitor}
                      disabled={!newCompetitorName.trim() || !newCompetitorUrl.trim()}
                    >
                      Add Competitor
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-muted-foreground font-medium">Name</TableHead>
                  <TableHead className="text-muted-foreground font-medium">URL</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Status</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Share of Voice</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Sentiment</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Notes</TableHead>
                  <TableHead className="text-muted-foreground font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitors.map((competitor) => (
                  <TableRow key={competitor.id} className="hover:bg-secondary/50">
                    <TableCell>
                      <span className="text-sm font-medium text-foreground">{competitor.name}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{competitor.url}</span>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0" asChild>
                          <a href={competitor.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={competitor.status === "Recommended" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {competitor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${competitor.shareOfVoice}%` }} />
                        </div>
                        <span className="text-sm font-medium text-foreground">{competitor.shareOfVoice}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          competitor.sentiment === "Positive"
                            ? "default"
                            : competitor.sentiment === "Neutral"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {competitor.sentiment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground max-w-xs line-clamp-1">{competitor.notes}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
