"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, X, TagIcon, ChevronDown } from "lucide-react"
import { mockPrompts } from "@/lib/mock-data"

type Tag = {
  id: string
  name: string
  color: string
  promptCount: number
}

export default function PromptTagsPage() {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", name: "remote", color: "#3B82F6", promptCount: 1 },
    { id: "2", name: "collaboration", color: "#10B981", promptCount: 1 },
    { id: "3", name: "comparison", color: "#F59E0B", promptCount: 1 },
    { id: "4", name: "agile", color: "#8B5CF6", promptCount: 1 },
    { id: "5", name: "automation", color: "#EC4899", promptCount: 1 },
    { id: "6", name: "workflows", color: "#06B6D4", promptCount: 1 },
    { id: "7", name: "features", color: "#84CC16", promptCount: 1 },
    { id: "8", name: "pricing", color: "#F97316", promptCount: 1 },
    { id: "9", name: "startups", color: "#6366F1", promptCount: 1 },
    { id: "10", name: "AI", color: "#EF4444", promptCount: 2 },
    { id: "11", name: "memory", color: "#14B8A6", promptCount: 1 },
  ])

  const [prompts, setPrompts] = useState(mockPrompts)
  const [isAddPromptOpen, setIsAddPromptOpen] = useState(false)
  const [isNewTagOpen, setIsNewTagOpen] = useState(false)
  const [isManageTagsOpen, setIsManageTagsOpen] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [newTagName, setNewTagName] = useState("")

  const handleCreateTag = () => {
    if (!newTagName.trim()) return

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName.trim(),
      color: "#6B7280",
      promptCount: 0,
    }

    setTags([...tags, newTag])
    setNewTagName("")
    setIsNewTagOpen(false)
  }

  const handleDeleteTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId))
    // Remove tag from all prompts
    setPrompts(
      prompts.map((prompt) => ({
        ...prompt,
        tags: prompt.tags.filter((t) => t !== tags.find((tag) => tag.id === tagId)?.name),
      })),
    )
  }

  const handleTogglePromptTag = (promptId: string, tagName: string) => {
    setPrompts(
      prompts.map((prompt) => {
        if (prompt.id === promptId) {
          const hasTag = prompt.tags.includes(tagName)
          return {
            ...prompt,
            tags: hasTag ? prompt.tags.filter((t) => t !== tagName) : [...prompt.tags, tagName],
          }
        }
        return prompt
      }),
    )

    // Update tag count
    setTags(
      tags.map((tag) => {
        if (tag.name === tagName) {
          const currentPrompt = prompts.find((p) => p.id === promptId)
          const hasTag = currentPrompt?.tags.includes(tagName)
          return {
            ...tag,
            promptCount: hasTag ? tag.promptCount - 1 : tag.promptCount + 1,
          }
        }
        return tag
      }),
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Prompt Tags</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create and manage custom tags for organizing prompts</p>
          </div>
          <div className="flex items-center gap-3">
            {/* All Tags Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <TagIcon className="mr-2 h-4 w-4" />
                  All Tags
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {tags.length} tags · {prompts.reduce((acc, p) => acc + p.tags.length, 0)} assignments
                  </p>
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {tags.map((tag) => (
                    <DropdownMenuItem key={tag.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">#{tag.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">({tag.promptCount})</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteTag(tag.id)
                          }}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <X className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsNewTagOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Tag
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add Prompt Button */}
            <Dialog open={isAddPromptOpen} onOpenChange={setIsAddPromptOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Prompt
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Prompt</DialogTitle>
                  <DialogDescription>Add a new prompt to tag and organize</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="prompt-text">Prompt</Label>
                    <Input
                      id="prompt-text"
                      placeholder="Enter your prompt..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddPromptOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddPromptOpen(false)}>
                    Add Prompt
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Prompts with Tag Management */}
        <div className="rounded-lg border border-border bg-card m-6">
          <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Prompt</TableHead>
                  <TableHead className="font-semibold">Tags</TableHead>
                  <TableHead className="w-[100px] font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prompts.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell className="max-w-md">
                      <div className="line-clamp-2 text-sm text-foreground">{prompt.prompt}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {prompt.tags.map((tagName) => (
                          <span key={tagName} className="text-sm text-muted-foreground">
                            #{tagName}
                          </span>
                        ))}
                        {prompt.tags.length === 0 && (
                          <span className="text-xs text-muted-foreground italic">No tags</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog
                        open={isManageTagsOpen && selectedPrompt === prompt.id}
                        onOpenChange={(open) => {
                          setIsManageTagsOpen(open)
                          if (open) setSelectedPrompt(prompt.id)
                          else setSelectedPrompt(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <TagIcon className="mr-2 h-4 w-4" />
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Manage Tags</DialogTitle>
                            <DialogDescription className="line-clamp-2">{prompt.prompt}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3 py-4 max-h-[400px] overflow-y-auto">
                            {tags.map((tag) => (
                              <div key={tag.id} className="flex items-center space-x-3">
                                <Checkbox
                                  id={`tag-${tag.id}-${prompt.id}`}
                                  checked={prompt.tags.includes(tag.name)}
                                  onCheckedChange={() => handleTogglePromptTag(prompt.id, tag.name)}
                                />
                                <label
                                  htmlFor={`tag-${tag.id}-${prompt.id}`}
                                  className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  #{tag.name}
                                </label>
                              </div>
                            ))}
                          </div>
                          <DialogFooter>
                            <Button
                              onClick={() => {
                                setIsManageTagsOpen(false)
                                setSelectedPrompt(null)
                              }}
                            >
                              Done
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </div>

      {/* New Tag Dialog */}
      <Dialog open={isNewTagOpen} onOpenChange={setIsNewTagOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Tag</DialogTitle>
            <DialogDescription>Add a new tag to organize your prompts</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tag-name">Tag Name</Label>
              <Input
                id="tag-name"
                placeholder="e.g., enterprise, mobile, integration"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTagName.trim()) {
                    handleCreateTag()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTagOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTag} disabled={!newTagName.trim()}>
              Create Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
