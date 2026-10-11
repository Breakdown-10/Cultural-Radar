'use client';

import React from 'react';
import { EventConcept } from '@/lib/schemas/concept';
import { CheckCircle2, XCircle, Sparkles, AlertTriangle } from 'lucide-react';

interface BaselineComparisonProps {
  baselineConcept: EventConcept;
  qlooConcept: EventConcept;
  critique: {
    lackOfCulturalAffinity: string;
    genericAssumptions: string[];
    missedOpportunities: string[];
  };
}

export function BaselineComparison({
  baselineConcept,
  qlooConcept,
  critique
}: BaselineComparisonProps) {
  return (
    <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-[#1f2433] pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            Technical Differentiation: Culture Radar vs. Generic LLM
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Comparing an unassisted LLM baseline against Culture Radar&apos;s Qloo cultural intelligence pipeline.
        </p>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Generic LLM Baseline */}
        <div className="rounded-lg border border-red-500/20 bg-red-950/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
            <div className="flex items-center gap-1.5 text-red-400 font-semibold text-xs">
              <XCircle className="h-4 w-4" />
              <span>Generic LLM Baseline (Without Qloo)</span>
            </div>
            <span className="text-[10px] text-slate-400">Demographic Guesses</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-200">{baselineConcept.title}</h4>
            <p className="mt-1 text-xs text-slate-400 italic">{baselineConcept.tagline}</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Headliner Strategy</span>
              <p className="text-slate-300 mt-0.5">{baselineConcept.programming.headliners[0]?.name}</p>
              <span className="text-[11px] text-red-400/80 italic mt-1 block">
                No affinity signal. Assumes generic Top-40 crowd appeal.
              </span>
            </div>

            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Brand Sponsor Strategy</span>
              <p className="text-slate-300 mt-0.5">{baselineConcept.brandPartnerships.candidateBrands[0]?.name}</p>
              <span className="text-[11px] text-red-400/80 italic mt-1 block">
                Cliché mass-market energy drink sponsor; zero taste crossover.
              </span>
            </div>

            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Evidence Grounding</span>
              <p className="text-red-400 font-semibold mt-0.5">0 Verifiable Cultural Signals</p>
            </div>
          </div>
        </div>

        {/* Right: Culture Radar (With Qloo) */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <CheckCircle2 className="h-4 w-4" />
              <span>Culture Radar (Grounded in Qloo API)</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono">Verified Affinities</span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">{qlooConcept.title}</h4>
            <p className="mt-1 text-xs text-slate-300 italic">{qlooConcept.tagline}</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Headliner Strategy</span>
              <p className="text-white font-medium mt-0.5">{qlooConcept.programming.headliners[0]?.name}</p>
              <span className="text-[11px] text-emerald-400 mt-1 block">
                {qlooConcept.programming.headliners[0]?.rationale}
              </span>
            </div>

            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Brand Sponsor Strategy</span>
              <p className="text-white font-medium mt-0.5">{qlooConcept.brandPartnerships.candidateBrands[0]?.name}</p>
              <span className="text-[11px] text-emerald-400 mt-1 block">
                {qlooConcept.brandPartnerships.candidateBrands[0]?.synergyRationale}
              </span>
            </div>

            <div className="rounded bg-[#090a0f] p-2.5 border border-[#1f2433]">
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Evidence Grounding</span>
              <p className="text-emerald-400 font-semibold mt-0.5">
                {qlooConcept.supportingEvidenceIds.length} Verified Qloo Cultural Evidence Records
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Qloo Changed the Strategy */}
      <div className="rounded-lg border border-[#1f2433] bg-[#090a0f] p-4 text-xs space-y-2">
        <h5 className="font-semibold text-indigo-300 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-indigo-400" />
          The Cultural Intelligence Difference
        </h5>
        <p className="text-slate-300 leading-relaxed">{critique.lackOfCulturalAffinity}</p>
        <div className="pt-2 border-t border-[#181c28]">
          <span className="text-slate-400 text-[11px] font-semibold block mb-1">
            Empirical Connections Discovered by Qloo:
          </span>
          <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
            {critique.missedOpportunities.map((opp, idx) => (
              <li key={idx}>{opp}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
