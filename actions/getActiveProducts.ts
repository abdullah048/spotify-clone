import { ProductWithPrice, Song } from '@/typings';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
  const supabaseServerClient = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabaseServerClient
    .from('products')
    .select('*, prices(*)')
    .match({ active: true, 'prices.active': true })
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log('Error: =>', error);
  }

  return data || [];
};

export default getActiveProductsWithPrices;
