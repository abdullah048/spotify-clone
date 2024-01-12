import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

type Props = {
  showError?: any;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ disabled, placeholder, className, type, showError, ...props }, ref) => {
    const renderError = () => {
      if (showError && showError?.type === 'required') {
        return <p className='text-red-500 text-sm'>{showError?.message}</p>;
      }
    };

    return (
      <div className='flex flex-col gap-y-1'>
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
        {renderError()}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
