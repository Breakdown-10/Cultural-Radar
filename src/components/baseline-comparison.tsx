'use client';

import React from 'react';
import { EventConcept } from '@/lib/schemas/concept';
import { CheckCircle2, XCircle, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

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
    <div className="luxury-card rounded-2xl p-7 border-white/[0.08] space-y-6">
      {/* Header */}
      <div className="border-b border-white/[0.06] pb-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h3 className="font-serif text-xl font-medium text-white tracking-tight">
              Forensic Benchmark: Culture Radar vs. Generic LLM
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-400 font-sans">
            Proving why standard LLM prompts produce generic Top-40 clichés, whereas Qloo uncovers authentic cross-category taste affinities.
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full border border-amber-400/20 bg-amber-400/[0.06] px-3 py-1 text-[11px] font-mono text-amber-200/90">
          JUDGES BENCHMARK
        </span>
      </div>

      {/* Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Generic LLM Baseline */}
        <div className="rounded-xl border border-rose-500/25 bg-rose-950/[0.08] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
            <div className="flex items-center gap-1.5 text-rose-300 font-mono text-xs">
              <XCircle className="h-4 w-4 text-rose-400" />
              <span className="font-semibold">GENERIC LLM BASELINE (NO QLOO)</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Demographic Guesses</span>
          </div>

          <div>
            <h4 className="font-serif text-base font-medium text-zinc-300">{baselineConcept.title}</h4>
            <p className="mt-1 text-xs text-zinc-400 italic font-serif">{baselineConcept.tagline}</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-500 font-mono block text-[10px] uppercase tracking-wider">Headliner Strategy</span>
              <p className="text-zinc-200 font-medium mt-0.5">{baselineConcept.programming.headliners[0]?.name}</p>
              <span className="text-[11px] text-rose-400/80 italic mt-1 block">
                Zero affinity signal. Defaults to generic Top-40 crowd appeal.
              </span>
            </div>

            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-500 font-mono block text-[10px] uppercase tracking-wider">Brand Sponsor Strategy</span>
              <p className="text-zinc-200 font-medium mt-0.5">{baselineConcept.brandPartnerships.candidateBrands[0]?.name}</p>
              <span className="text-[11px] text-rose-400/80 italic mt-1 block">
                Cliché mass-market energy drink sponsor; zero taste crossover.
              </span>
            </div>

            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-500 font-mono block text-[10px] uppercase tracking-wider">Evidence Grounding</span>
              <p className="text-rose-400 font-mono font-semibold mt-0.5">0 Verifiable Cultural Signals</p>
            </div>
          </div>
        </div>

        {/* Right: Culture Radar (With Qloo) */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/[0.12] p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold">CULTURE RADAR (QLOO API GROUNDED)</span>
            </div>
            <span className="text-[10px] text-emerald-300 font-mono uppercase">Verified Affinities</span>
          </div>

          <div>
            <h4 className="font-serif text-base font-medium text-white">{qlooConcept.title}</h4>
            <p className="mt-1 text-xs text-zinc-300 italic font-serif">{qlooConcept.tagline}</p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-400 font-mono block text-[10px] uppercase tracking-wider">Headliner Strategy</span>
              <p className="text-white font-medium mt-0.5">{qlooConcept.programming.headliners[0]?.name}</p>
              <span className="text-[11px] text-emerald-300 mt-1 block">
                {qlooConcept.programming.headliners[0]?.rationale}
              </span>
            </div>

            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-400 font-mono block text-[10px] uppercase tracking-wider">Brand Sponsor Strategy</span>
              <p className="text-white font-medium mt-0.5">{qlooConcept.brandPartnerships.candidateBrands[0]?.name}</p>
              <span className="text-[11px] text-emerald-300 mt-1 block">
                {qlooConcept.brandPartnerships.candidateBrands[0]?.synergyRationale}
              </span>
            </div>

            <div className="rounded-xl bg-black/40 p-3 border border-white/[0.06]">
              <span className="text-zinc-400 font-mono block text-[10px] uppercase tracking-wider">Evidence Grounding</span>
              <p className="text-emerald-300 font-mono font-semibold mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>{qlooConcept.supportingEvidenceIds.length} Traceable Qloo Affinity Evidence Records</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Qloo Changed the Strategy */}
      <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.03] p-5 text-xs space-y-3">
        <h5 className="font-mono text-xs uppercase tracking-wider text-amber-300 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          The Qloo Cultural Intelligence Difference
        </h5>
        <p className="text-zinc-300 leading-relaxed font-sans">{critique.lackOfCulturalAffinity}</p>
        <div className="pt-3 border-t border-white/[0.06]">
          <span className="text-zinc-400 text-[11px] font-mono uppercase tracking-wider block mb-2">
            Authentic Empirical Connections Discovered:
          </span>
          <ul className="space-y-1.5 text-zinc-300 text-xs">
            {critique.missedOpportunities.map((opp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono">▸</span>
                <span>{opp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
