'use client';

import AuthModal from '@/components/AuthModal';
import SubscriptionModal from '@/components/SubscriptionModal';
import UploadModal from '@/components/UploadModal';
import { ProductWithPrice } from '@/typings';
import { useEffect, useState } from 'react';

type Props = {
  products: ProductWithPrice[];
};

const ModalProvider = ({ products }: Props) => {
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
      <SubscriptionModal products={products} />
    </>
  );
};

export default ModalProvider;
