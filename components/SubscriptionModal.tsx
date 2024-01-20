'use client';

import useSubscriptionModal from '@/hooks/useSubscriptionModalStore';
import Modal from './Modal';
import { Price, ProductWithPrice } from '@/typings';
import Button from './Button';
import { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { postData } from '@/lib/helpers';
import { getStripe } from '@/lib/stripeClient';

type Props = {
  products: ProductWithPrice[];
};

const SubscriptionModal = ({ products }: Props) => {
  const [priceIdLoading, setPriceIdLoading] = useState<string | null>(null);

  const subscriptionModal = useSubscriptionModal();
  const { user, isLoading, subscription } = useUser();

  const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount ?? 0) / 100);
    return priceString;
  };

  const handleOnChange = (open: boolean) => {
    if (!open) {
      subscriptionModal.onClose();
    }
  };

  const handleCheckout = async (price: Price) => {
    try {
      setPriceIdLoading(price.id);

      if (!user) {
        setPriceIdLoading(null);
        return toast.error('Must be logged in.');
      }

      if (subscription) {
        setPriceIdLoading(null);
        return toast('Already subscribed.');
      }

      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      });

      const stripe = await getStripe();

      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setPriceIdLoading(null);
    }
  };

  let content = () => {
    if (products.length === 0) {
      return (
        <div className='text-center text-neutral-400 pb-[25px]'>
          No products available.
        </div>
      );
    } else {
      return (
        <div className='pb-[25px]'>
          {products.map(product => {
            if (product.prices?.length === 0) {
              return <div key={product.id}>No prices available.</div>;
            }
            return product.prices?.map(price => (
              <div
                key={price.id}
                className='flex flex-col gap-y-4 items-center'>
                <Button
                  className='w-full sm:w-[60%]'
                  onClick={() => handleCheckout(price)}
                  disabled={
                    isLoading || price.id === priceIdLoading
                  }>{`Subscribe for ${formatPrice(price)} a ${
                  price.interval
                }`}</Button>
              </div>
            ));
          })}
        </div>
      );
    }
  };

  if (subscription) {
    content = () => {
      return (
        <div className='text-center text-neutral-400 pb-[25px]'>
          Already Subscribed.
        </div>
      );
    };
  }

  return (
    <Modal
      title='Only for premium users'
      description='Listen to music with Spotify Premium'
      isOpen={subscriptionModal.isOpen}
      onChange={handleOnChange}>
      {content()}
    </Modal>
  );
};

export default SubscriptionModal;
