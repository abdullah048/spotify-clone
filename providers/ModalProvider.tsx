'use client';

import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import { useEffect, useState } from 'react';

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false); // To avoid getting hydration error on load

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
