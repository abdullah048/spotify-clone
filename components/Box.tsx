import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box: FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={cn(`bg-neutral-900 rounded-lg h-fit w-full`, className)}>
      {children}
    </div>
  );
};

export default Box;
