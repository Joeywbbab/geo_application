"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function CompanyInfoPage() {
  return (
    <div className="flex h-full flex-col overflow-auto">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Product Info</h1>
        <p className="text-sm text-muted-foreground">Maintain your product information and core details</p>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Product Information</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Core product details and key information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Product Name</label>
                <Input defaultValue="Asana" className="bg-background" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Website URL</label>
                <Input defaultValue="https://asana.com" className="bg-background" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-foreground mb-2 block">Industry</label>
                <Input defaultValue="Project Management Software" className="bg-background" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Product Intro</label>
              <Textarea
                className="bg-background min-h-[100px]"
                defaultValue="Asana is a work management platform that helps teams organize, track, and manage their work. From daily tasks to strategic initiatives, Asana enables teams to move work from start to finish with clarity and confidence."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Unique Selling Point</label>
              <Textarea
                className="bg-background min-h-[100px]"
                defaultValue="Asana combines powerful project management with intuitive design and automation capabilities, enabling teams to coordinate work across departments and achieve goals faster. Unlike competitors, Asana offers unparalleled flexibility with multiple project views (list, board, timeline, calendar) and seamless integrations with 200+ tools."
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
