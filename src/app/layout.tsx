"use client";

import React from "react";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@api/config";

import { AppBar, Container, CssBaseline, IconButton, Toolbar, Typography } from "@mui/material";
import GitBranch from "@assets/icons/GitBranch";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <QueryClientProvider client={ queryClient }>
          <CssBaseline />

          <AppBar position="static" color="primary" enableColorOnDark>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" sx={ { mr: 2 } }>
                <GitBranch />
              </IconButton>

              <Typography variant="h6" noWrap component="div" sx={ { flexGrow: 1 } }>
                Almosafer
              </Typography>
            </Toolbar>
          </AppBar>

          <Container sx={ { my: "5rem" } }>
            { children }
          </Container>
        </QueryClientProvider>
      </body>
    </html>
  );
}
