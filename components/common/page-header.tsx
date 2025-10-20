import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  stats?: string
}

/**
 * Consistent page header component
 */
export function PageHeader({ title, description, actions, stats }: PageHeaderProps) {
  return (
    <div className="border-b border-border px-8 py-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {stats && (
              <span className="text-sm text-muted-foreground font-normal">· {stats}</span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
