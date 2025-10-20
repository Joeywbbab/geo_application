"use client"
import { RefreshCw, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TopBar() {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-[120px] bg-background">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] bg-background">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="gpt">GPT</SelectItem>
              <SelectItem value="perplexity">Perplexity</SelectItem>
              <SelectItem value="ai-overview">AI Overview</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="bg-background">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
