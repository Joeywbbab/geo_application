# GEO App - Growth Engine Optimization Platform

A comprehensive AI Brand Visibility Analytics Platform built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

### Analytics Dashboard
- **Prompts Analytics** - Track and analyze AI model prompts mentioning your brand
- **Citations Management** - Monitor all sources citing your brand across AI models
- **Opportunity Radar** - Discover content gaps and optimization opportunities

### Action Center
- **Prompt Tags** - Organize and categorize prompts with custom tags
- **Content Workshop** - Create, edit, and manage content briefs

### Market Intelligence
- **Company Information** - Manage your brand's competitive profile
- **Competitor Management** - Track and analyze competitor mentions

## 🏗️ Architecture

This project features a clean, scalable architecture:

```
geo-app/
├── app/                    # Next.js 15 App Router pages
├── components/
│   ├── common/           # Reusable common components
│   └── ui/               # UI component library (Radix UI)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── types/                # TypeScript type definitions
├── constants/            # Application constants
└── public/               # Static assets
```

### Key Technical Features

- ✅ **Centralized Type System** - Complete TypeScript coverage
- ✅ **Custom Hooks** - Reusable state management (`useTabs`, `useSelection`, `useFilter`, `useDialog`)
- ✅ **Common Components** - Consistent UI patterns (`TabButton`, `PageHeader`, `StatusBadge`)
- ✅ **Helper Functions** - DRY utilities for data processing
- ✅ **Constants Management** - Centralized configuration

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.0
- **Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/geo-app.git
cd geo-app

# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📚 Documentation

- [**Architecture Guide**](./ARCHITECTURE.md) - Complete architecture overview and design decisions
- [**Usage Examples**](./USAGE_EXAMPLES.md) - How to use hooks, components, and utilities
- [**Optimization Summary**](./OPTIMIZATION_SUMMARY.md) - Code quality improvements and refactoring

## 🎨 Project Structure

### Pages
- `/dashboard` - Main analytics dashboard with charts and metrics
- `/analytics/prompts` - Prompt management and analysis
- `/analytics/citations` - Citation tracking by domain and URL
- `/analytics/opportunities` - Content opportunity recommendations
- `/action/tag` - Tag management for prompts
- `/action/content-workshop` - Content brief editor
- `/market-intelligence` - Competitor and company management

### Custom Hooks
```typescript
import { useTabs, useSelection, useFilter, useDialog } from "@/hooks"
```

### Common Components
```typescript
import { TabButton, PageHeader, StatusBadge, BrandIcons } from "@/components/common"
```

### Helper Functions
```typescript
import { getTagColor, formatRelativeTime, sortByProperty } from "@/lib/helpers"
```

## 🎯 Key Features

### 1. Type-Safe Development
Every component and function is fully typed with TypeScript for maximum type safety and better developer experience.

### 2. Reusable Components
Consistent UI patterns through shared components:
- `TabButton` - Unified tab navigation
- `PageHeader` - Standardized page headers
- `StatusBadge` - Sentiment and status indicators
- `BrandIcons` - Brand mention visualizations

### 3. Smart State Management
Custom hooks for common patterns:
- `useTabs()` - Tab state management
- `useSelection()` - Multi-select with checkboxes
- `useFilter()` - Data filtering logic
- `useDialog()` - Modal/dialog state

### 4. Helper Utilities
DRY utilities for common operations:
- Data grouping and aggregation
- Date formatting
- Search and filtering
- Array sorting

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Built with ❤️ using Claude Code**

For detailed architecture and usage information, see [ARCHITECTURE.md](./ARCHITECTURE.md) and [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md).
