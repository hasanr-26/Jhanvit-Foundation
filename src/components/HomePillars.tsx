'use client';

import React from 'react';
import PillarTabs from './PillarTabs';
import { usePageContent } from '@/lib/pageContent';

export default function HomePillars() {
  const { home } = usePageContent();
  return (
    <PillarTabs pillars={home.pillars} heading={home.pillarsHeading} intro={home.pillarsIntro} />
  );
}
