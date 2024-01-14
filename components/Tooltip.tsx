import React, { ReactNode } from 'react';

type Props = {
  message: string;
  children: ReactNode;
};

const Tooltip = ({ message, children }: Props) => {
  return (
    <>
      <div className='group/tooltip relative flex'>
        {children}
        <span className='absolute opacity-0 top-6 scale-0 transition-all rounded-md bg-gray-800 p-2 text-xs text-white group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100'>
          {message}
        </span>
      </div>
    </>
  );
};

export default Tooltip;
