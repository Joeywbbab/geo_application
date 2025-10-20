"use client"

import * as React from "react"
import { ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockCitations } from "@/lib/mock-data"

export default function CitationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState<"domain" | "url">("domain")

  // Group citations by domain for domain view
  const citationsByDomain = React.useMemo(() => {
    const grouped = new Map<string, typeof mockCitations>()
    mockCitations.forEach((citation) => {
      const existing = grouped.get(citation.domain) || []
      grouped.set(citation.domain, [...existing, citation])
    })
    return grouped
  }, [])

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card px-8 py-5">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Citations</h1>
        <p className="text-sm text-muted-foreground">{mockCitations.length} citations · Central index of sources</p>
      </div>

      <div className="border-b border-border bg-card px-8 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("domain")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "domain"
                ? "bg-background text-foreground border-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            Domain
          </button>
          <button
            onClick={() => setActiveTab("url")}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "url"
                ? "bg-background text-foreground border-2 border-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            URL
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {activeTab === "domain" ? (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Domain</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Citations</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentions</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Avg Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from(citationsByDomain.entries()).map(([domain, citations]) => {
                  const avgRank = (citations.reduce((sum, c) => sum + c.visibilityRank, 0) / citations.length).toFixed(
                    1,
                  )
                  const allBrandMentions = citations.flatMap((c) => c.brandMentions)
                  const uniqueBrands = Array.from(new Map(allBrandMentions.map((b) => [b.brand, b])).values())

                  return (
                    <TableRow
                      key={domain}
                      className="cursor-pointer hover:bg-muted/20 border-b border-border last:border-0"
                      onClick={() => router.push(`/analytics/citations/domain/${encodeURIComponent(domain)}`)}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground font-medium">{domain}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm text-foreground">{citations.length}</span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <div className="flex gap-1.5">
                          {uniqueBrands.map((brand) => (
                            <div
                              key={brand.brand}
                              className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                              style={{ backgroundColor: brand.color }}
                              title={brand.brand}
                            >
                              {brand.icon}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="text-sm font-semibold text-primary">#{avgRank}</span>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-b border-border">
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">URL</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Type</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentioned</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Mentions</TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Used total
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">
                    <div className="flex items-center gap-1">
                      Avg. Citations
                      <span className="text-xs">↕</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-muted-foreground font-medium py-4 px-6">Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCitations.map((citation) => (
                  <TableRow
                    key={citation.id}
                    className="cursor-pointer hover:bg-muted/20 border-b border-border last:border-0"
                    onClick={() => router.push(`/analytics/citations/${citation.id}`)}
                  >
                    <TableCell className="max-w-md py-4 px-6">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-muted flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold">{citation.domain.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground font-medium line-clamp-1 mb-0.5">
                            {citation.pageTitle}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{citation.url}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge
                        variant="secondary"
                        className="text-xs rounded-md bg-muted/50 text-muted-foreground border border-border"
                      >
                        {citation.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge
                        variant="secondary"
                        className={`text-xs rounded-md ${
                          citation.mentioned ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {citation.mentioned ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex gap-1.5">
                        {citation.brandMentions.map((brand) => (
                          <div
                            key={brand.brand}
                            className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white"
                            style={{ backgroundColor: brand.color }}
                            title={brand.brand}
                          >
                            {brand.icon}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-sm text-foreground font-medium">{citation.usedTotal}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-sm text-foreground font-medium">{citation.avgCitations}</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className="text-sm text-muted-foreground">{citation.updated}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
