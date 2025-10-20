import type { ReactNode } from "react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

/**
 * Empty state component for when no data is available
 */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex h-full items-center justify-center p-8">
      <div className="text-center max-w-md">
        {icon && <div className="mb-4 flex justify-center text-muted-foreground">{icon}</div>}
        <p className="text-muted-foreground mb-2">{title}</p>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    </div>
  )
}
