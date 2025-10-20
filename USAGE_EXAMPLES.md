# 使用示例

本文档展示如何使用新架构中的组件、Hooks 和工具函数。

## 目录

- [类型导入](#类型导入)
- [使用自定义 Hooks](#使用自定义-hooks)
- [使用通用组件](#使用通用组件)
- [使用工具函数](#使用工具函数)
- [使用常量](#使用常量)

## 类型导入

### 导入类型定义

```typescript
// 导入单个类型
import type { Prompt } from "@/types"

// 导入多个类型
import type { Prompt, Citation, Opportunity } from "@/types"

// 在函数参数中使用
function processPrompt(prompt: Prompt) {
  // ...
}

// 在状态中使用
const [prompts, setPrompts] = useState<Prompt[]>([])
```

## 使用自定义 Hooks

### 1. useTabs - 标签页管理

```typescript
import { useTabs } from "@/hooks"

function MyComponent() {
  // 定义标签类型
  type TabType = "Active" | "Suggested" | "Inactive"

  // 使用 hook
  const { activeTab, setActiveTab, isActive } = useTabs<TabType>("Active")

  return (
    <div>
      <button onClick={() => setActiveTab("Active")}>
        {isActive("Active") ? "✓" : ""} Active
      </button>
      <button onClick={() => setActiveTab("Suggested")}>
        Suggested
      </button>
    </div>
  )
}
```

### 2. useSelection - 多选管理

```typescript
import { useSelection } from "@/hooks"

function PromptsTable() {
  const {
    selectedItems,
    isSelectionMode,
    toggleItem,
    selectAll,
    deselectAll,
    toggleSelectAll,
    toggleSelectionMode,
    isSelected,
    selectedCount
  } = useSelection<string>()

  const items = ["item1", "item2", "item3"]

  return (
    <div>
      {/* 选择模式切换 */}
      <button onClick={toggleSelectionMode}>
        {isSelectionMode ? "Cancel" : "Select"}
      </button>

      {/* 显示选中数量 */}
      {selectedCount > 0 && <div>Selected: {selectedCount}</div>}

      {/* 全选按钮 */}
      {isSelectionMode && (
        <button onClick={() => toggleSelectAll(items.map(i => i))}>
          Select All
        </button>
      )}

      {/* 列表项 */}
      {items.map(item => (
        <div key={item}>
          {isSelectionMode && (
            <input
              type="checkbox"
              checked={isSelected(item)}
              onChange={() => toggleItem(item)}
            />
          )}
          {item}
        </div>
      ))}
    </div>
  )
}
```

### 3. useFilter - 过滤管理

```typescript
import { useFilter } from "@/hooks"
import type { Opportunity } from "@/types"

function OpportunitiesPage() {
  const opportunities: Opportunity[] = [...]

  // 定义过滤函数
  const filterFn = (item: Opportunity, filterValue: string) => {
    if (filterValue === "all") return true
    return item.estimatedImpact === filterValue
  }

  const {
    filterValue,
    setFilterValue,
    filteredItems,
    itemCount
  } = useFilter(opportunities, filterFn, "all")

  return (
    <div>
      {/* 过滤器 */}
      <select
        value={filterValue}
        onChange={e => setFilterValue(e.target.value)}
      >
        <option value="all">All ({opportunities.length})</option>
        <option value="High">High Impact</option>
        <option value="Medium">Medium Impact</option>
        <option value="Low">Low Impact</option>
      </select>

      {/* 显示过滤结果 */}
      <div>Showing {itemCount} items</div>

      {/* 渲染过滤后的数据 */}
      {filteredItems.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  )
}
```

### 4. useDialog - 对话框管理

```typescript
import { useDialog } from "@/hooks"
import { Dialog, DialogContent } from "@/components/ui/dialog"

function TagManagement() {
  // 使用泛型指定数据类型
  const { isOpen, data, open, close } = useDialog<string>()

  return (
    <div>
      {/* 打开对话框并传递数据 */}
      <button onClick={() => open("prompt-123")}>
        Manage Tags
      </button>

      {/* 对话框 */}
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent>
          <h2>Managing tags for: {data}</h2>
          <button onClick={close}>Close</button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## 使用通用组件

### 1. TabButton

```typescript
import { TabButton } from "@/components/common"
import { useTabs } from "@/hooks"

function MyTabs() {
  const { activeTab, setActiveTab } = useTabs("tab1")

  return (
    <div className="flex gap-2">
      <TabButton
        active={activeTab === "tab1"}
        onClick={() => setActiveTab("tab1")}
      >
        Tab 1
      </TabButton>
      <TabButton
        active={activeTab === "tab2"}
        onClick={() => setActiveTab("tab2")}
      >
        Tab 2
      </TabButton>
    </div>
  )
}
```

### 2. StatusBadge

```typescript
import { StatusBadge } from "@/components/common"
import type { Prompt } from "@/types"

function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <div>
      <h3>{prompt.prompt}</h3>
      <StatusBadge sentiment={prompt.sentiment} />
    </div>
  )
}
```

### 3. SentimentIndicator

```typescript
import { SentimentIndicator } from "@/components/common"

function PromptRow({ prompt }) {
  return (
    <tr>
      <td>{prompt.prompt}</td>
      <td>
        <SentimentIndicator
          sentiment={prompt.sentiment}
          score={prompt.sentimentScore}
        />
      </td>
    </tr>
  )
}
```

### 4. BrandIcons

```typescript
import { BrandIcons } from "@/components/common"

function CitationRow({ citation }) {
  return (
    <tr>
      <td>{citation.pageTitle}</td>
      <td>
        <BrandIcons
          brands={citation.brandMentions}
          maxDisplay={4}
          size="md"
        />
      </td>
    </tr>
  )
}
```

### 5. PageHeader

```typescript
import { PageHeader } from "@/components/common"
import { Button } from "@/components/ui/button"

function PromptsPage() {
  return (
    <div>
      <PageHeader
        title="Prompts"
        description="Manage and analyze your prompts"
        stats="120 / 500 Prompts"
        actions={
          <>
            <Button variant="outline">Import</Button>
            <Button>Create New</Button>
          </>
        }
      />
      {/* Page content */}
    </div>
  )
}
```

### 6. EmptyState

```typescript
import { EmptyState } from "@/components/common"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

function NoResults() {
  return (
    <EmptyState
      title="No prompts found"
      description="Try adjusting your search or filters"
      icon={<FileQuestion className="h-12 w-12" />}
      action={
        <Button onClick={() => resetFilters()}>
          Reset Filters
        </Button>
      }
    />
  )
}
```

## 使用工具函数

### 1. 标签相关

```typescript
import { getTagColor } from "@/lib/helpers"

// 获取标签颜色
const color = getTagColor("remote") // "#3B82F6"

// 在样式中使用
<span style={{ backgroundColor: getTagColor(tagName) }}>
  {tagName}
</span>
```

### 2. 引用处理

```typescript
import {
  groupCitationsByDomain,
  calculateAverageRank,
  getUniqueBrandMentions
} from "@/lib/helpers"

// 按域名分组
const grouped = groupCitationsByDomain(citations)

// 计算平均排名
const avgRank = calculateAverageRank(citations) // "2.5"

// 获取唯一品牌
const brands = getUniqueBrandMentions(citations)
```

### 3. 格式化

```typescript
import {
  formatRelativeTime,
  truncateText,
  formatPercentageChange
} from "@/lib/helpers"

// 相对时间
formatRelativeTime("2024-01-10") // "3 days ago"

// 截断文本
truncateText("Long text here...", 20) // "Long text here..."

// 百分比变化
formatPercentageChange(15) // "+15%"
formatPercentageChange(-5) // "-5%"
```

### 4. 数组操作

```typescript
import { sortByProperty, filterBySearchTerm } from "@/lib/helpers"

// 排序
const sorted = sortByProperty(prompts, "visibilityScore", "desc")

// 搜索过滤
const filtered = filterBySearchTerm(
  prompts,
  "remote",
  ["prompt", "tags"]
)
```

### 5. 防抖

```typescript
import { debounce } from "@/lib/helpers"
import { useState } from "react"

function SearchInput() {
  const [query, setQuery] = useState("")

  // 创建防抖搜索函数
  const debouncedSearch = debounce((value: string) => {
    // 执行搜索
    console.log("Searching for:", value)
  }, 300)

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value)
        debouncedSearch(e.target.value)
      }}
    />
  )
}
```

## 使用常量

### 1. 标签

```typescript
import { AVAILABLE_TAGS } from "@/constants"

