# Tag 页面更新说明

## 更新日期
2025-10-21

## 更新内容

### 1. 页面标题更新
- **原标题**: "Tag Management"
- **新标题**: "Prompt Tags"

### 2. 页面布局重构

#### 顶部操作栏（从左到右）
1. **All Tags 下拉菜单**（新增）
   - 显示所有可用标签及其使用次数
   - 每个标签显示颜色点标识
   - 显示统计信息：`{标签数量} tags · {总分配数} assignments`
   - 支持删除标签功能（悬停显示删除按钮）
   - 底部包含 "+ New Tag" 选项，可直接创建新标签

2. **Add Prompt 按钮**（原 Create Tag 按钮）
   - 功能更改为添加 Prompt
   - 点击弹出对话框用于输入新的 Prompt 内容

### 3. 内容区域调整

#### Prompt Tags 表格（已上移）
- 表格位于页面主要位置
- 显示所有 Prompts 及其关联的标签
- 标签显示优化：
  - 每个标签显示颜色点标识
  - 标签以小徽章形式显示
  - 未添加标签时显示 "No tags" 提示
- Manage 按钮：点击可管理单个 Prompt 的标签

#### 移除的部分
- "All Tags" 独立展示区域已移除（整合到下拉菜单中）

### 4. 新增功能

#### All Tags 下拉菜单功能
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <TagIcon className="mr-2 h-4 w-4" />
      All Tags
      <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    {/* 统计信息 */}
    <div className="px-2 py-1.5">
      <p className="text-xs font-semibold text-muted-foreground">
        {tags.length} tags · {assignments} assignments
      </p>
    </div>

    {/* 标签列表 */}
    {tags.map((tag) => (
      <DropdownMenuItem>
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} />
        <span>#{tag.name}</span>
        <span>({tag.promptCount})</span>
        <X /> {/* 删除按钮 */}
      </DropdownMenuItem>
    ))}

    {/* 新建标签 */}
    <DropdownMenuItem onClick={() => setIsNewTagOpen(true)}>
      <Plus className="mr-2 h-4 w-4" />
      New Tag
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 5. 用户交互改进

#### 创建新标签流程
1. 点击 "All Tags" 下拉菜单
2. 点击底部 "+ New Tag" 选项
3. 在弹出对话框中输入标签名称
4. 支持回车键快速创建
5. 标签立即显示在下拉菜单中

#### 标签管理流程
1. 在表格中找到要管理的 Prompt
2. 点击该行的 "Manage" 按钮
3. 在弹出对话框中勾选/取消标签
4. 标签显示带有颜色点标识
5. 点击 "Done" 保存更改

### 6. 视觉优化

#### 标签颜色显示
- 下拉菜单中：2x2 像素圆点
- 表格中：1.5x1.5 像素圆点
- Manage 对话框中：2x2 像素圆点
- 所有位置都使用标签的实际颜色

#### 标签徽章样式
```tsx
<div className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5">
  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
  <span className="text-xs text-muted-foreground">#{tagName}</span>
</div>
```

### 7. 删除的功能
- 移除了独立的 "All Tags" 卡片展示区域
- 移除了 "Create Tag" 主要按钮（功能整合到下拉菜单）

## 技术实现细节

### 新增状态
```tsx
const [isAddPromptOpen, setIsAddPromptOpen] = useState(false)  // Add Prompt 对话框
const [isNewTagOpen, setIsNewTagOpen] = useState(false)        // New Tag 对话框
```

### 组件导入
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
```

## 用户体验提升

1. **更紧凑的布局**: 标签列表整合到下拉菜单，节省页面空间
2. **快速访问**: 点击即可查看所有标签和统计信息
3. **便捷创建**: 直接在下拉菜单中创建新标签，减少操作步骤
4. **视觉一致性**: 所有位置的标签都显示颜色标识
5. **功能清晰**: "Add Prompt" 和 "All Tags" 功能分离明确

## 文件路径
`/Users/joey_uni/Desktop/geo-app/app/action/tag/page.tsx`

## 截图位置建议
1. 顶部操作栏（展示 All Tags 和 Add Prompt 按钮）
2. All Tags 下拉菜单展开状态
3. Prompt Tags 表格视图
4. New Tag 创建对话框
5. Manage Tags 对话框
