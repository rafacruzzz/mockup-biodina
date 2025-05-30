
import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface InputMaskProps extends React.ComponentProps<"input"> {
  mask: 'cpf' | 'cnpj' | 'cpf-cnpj' | 'phone' | 'cep' | 'currency'
}

const applyMask = (value: string, mask: string): string => {
  const numericValue = value.replace(/\D/g, '')
  
  switch (mask) {
    case 'cpf':
      return numericValue
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    
    case 'cnpj':
      return numericValue
        .slice(0, 14)
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    
    case 'cpf-cnpj':
      if (numericValue.length <= 11) {
        return numericValue
          .slice(0, 11)
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      } else {
        return numericValue
          .slice(0, 14)
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      }
    
    case 'phone':
      if (numericValue.length <= 10) {
        return numericValue
          .slice(0, 10)
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4})(\d{1,4})$/, '$1-$2')
      } else {
        return numericValue
          .slice(0, 11)
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d{1,4})$/, '$1-$2')
      }
    
    case 'cep':
      return numericValue
        .slice(0, 8)
        .replace(/(\d{5})(\d{1,3})$/, '$1-$2')
    
    case 'currency':
      const number = parseFloat(numericValue) / 100
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(isNaN(number) ? 0 : number)
    
    default:
      return value
  }
}

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, mask, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const maskedValue = applyMask(event.target.value, mask)
      event.target.value = maskedValue
      if (onChange) {
        onChange(event)
      }
    }

    return (
      <Input
        className={cn(className)}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )
  }
)
InputMask.displayName = "InputMask"

export { InputMask }
