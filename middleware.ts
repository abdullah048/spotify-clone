import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const supabaseClient = createMiddlewareClient({
    req,
    res,
  });

  await supabaseClient.auth.getSession();
  return res;
};
