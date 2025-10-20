# 架构优化文档

## 概述

本文档记录了对 GEO (Growth Engine Optimization) 应用的架构优化工作。

## 项目技术栈

- **框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4.1
- **组件库**: Radix UI
- **图表**: Recharts
- **状态管理**: React Hooks (本地状态)

## 目录结构

```
geo-app/
├── app/                          # Next.js 应用路由
│   ├── layout.tsx               # 根布局
│   ├── page.tsx                 # 首页 (重定向)
│   ├── globals.css              # 全局样式
│   ├── dashboard/               # 仪表板页面
│   ├── analytics/               # 分析页面
│   │   ├── prompts/            # 提示词页面
│   │   ├── citations/          # 引用页面
│   │   └── opportunities/      # 机会页面
│   ├── action/                  # 行动页面
│   │   ├── tag/                # 标签页面
│   │   └── content-workshop/   # 内容工坊
│   └── market-intelligence/     # 市场情报
│       ├── company-info/       # 公司信息
│       └── competitor-management/ # 竞争对手管理
├── components/                   # React 组件
│   ├── common/                  # 通用组件 (新增)
│   │   ├── tab-button.tsx      # 标签按钮
│   │   ├── status-badge.tsx    # 状态徽章
│   │   ├── sentiment-indicator.tsx # 情感指示器
│   │   ├── brand-icons.tsx     # 品牌图标
│   │   ├── page-header.tsx     # 页面头部
│   │   ├── empty-state.tsx     # 空状态
│   │   └── index.ts            # 导出
│   ├── ui/                      # Radix UI 组件
│   ├── app-sidebar.tsx          # 应用侧边栏
│   ├── top-bar.tsx              # 顶部栏
│   └── theme-provider.tsx       # 主题提供者
├── hooks/                        # 自定义 Hooks (新增)
│   ├── use-tabs.ts              # 标签页管理
│   ├── use-selection.ts         # 选择管理
│   ├── use-filter.ts            # 过滤管理
│   ├── use-dialog.ts            # 对话框管理
│   └── index.ts                 # 导出
├── lib/                          # 工具库
│   ├── utils.ts                 # 通用工具 (cn 函数)
│   ├── helpers.ts               # 辅助函数 (新增)
│   └── mock-data.ts             # Mock 数据
├── types/                        # 类型定义 (新增)
│   └── index.ts                 # 集中的类型定义
├── constants/                    # 常量配置 (新增)
│   └── index.ts                 # 应用常量
├── public/                       # 静态资源
└── styles/                       # 额外样式

```

## 优化内容

### 1. 类型系统优化 ✅

**问题**: 类型定义散布在 mock-data.ts 文件中，与数据混合。

**解决方案**: 创建集中的类型定义文件 `types/index.ts`

**新增文件**:
- `types/index.ts` - 包含所有域类型定义

**优势**:
- 类型定义与数据分离
- 更好的类型重用
- 便于维护和扩展
- 支持类型导入

**使用示例**:
```typescript
import type { Prompt, Citation, Opportunity } from "@/types"
```

### 2. 常量管理 ✅

**问题**: 常量（如标签、颜色、图标）硬编码在组件中。

**解决方案**: 创建集中的常量配置文件 `constants/index.ts`

**新增文件**:
- `constants/index.ts` - 应用级常量

**包含内容**:
- `AVAILABLE_TAGS` - 可用标签列表
- `OPPORTUNITY_ICONS` - 机会类型图标
- `OPPORTUNITY_COLORS` - 机会类型颜色
- `OPPORTUNITY_DESCRIPTIONS` - 机会类型描述
- `SENTIMENT_COLORS` - 情感颜色映射
- 各种过滤器选项

**使用示例**:
```typescript
import { AVAILABLE_TAGS, OPPORTUNITY_ICONS } from "@/constants"
```

### 3. 工具函数库 ✅

**问题**: 数据处理逻辑在组件中重复。

