'use client';

import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title='Test Modal'
        description='Test Modal description'
        isOpen
        onChange={() => {}}>
        Test Modal children
      </Modal>
    </>
  );
};

export default ModalProvider;
