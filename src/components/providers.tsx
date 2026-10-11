'use client';

import React from 'react';
import { CultureRadarProvider, useCultureRadar } from '@/lib/store';
import { Navbar } from './navbar';
import { CulturalEvidenceDrawer } from './cultural-evidence-drawer';

function DrawerRenderer() {
  const { inspectedEvidence, setInspectedEvidence } = useCultureRadar();
  return (
    <CulturalEvidenceDrawer
      evidence={inspectedEvidence}
      onClose={() => setInspectedEvidence(null)}
    />
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CultureRadarProvider>
      <div className="flex min-h-screen flex-col bg-[#090a0f] text-slate-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <DrawerRenderer />
      </div>
    </CultureRadarProvider>
  );
}
