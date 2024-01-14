import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import '@/app/globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProviders from '@/providers/SupabaseProviders';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getSongByUserID from '@/actions/getSongByUserID';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongByUserID();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />

        <SupabaseProviders>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProviders>
      </body>
    </html>
  );
}
