import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { mockContentBriefs } from "@/lib/mock-data"

export default async function ContentBriefDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const brief = mockContentBriefs.find((b) => b.id === id)

  if (!brief) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card px-6 py-3">
        <Link
          href="/action/content-workshop"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Content Workshop
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-foreground mb-2">{brief.title}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{brief.contentType}</Badge>
              <Badge
                variant={brief.priority === "High" ? "default" : brief.priority === "Medium" ? "secondary" : "outline"}
              >
                {brief.priority} Priority
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Select defaultValue={brief.status.toLowerCase().replace(" ", "-")}>
              <SelectTrigger className="w-[140px] bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-background">
              Export
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Generate</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="outline" className="h-full flex flex-col">
          <div className="border-b border-border bg-card px-6">
            <TabsList className="bg-transparent h-12">
              <TabsTrigger value="outline" className="data-[state=active]:bg-secondary">
                Outline
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-secondary">
                SEO Inputs
              </TabsTrigger>
              <TabsTrigger value="gaps" className="data-[state=active]:bg-secondary">
                Competitive Gaps
              </TabsTrigger>
              <TabsTrigger value="draft" className="data-[state=active]:bg-secondary">
                Draft
              </TabsTrigger>
              <TabsTrigger value="distribution" className="data-[state=active]:bg-secondary">
                Distribution
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="outline" className="mt-0 space-y-4">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Content Outline</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Auto-generated structure based on prompt analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">H1: Introduction</h4>
                    <p className="text-sm text-muted-foreground pl-4">
                      Overview of project management for remote teams
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">H2: Key Challenges</h4>
                    <p className="text-sm text-muted-foreground pl-4">Communication barriers</p>
                    <p className="text-sm text-muted-foreground pl-4">Time zone differences</p>
                    <p className="text-sm text-muted-foreground pl-4">Task visibility</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">H2: Essential Features</h4>
                    <p className="text-sm text-muted-foreground pl-4">Real-time collaboration</p>
                    <p className="text-sm text-muted-foreground pl-4">Automation capabilities</p>
                    <p className="text-sm text-muted-foreground pl-4">Integration ecosystem</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">H2: Best Practices</h4>
                    <p className="text-sm text-muted-foreground pl-4">Setting up workflows</p>
                    <p className="text-sm text-muted-foreground pl-4">Team onboarding</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">H2: FAQ</h4>
                    <p className="text-sm text-muted-foreground pl-4">How to choose the right tool?</p>
                    <p className="text-sm text-muted-foreground pl-4">What integrations are essential?</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="mt-0 space-y-4">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">SEO Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Primary Keyword</label>
                    <Input
                      defaultValue={brief.targetKeyword}
                      className="bg-background"
                      placeholder="Enter primary keyword"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Secondary Keywords</label>
                    <Textarea
                      className="bg-background min-h-[100px]"
                      placeholder="Enter secondary keywords (one per line)"
                      defaultValue="remote team collaboration&#10;distributed team management&#10;async project management"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Target Entities</label>
                    <Textarea
                      className="bg-background min-h-[80px]"
                      placeholder="Key entities to include"
                      defaultValue="Asana, Slack, Zoom, automation, workflows"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Schema Suggestions</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Article</Badge>
                      <Badge variant="secondary">HowTo</Badge>
                      <Badge variant="secondary">FAQPage</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gaps" className="mt-0 space-y-4">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Competitive Gaps</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Insights from opportunity analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Competitors include mobile app screenshots - add visual examples
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Missing comparison table of features across tools
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Add section on security and compliance for remote teams
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        Include customer testimonials or case studies
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft" className="mt-0 space-y-4">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Content Draft</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="bg-background min-h-[400px] font-mono text-sm"
                    placeholder="Start writing your content here..."
                    defaultValue="# Ultimate Guide to Project Management for Remote Teams&#10;&#10;Managing remote teams requires the right tools and processes..."
                  />
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="bg-background">
                      Insert from Model
                    </Button>
                    <Button variant="outline" className="bg-background">
                      AI Enhance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distribution" className="mt-0 space-y-4">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="text-base text-foreground">Distribution Channels</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Prepare content for social platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">LinkedIn Post</label>
                    <Textarea
                      className="bg-background min-h-[120px]"
                      placeholder="LinkedIn post template"
                      defaultValue="Just published our ultimate guide to project management for remote teams! 🚀&#10;&#10;Key takeaways:&#10;✓ Essential features for distributed teams&#10;✓ Best practices for async collaboration&#10;✓ How to choose the right tool&#10;&#10;Read more: [link]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Reddit Post</label>
                    <Textarea
                      className="bg-background min-h-[120px]"
                      placeholder="Reddit post template"
                      defaultValue="I wrote a comprehensive guide on managing remote teams effectively. Covers everything from tool selection to workflow automation. Hope it helps!"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
