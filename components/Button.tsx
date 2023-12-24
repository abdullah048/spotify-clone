import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'w-full rounded-full bg-green-500 border border-transparent p-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition-all',
          className
        )}
        disabled={disabled}
        {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
