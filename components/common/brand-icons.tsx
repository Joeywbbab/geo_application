import type { BrandMention } from "@/types"

interface BrandIconsProps {
  brands: BrandMention[]
  maxDisplay?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

/**
 * Display brand mention icons with overflow indicator
 */
export function BrandIcons({ brands, maxDisplay = 4, size = "md", className }: BrandIconsProps) {
  const sizeClasses = {
    sm: "w-5 h-5 text-xs",
    md: "w-6 h-6 text-xs",
    lg: "w-8 h-8 text-sm",
  }

  const displayedBrands = brands.slice(0, maxDisplay)
  const remainingCount = brands.length - maxDisplay

  return (
    <div className={`flex items-center gap-1.5 ${className || ""}`}>
      {displayedBrands.map((mention, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center rounded-md font-semibold text-white ${sizeClasses[size]}`}
          style={{ backgroundColor: mention.color }}
          title={mention.brand}
        >
          {mention.icon}
        </div>
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-muted-foreground">+{remainingCount}</span>
      )}
    </div>
  )
}
