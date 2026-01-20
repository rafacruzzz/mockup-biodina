import * as React from "react"

import { cn } from "@/lib/utils"

// Tipos de input que NÃO devem ser convertidos para maiúsculas
const EXCLUDED_TYPES = ['email', 'password', 'number', 'date', 'time', 'datetime-local', 'file', 'hidden', 'color', 'range'];

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onChange, ...props }, ref) => {
    // Determinar se deve aplicar maiúsculas
    const shouldUppercase = !EXCLUDED_TYPES.includes(type || 'text');
    
    // Handler que converte para maiúsculas
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (shouldUppercase && e.target.value) {
        e.target.value = e.target.value.toUpperCase();
      }
      onChange?.(e);
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          shouldUppercase && "uppercase",
          className
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
