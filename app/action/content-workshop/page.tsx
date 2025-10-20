"use client"

import * as React from "react"
import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockContentBriefs } from "@/lib/mock-data"

export default function ContentWorkshopPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isNewBriefOpen, setIsNewBriefOpen] = React.useState(false)
  const [newBrief, setNewBrief] = React.useState({
    contentType: "",
    status: "",
    name: "",
    why: "",
  })

  const filteredBriefs = mockContentBriefs.filter((brief) =>
    brief.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateBrief = () => {
    console.log("Creating new brief:", newBrief)
    // In a real app, this would save to the backend
    setIsNewBriefOpen(false)
    setNewBrief({ contentType: "", status: "", name: "", why: "" })
  }

  return (
    <div className="flex h-full">
      {/* Left: Strategy Queue */}
      <div className="flex-1 flex flex-col bg-card">
        {/* Header */}
        <div className="border-b border-border px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Strategy Queue</h2>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsNewBriefOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Brief
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search briefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-border px-4 py-3 space-y-2">
          <Select defaultValue="all-status">
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto">
          {filteredBriefs.map((brief) => (
            <div
              key={brief.id}
              className="border-b border-border p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
              onClick={() => router.push(`/action/content-workshop/${brief.id}`)}
            >
              <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{brief.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {brief.contentType}
                </Badge>
                <Badge
                  variant={
                    brief.status === "Published" ? "default" : brief.status === "In Progress" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {brief.status}
                </Badge>
              </div>
              {brief.opportunitySource && (
                <div className="text-xs text-muted-foreground mb-2">
                  <span className="font-medium">From opportunity:</span> {brief.opportunitySource}
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Priority: {brief.priority}</span>
                <span>Due: {new Date(brief.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isNewBriefOpen} onOpenChange={setIsNewBriefOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Brief</DialogTitle>
            <DialogDescription>Add a new content brief to your strategy queue.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content-type">Content Type</Label>
              <Select
                value={newBrief.contentType}
                onValueChange={(value) => setNewBrief({ ...newBrief, contentType: value })}
              >
                <SelectTrigger id="content-type">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Comparison Post">Comparison Post</SelectItem>
                  <SelectItem value="Listicle">Listicle</SelectItem>
                  <SelectItem value="Product Listing">Product Listing</SelectItem>
                  <SelectItem value="Social Post">Social Post</SelectItem>
                  <SelectItem value="Ultimate Guide">Ultimate Guide</SelectItem>
                  <SelectItem value="How-to Guide">How-to Guide</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newBrief.status} onValueChange={(value) => setNewBrief({ ...newBrief, status: value })}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Content Name</Label>
              <Input
                id="name"
                placeholder="Enter content name"
                value={newBrief.name}
                onChange={(e) => setNewBrief({ ...newBrief, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="why">Why (Problem Statement)</Label>
              <Textarea
                id="why"
                placeholder="What problem does this content aim to solve?"
                value={newBrief.why}
                onChange={(e) => setNewBrief({ ...newBrief, why: e.target.value })}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewBriefOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateBrief}
              disabled={!newBrief.contentType || !newBrief.status || !newBrief.name || !newBrief.why}
            >
              Create Brief
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
