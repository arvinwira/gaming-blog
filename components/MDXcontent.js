'use client';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export function MDXContent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component />;
}