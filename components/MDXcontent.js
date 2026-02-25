'use client';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import ProsCons from './mdx/ProsCons';
import PriceBadge from './mdx/PriceBadge';
import AffiliateButton from './mdx/AffiliateButton';

const components = {
  ProsCons,
  PriceBadge,
  AffiliateButton,
};

export function MDXContent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}