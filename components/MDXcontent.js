'use client';
import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import ProsCons from './mdx/ProsCons';
import AffiliateButton from './mdx/AffiliateButton';
import KeyHighlights from './mdx/KeyHighlights';
import InternalLink from './mdx/InternalLink';
import QuickGuide from './mdx/QuickGuide';
import AdUnit from './AdUnit';
import MultiplexAd from './MultiplexAd';

const components = {
  ProsCons,
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