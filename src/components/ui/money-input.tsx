
import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const formatCurrency = (value: string) => {
      const numbers = value.replace(/\D/g, '');
      const amount = parseFloat(numbers) / 100;
      return amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
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
        placeholder="R$ 0,00"
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
