'use client';

import React, { ReactNode } from 'react';
import * as RadixUITooltip from '@radix-ui/react-tooltip';

type Props = {
  message: string;
  children: ReactNode;
};

const Tooltip = ({ message, children }: Props) => {
  return (
    <RadixUITooltip.Provider>
      <RadixUITooltip.Root>
        <RadixUITooltip.Trigger asChild>{children}</RadixUITooltip.Trigger>
        <RadixUITooltip.Portal>
          {message.length < 30 ? null : (
            <RadixUITooltip.Content
              className='rounded-md px-2 py-3 text-neutral-900 bg-white drop-shadow-md select-none transition-all'
              sideOffset={5}>
              {message}
              <RadixUITooltip.Arrow className='fill-white' />
            </RadixUITooltip.Content>
          )}
        </RadixUITooltip.Portal>
      </RadixUITooltip.Root>
    </RadixUITooltip.Provider>
  );
};

export default Tooltip;
