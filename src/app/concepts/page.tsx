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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[#1f2433]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 mb-2">
            <Layers className="h-3 w-3" />
            <span>Tri-Concept Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Event Concept Options</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Three differentiated creative directions grounded in Qloo cultural affinities for &quot;{brief.name}&quot;.
          </p>
        </div>

        {/* Baseline Comparison Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isLoadingBaseline}
            onClick={handleToggleBaseline}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all ${
              showBaseline
                ? 'border-indigo-500 bg-indigo-600/20 text-white ring-1 ring-indigo-500'
                : 'border-[#272d3f] bg-[#121520] text-slate-300 hover:border-slate-500 hover:text-white'
            }`}
          >
            {isLoadingBaseline ? (
              <Loader2 className="h-4 w-4 text-indigo-400 animate-spin" />
            ) : (
              <Scale className="h-4 w-4 text-indigo-400" />
            )}
            <span>
              {isLoadingBaseline
                ? 'Generating Baseline...'
                : showBaseline
                ? 'Hide Baseline Compare'
                : 'Compare with Generic LLM'}
            </span>
          </button>
        </div>
      </div>

      {/* Side-by-Side Baseline Comparison View (If Toggled) */}
      {showBaseline && baselineData && (
        <div className="mt-8 animate-in fade-in">
          <BaselineComparison
            baselineConcept={baselineData.concept}
            qlooConcept={concepts[0]}
            critique={baselineData.critique}
          />
        </div>
      )}

      {/* Tri-Concept Grid */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Select a Concept to Generate the Comprehensive Event Strategy
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            Total Budget: ${brief.totalBudget.toLocaleString()} {brief.currency}
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
