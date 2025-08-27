
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  currency?: 'BRL' | 'USD';
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, value, onChange, currency = 'BRL', ...props }, ref) => {
    const formatCurrency = (value: string) => {
      const numbers = value.replace(/\D/g, '');
      const amount = parseFloat(numbers) / 100;
      
      if (currency === 'BRL') {
        return amount.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      } else {
        return amount.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
      }
    };

    const getPlaceholder = () => {
      return currency === 'BRL' ? 'R$ 0,00' : '$0.00';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const numbers = inputValue.replace(/\D/g, '');
      onChange(numbers);
    };

    const displayValue = value ? formatCurrency(value) : '';

    return (
      <Input
        {...props}
        ref={ref}
        className={cn(className)}
        value={displayValue}
        onChange={handleChange}
        placeholder={getPlaceholder()}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
