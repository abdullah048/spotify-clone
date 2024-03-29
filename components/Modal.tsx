import { ReactNode } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

type Props = {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
};

const Modal = ({ isOpen, onChange, title, description, children }: Props) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-neutral-900/90 backdrop-blur-sm fixed inset-0' />
        <Dialog.Content
          className='fixed
          overflow-y-auto
          drop-shadow-md
          border border-neutral-700
          top-[50%] left-[50%] 
          max-h-full 
          h-full 
          xs:h-auto 
          xs:max-h-[89vh]
          w-full xs:w-[90vw]
          xs:max-w-[450px] 
          translate-x-[-50%]
          translate-y-[-50%]
          rounded-md
        bg-neutral-800
          px-[25px]
          pt-[25px]
          focus:outline-none'>
          <Dialog.Title
            className='
            text-xl
            text-center
            font-bold
            mb-4
           '>
            {title}
          </Dialog.Title>
          <Dialog.Description
            className='
           mb-5
           text-sm
           leading-normal
           text-center
           '>
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild>
            <button
              className='
             text-neutral-400
             hover:text-white
             absolute
             top-[10px]
             right-[10px]
             inline-flex
             h-[25px]
             w-[25px]
             appearance-none
             items-center
             justify-center
             rounded-full
             focus:outline-none
             '>
              <IoMdClose className='' />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
