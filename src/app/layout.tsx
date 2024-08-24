// File: /src/app/layout.tsx

import { ReactNode } from 'react';
import SessionLayout from '@/src/app/components/Provider/SessionLayout'; // Importing the client component
import '../styles/globals.css'
import Navbar from './components/Navbar/Navbar';

export const metadata = {
  title: 'Filter',
  description: 'Filter Client',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionLayout>
          <Navbar/>
          {children}
        </SessionLayout>
      </body>
    </html>
  );
}
