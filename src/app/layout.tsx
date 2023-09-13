'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@api/config';
import { store, StoreContext } from '@stores/store';

import { Container, CssBaseline } from '@mui/material';

import RootLayoutHeader from '@components/root-layout-header';
import ErrorHandler from '@components/error-handler';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <StoreContext.Provider value={store}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />

            <RootLayoutHeader />

            <Container sx={{ my: '5rem' }}>
              {children}

              <ErrorHandler />
            </Container>
          </QueryClientProvider>
        </StoreContext.Provider>
      </body>
    </html>
  );
}