**解决方案**: 创建可复用的工具函数库 `lib/helpers.ts`

**新增文件**:
- `lib/helpers.ts` - 辅助函数集合

**包含函数**:
- `getTagColor()` - 获取标签颜色
- `groupCitationsByDomain()` - 按域名分组引用
- `calculateAverageRank()` - 计算平均排名
- `getUniqueBrandMentions()` - 获取唯一品牌提及
- `formatRelativeTime()` - 格式化相对时间
- `getSentimentColorClass()` - 获取情感颜色类
- `getImpactBadgeVariant()` - 获取影响徽章变体
- `truncateText()` - 截断文本
- `formatPercentageChange()` - 格式化百分比变化
- `sortByProperty()` - 按属性排序
- `debounce()` - 防抖函数
- `filterBySearchTerm()` - 搜索过滤

**使用示例**:
```typescript
import { getTagColor, groupCitationsByDomain } from "@/lib/helpers"
```

### 4. 自定义 Hooks ✅

**问题**: 状态管理逻辑重复，缺乏抽象。

**解决方案**: 创建可复用的自定义 Hooks

**新增文件**:
- `hooks/use-tabs.ts` - 标签页状态管理
- `hooks/use-selection.ts` - 多选状态管理
- `hooks/use-filter.ts` - 过滤状态管理
- `hooks/use-dialog.ts` - 对话框状态管理
- `hooks/index.ts` - 统一导出

**功能说明**:

#### `useTabs<T>`
管理标签页状态
```typescript
const { activeTab, setActiveTab, isActive } = useTabs<"Active" | "Suggested">("Active")
```

#### `useSelection<T>`
管理复选框选择
```typescript
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
```

#### `useFilter<T>`
管理过滤逻辑
```typescript
const { filterValue, setFilterValue, filteredItems, itemCount } = useFilter(
  items,
  (item, value) => item.impact === value
)
```

#### `useDialog<T>`
管理对话框/模态框
```typescript
const { isOpen, data, open, close, toggle } = useDialog<string>()
```

### 5. 通用 UI 组件 ✅

**问题**: UI 模式重复，缺少可复用组件。

**解决方案**: 创建通用 UI 组件库

**新增文件**:
- `components/common/tab-button.tsx` - 统一样式的标签按钮
- `components/common/status-badge.tsx` - 状态徽章
- `components/common/sentiment-indicator.tsx` - 情感指示器
- `components/common/brand-icons.tsx` - 品牌图标显示
- `components/common/page-header.tsx` - 页面头部组件
- `components/common/empty-state.tsx` - 空状态组件
- `components/common/index.ts` - 统一导出

**组件说明**:

#### `TabButton`
统一的标签按钮组件，支持激活状态
```typescript
<TabButton active={activeTab === "Active"} onClick={() => setActiveTab("Active")}>
  Active
</TabButton>
```

#### `StatusBadge`
情感状态徽章
```typescript
<StatusBadge sentiment="Positive" />
```

#### `SentimentIndicator`
带颜色条的情感指示器
```typescript
<SentimentIndicator sentiment="Positive" score={85} />
```

#### `BrandIcons`
品牌提及图标展示
```typescript
<BrandIcons brands={brandMentions} maxDisplay={4} size="md" />
```

#### `PageHeader`
统一的页面头部
```typescript
<PageHeader
  title="Prompts"
  description="Manage your prompts"
  stats="120 / 500 Prompts"
  actions={<Button>Action</Button>}
/>
```

#### `EmptyState`
空状态占位符
```typescript
<EmptyState
  title="No data found"
  description="Try adjusting your filters"
  icon={<Icon />}
  action={<Button>Create New</Button>}
/>
```

## 使用建议

### 1. 重构现有页面组件

使用新的 hooks 和组件重构现有页面，例如 `PromptsPage`:

