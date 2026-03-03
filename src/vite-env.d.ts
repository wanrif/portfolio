/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const meta: Record<string, unknown> | undefined;

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
