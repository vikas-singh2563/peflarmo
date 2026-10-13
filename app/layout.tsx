import type {Metadata} from 'next';
import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'Peflarmo - Find Your Perfect Stay | PG, Flat, Room & Hostel in India',
  description:
    'Discover and book verified PGs, Flats, Rooms, and Hostels in Delhi and top Indian cities with Peflarmo. Seamless accommodation search, transparent pricing, and instant booking.',
  openGraph: {
    title: 'Peflarmo - Find Your Perfect Stay',
    description:
      'Discover and book verified PGs, Flats, Rooms, and Hostels in Delhi and top Indian cities with Peflarmo. Seamless accommodation search, transparent pricing, and instant booking.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peflarmo - Find Your Perfect Stay',
    description:
      'Discover and book verified PGs, Flats, Rooms, and Hostels in Delhi and top Indian cities with Peflarmo.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-white text-slate-900 antialiased font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