**之前**:
```typescript
const [activeTab, setActiveTab] = React.useState<TabType>("Active")
const [selectedPrompts, setSelectedPrompts] = React.useState<Set<string>>(new Set())
const [isSelectionMode, setIsSelectionMode] = React.useState(false)

// 大量的 toggle 和 selection 逻辑...
```

**之后**:
```typescript
import { useTabs, useSelection } from "@/hooks"
import { TabButton, PageHeader, BrandIcons } from "@/components/common"

const { activeTab, setActiveTab } = useTabs<TabType>("Active")
const { selectedItems, toggleItem, isSelectionMode, toggleSelectionMode } = useSelection<string>()
```

### 2. 使用辅助函数简化逻辑

**之前**:
```typescript
const avgRank = (citations.reduce((sum, c) => sum + c.visibilityRank, 0) / citations.length).toFixed(1)
```

**之后**:
```typescript
import { calculateAverageRank } from "@/lib/helpers"

const avgRank = calculateAverageRank(citations)
```

### 3. 使用常量替代硬编码

**之前**:
```typescript
const availableTags = [
  { id: "1", name: "remote", color: "#3B82F6" },
  // ...
]
```

**之后**:
```typescript
import { AVAILABLE_TAGS } from "@/constants"
```

## 未来优化建议

### 1. API 层抽象
创建 `services/` 目录用于 API 调用：
```
services/
├── api.ts           # 基础 API 客户端
├── prompts.ts       # Prompts API
├── citations.ts     # Citations API
└── opportunities.ts # Opportunities API
```

### 2. 状态管理
对于复杂的全局状态，考虑使用：
- Zustand (轻量级)
- Redux Toolkit (企业级)
- React Query (服务器状态)

### 3. 数据验证
使用 Zod 进行运行时数据验证：
```typescript
import { z } from "zod"

const PromptSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  // ...
})
```

### 4. 测试
添加单元测试和集成测试：
```
__tests__/
├── hooks/
├── components/
└── lib/
```

### 5. 性能优化
- 使用 React.memo 优化组件渲染
- 实现虚拟滚动（长列表）
- 代码分割和懒加载

### 6. 错误处理
创建统一的错误边界和错误处理机制：
```typescript
components/
└── error-boundary.tsx
```

## 迁移路径

对于现有代码的逐步迁移：

1. **阶段 1**: 新功能使用新架构
2. **阶段 2**: 逐步重构高频使用的页面
3. **阶段 3**: 重构剩余页面
4. **阶段 4**: 清理旧代码和未使用的逻辑

## 代码风格指南

### 导入顺序
```typescript
// 1. React 和 Next.js
import * as React from "react"
import { useRouter } from "next/navigation"

// 2. 第三方库
import { Calendar } from "lucide-react"

// 3. 类型导入
import type { Prompt } from "@/types"

// 4. 组件导入
import { Button } from "@/components/ui/button"
import { TabButton } from "@/components/common"

// 5. Hooks
import { useTabs, useSelection } from "@/hooks"

// 6. 工具函数和常量
import { getTagColor } from "@/lib/helpers"
import { AVAILABLE_TAGS } from "@/constants"

// 7. 数据
import { mockPrompts } from "@/lib/mock-data"
```

### 命名约定
- 组件: PascalCase (`TabButton`)
- 函数: camelCase (`getTagColor`)
- 常量: UPPER_SNAKE_CASE (`AVAILABLE_TAGS`)
- 类型: PascalCase (`Prompt`, `Citation`)
- Hooks: camelCase with 'use' prefix (`useTabs`)

## 总结

本次架构优化主要关注：

✅ **代码组织**: 清晰的目录结构和职责分离
✅ **类型安全**: 集中的类型定义系统
✅ **可复用性**: 通用组件和 Hooks
✅ **可维护性**: 常量提取和工具函数
✅ **可扩展性**: 模块化设计便于功能扩展

这些改进为项目的长期维护和团队协作奠定了良好的基础。
