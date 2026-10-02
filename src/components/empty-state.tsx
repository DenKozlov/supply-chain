interface EmptyStateProps {
  text?: string;
  className?: string;
  size?: "md" | "lg" | "xl";
}

export function EmptyState({
  text = "N/A",
  className = "",
  size = "lg",
}: EmptyStateProps) {
  const sizeClasses = {
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl",
  };

  return (
    <div
      className={`flex items-center justify-center w-full h-full min-h-[inherit] ${className}`}
    >
      <span className={`font-bold text-gray-400 ${sizeClasses[size]}`}>
        {text}
      </span>
    </div>
  );
}

export default EmptyState;
