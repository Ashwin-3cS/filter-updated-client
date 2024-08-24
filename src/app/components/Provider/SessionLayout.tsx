// File: /src/app/SessionLayout.tsx

'use client'; // This file is a client component

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export default function SessionLayout({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