// 直接使用
function TagSelector() {
  return (
    <div>
      {AVAILABLE_TAGS.map(tag => (
        <button
          key={tag.id}
          style={{ backgroundColor: tag.color }}
        >
          {tag.name}
        </button>
      ))}
    </div>
  )
}
```

### 2. 机会类型配置

```typescript
import {
  OPPORTUNITY_ICONS,
  OPPORTUNITY_COLORS,
  OPPORTUNITY_DESCRIPTIONS
} from "@/constants"

function OpportunityCard({ opportunity }) {
  const Icon = OPPORTUNITY_ICONS[opportunity.type]
  const color = OPPORTUNITY_COLORS[opportunity.type]
  const description = OPPORTUNITY_DESCRIPTIONS[opportunity.type]

  return (
    <div className={color}>
      <Icon className="h-5 w-5" />
      <h3>{opportunity.title}</h3>
      <p>{description}</p>
    </div>
  )
}
```

### 3. 过滤选项

```typescript
import {
  DATE_FILTER_OPTIONS,
  MODEL_FILTER_OPTIONS,
  IMPACT_FILTER_OPTIONS
} from "@/constants"

function Filters() {
  return (
    <>
      <select>
        {DATE_FILTER_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select>
        {MODEL_FILTER_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  )
}
```

## 完整示例：重构 PromptsPage

```typescript
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { Prompt } from "@/types"
import { useTabs, useSelection, useDialog } from "@/hooks"
import { TabButton, PageHeader, BrandIcons, SentimentIndicator } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AVAILABLE_TAGS, PROMPT_STATUS_TABS } from "@/constants"
import { getTagColor } from "@/lib/helpers"
import { mockPrompts } from "@/lib/mock-data"

export default function PromptsPage() {
  const router = useRouter()

  // 使用自定义 hooks
  const { activeTab, setActiveTab } = useTabs<Prompt["status"]>("Active")
  const {
    selectedItems,
    isSelectionMode,
    toggleItem,
    toggleSelectAll,
    toggleSelectionMode,
    selectedCount
  } = useSelection<string>()
  const { isOpen, data, open, close } = useDialog<string>()

  // 状态
  const [prompts, setPrompts] = React.useState(mockPrompts)

  // 过滤
  const filteredPrompts = prompts.filter(p => p.status === activeTab)

  return (
    <div className="flex h-full flex-col">
      {/* 页面头部 */}
      <PageHeader
        title="Prompts"
        stats={`${filteredPrompts.length} / ${prompts.length} Prompts`}
        actions={
          <>
            {selectedCount > 0 && (
              <Button variant="outline">
                Actions ({selectedCount})
              </Button>
            )}
            <Button onClick={toggleSelectionMode}>
              {isSelectionMode ? "Cancel" : "Select"}
            </Button>
          </>
        }
      />

      {/* 标签页 */}
      <div className="border-b border-border px-8 py-4">
        <div className="flex gap-2">
          {PROMPT_STATUS_TABS.map(tab => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </div>
      </div>

      {/* 表格内容 */}
      <div className="flex-1 overflow-auto p-6">
        <table className="w-full">
          <tbody>
            {filteredPrompts.map(prompt => (
              <tr key={prompt.id}>
                {isSelectionMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(prompt.id)}
                      onChange={() => toggleItem(prompt.id)}
                    />
                  </td>
                )}
                <td>{prompt.prompt}</td>
                <td>
                  <SentimentIndicator
                    sentiment={prompt.sentiment}
                    score={prompt.sentimentScore}
                  />
                </td>
                <td>
                  <BrandIcons brands={prompt.brandMentions} />
                </td>
                <td>
                  <button onClick={() => open(prompt.id)}>
                    Tags
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 标签对话框 */}
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent>
          <h2>Manage Tags</h2>
          {/* 标签选择器 */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## 最佳实践

1. **总是使用类型**: 从 `@/types` 导入类型定义
2. **优先使用 Hooks**: 使用自定义 hooks 管理状态
3. **复用组件**: 使用通用组件保持 UI 一致性
4. **提取逻辑**: 将复杂逻辑移到工具函数中
5. **使用常量**: 避免硬编码，使用集中的常量
6. **保持简洁**: 组件应该简洁，专注于渲染

## 下一步

- 查看 [ARCHITECTURE.md](./ARCHITECTURE.md) 了解完整架构
- 开始重构现有页面组件
- 根据需要添加新的 hooks 和工具函数
