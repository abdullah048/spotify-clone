import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

type Props = {} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ disabled, placeholder, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md bg-neutral-700 border border-transparent p-3 text-sm file:border-0 file:bg-transparent file:sm-text file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
          className
        )}
        ref={ref}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
