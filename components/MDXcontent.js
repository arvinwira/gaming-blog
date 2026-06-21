'use client';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import ProsCons from './mdx/ProsCons';
import PriceBadge from './mdx/PriceBadge';
import AffiliateButton from './mdx/AffiliateButton';
import KeyHighlights from './mdx/KeyHighlights';
import InternalLink from './mdx/InternalLink';
import QuickGuide from './mdx/QuickGuide';
import AdUnit from './AdUnit';
import MultiplexAd from './MultiplexAd';

const components = {
  ProsCons,
  PriceBadge,
  AffiliateButton,
  KeyHighlights,
  InternalLink,
  QuickGuide,
  AdUnit,
  MultiplexAd,
};

export function MDXContent({ code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  return <Component components={components} />;
}