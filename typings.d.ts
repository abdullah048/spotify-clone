import Stripe from 'stripe';

export type Song = {
  id: string;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
};

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description: string | null;
  image?: string;
  metadata?: Stripe.Metadata;
}

interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string | null;
  unit_amount?: number | null;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

type StripeCustomer = { metadata: { supabaseUUID: string }; email?: string };

type ProductWithPrice = Product & {
  prices?: Price[];
};
