import { cn } from "@/lib/utils"

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

/**
 * Reusable tab button component with consistent styling
 */
export function TabButton({ active, onClick, children, className }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 text-sm font-medium rounded-lg transition-all border-2",
        active
          ? "bg-background text-foreground border-primary shadow-sm"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent",
        className,
      )}
    >
      {children}
    </button>
  )
}
