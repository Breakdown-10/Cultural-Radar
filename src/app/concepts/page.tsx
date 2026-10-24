'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCultureRadar } from '@/lib/store';
import { ConceptCard } from '@/components/concept-card';
import { BaselineComparison } from '@/components/baseline-comparison';
import { EventConcept } from '@/lib/schemas/concept';
import { Sparkles, Layers, Scale, Loader2 } from 'lucide-react';

interface BaselinePayload {
  concept: EventConcept;
  critique: {
    lackOfCulturalAffinity: string;
    genericAssumptions: string[];
    missedOpportunities: string[];
  };
}

export default function ConceptComparisonPage() {
  const router = useRouter();
  const { brief, concepts, evidence, selectedConcept, setSelectedConcept, setInspectedEvidence } =
    useCultureRadar();

  const [showBaseline, setShowBaseline] = useState(false);
  const [baselineData, setBaselineData] = useState<BaselinePayload | null>(null);
  const [isLoadingBaseline, setIsLoadingBaseline] = useState(false);

  useEffect(() => {
    // If no concepts exist (e.g. user navigated directly), redirect to research
    if (concepts.length === 0) {
      router.push('/research');
    }
  }, [concepts, router]);

  const handleSelectConcept = (concept: EventConcept) => {
    setSelectedConcept(concept);
    router.push(`/strategy/${concept.id}`);
  };

  const handleInspectEvidence = (evidenceId: string) => {
    const found = evidence.find((e) => e.id === evidenceId);
    if (found) {
      setInspectedEvidence(found);
    }
  };

  const handleToggleBaseline = async () => {
    if (!showBaseline && !baselineData) {
      setIsLoadingBaseline(true);
      try {
        const res = await fetch('/api/agent/baseline', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(brief)
        });
        if (res.ok) {
          const data = await res.json();
          setBaselineData(data.baseline);
        }
      } catch (err) {
        console.error('Failed to load baseline:', err);
      } finally {
        setIsLoadingBaseline(false);
      }
    }
    setShowBaseline(!showBaseline);
  };

  if (concepts.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-3 py-0.5 text-xs font-mono text-amber-200/90 mb-2.5">
            <Layers className="h-3 w-3 text-amber-400" />
            <span>TRI-CONCEPT CREATIVE SYNTHESIS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">Curated Event Directions</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans">
            Three differentiated creative concepts grounded in Qloo cultural affinities for &quot;{brief.name}&quot;.
          </p>
        </div>

        {/* Baseline Comparison Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isLoadingBaseline}
            onClick={handleToggleBaseline}
            className={`flex items-center gap-2.5 rounded-xl border px-5 py-2.5 text-xs font-mono transition-all ${
              showBaseline
                ? 'border-amber-400/40 bg-amber-400/10 text-amber-200 ring-1 ring-amber-400/30'
                : 'border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:border-white/[0.25] hover:text-white'
            }`}
          >
            {isLoadingBaseline ? (
              <Loader2 className="h-3.5 w-3.5 text-amber-400 animate-spin" />
            ) : (
              <Scale className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>
              {isLoadingBaseline
                ? 'COMPUTING BASELINE...'
                : showBaseline
                ? 'HIDE BASELINE COMPARISON'
                : 'COMPARE VS. GENERIC LLM'}
            </span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Baseline Comparison View (If Toggled) */}
      {showBaseline && baselineData && (
        <div className="mt-8 animate-in fade-in duration-300">
          <BaselineComparison
            baselineConcept={baselineData.concept}
            qlooConcept={concepts[0]}
            critique={baselineData.critique}
          />
        </div>
      )}

      {/* Tri-Concept Grid */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Select a direction to generate comprehensive strategy & production plan
          </h2>
          <span className="text-xs text-amber-200/90 font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06]">
            Total Spend Target: ${brief.totalBudget.toLocaleString('en-US')} {brief.currency}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              currency={brief.currency}
              isSelected={selectedConcept?.id === concept.id}
              onSelect={handleSelectConcept}
              onInspectEvidence={handleInspectEvidence}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
