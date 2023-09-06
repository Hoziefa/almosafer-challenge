import React from "react";
import { NextRouter } from "next/router";
import { RouterContext } from "next/dist/shared/lib/router-context";

export function createMockRouter(router: Partial<NextRouter> = {}): NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    forward(): void {},
    ...router,
  };
}

export const MockRouterWrapper = ({
  children,
  router,
}: React.PropsWithChildren & { router: Partial<NextRouter> }) => {
  return (
    <RouterContext.Provider value={createMockRouter(router)}>
      {children}
    </RouterContext.Provider>
  );
};
