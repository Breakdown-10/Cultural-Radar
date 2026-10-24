'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SAMPLE_BRIEFS } from '@/data/sample-briefs';
import { useCultureRadar } from '@/lib/store';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart3,
  Layers,
  MapPin
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { loadSampleBrief } = useCultureRadar();

  const handleLaunchPreset = (presetId: string) => {
    loadSampleBrief(presetId);
    router.push('/research');
  };

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      {/* Editorial Ambient Background Accent */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-15rem)] aspect-[1200/700] w-[45rem] -translate-x-1/2 rotate-[25deg] bg-gradient-to-tr from-amber-500/10 via-amber-200/5 to-transparent opacity-60 sm:left-[calc(50%-25rem)] sm:w-[75rem]" />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center">
        {/* Curated Hackathon Marker */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.05] px-3.5 py-1 text-xs font-mono tracking-wide text-amber-200/90 mb-8 backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>QLOO AGENTIC HACKATHON 2026 • OFFICIAL SELECTION</span>
        </div>

        {/* Master Editorial Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          Curation with <span className="italic font-serif font-light text-[#f7dfa5]">taste.</span> <br />
          Budgeting with <span className="text-zinc-400 font-serif font-light italic">proof.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-7 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto font-sans font-normal leading-relaxed">
          Culture Radar eliminates demographic stereotypes and LLM clichés—grounding live events, sensory atmospheres, and sponsor alignment in 250M+ verified Qloo cultural taste correlations.
        </p>

        {/* Action Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => handleLaunchPreset(SAMPLE_BRIEFS[0].id)}
            className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-b from-[#f7dfa5] to-[#d4af37] px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-xl shadow-amber-950/20 hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <Compass className="h-4 w-4 text-zinc-950 transition-transform duration-300 group-hover:rotate-45" />
            <span>Explore Dubai Showcase</span>
            <ArrowRight className="h-4 w-4 text-zinc-900 transition-transform group-hover:translate-x-0.5" />
          </button>

          <Link
            href="/brief"
            className="flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-md hover:border-white/[0.25] hover:bg-white/[0.06] hover:text-white transition-all"
          >
            <span>Create Custom Brief</span>
          </Link>
        </div>

        {/* Cultural Affinity Bridge Preview Strip */}
        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-white/[0.08] bg-black/40 p-4 sm:p-5 backdrop-blur-xl shadow-2xl text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                Empirical Taste Bridge • Live Sample
              </span>
            </div>
            <span className="text-[11px] font-mono text-amber-300/80">
              Qloo Cross-Category Correlation: 90%
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center sm:text-left">
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Sonic Headliner</span>
              <p className="mt-1 text-sm font-semibold text-white">Khruangbin</p>
              <span className="text-[11px] text-amber-200/70 font-mono">Thai-Funk Groove</span>
            </div>
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Brand Partner</span>
              <p className="mt-1 text-sm font-semibold text-white">Aesop</p>
              <span className="text-[11px] text-emerald-300/70 font-mono">Botanical Luxury</span>
            </div>
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Sponsor Affinity</span>
              <p className="mt-1 text-sm font-semibold text-white">Polestar</p>
              <span className="text-[11px] text-sky-300/70 font-mono">Minimalist EV</span>
            </div>
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Regional Venue</span>
              <p className="mt-1 text-sm font-semibold text-white">Alserkal Avenue</p>
              <span className="text-[11px] text-purple-300/70 font-mono">Industrial Acoustics</span>
            </div>
          </div>
        </div>

        {/* Core Value Pillars: Architectural & Grounded */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="luxury-card rounded-2xl p-7 transition-all duration-300 hover:border-amber-400/25">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 mb-5 border border-amber-400/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Pillar 01</span>
            <h3 className="mt-1.5 text-lg font-serif font-medium text-white">Empirical Taste Affinities</h3>
            <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed font-sans">
              Replaces unsubstantiated demographic assumptions with verified affinity scores across 250M+ musical artists, lifestyle brands, and culinary destinations.
            </p>
          </div>

          <div className="luxury-card rounded-2xl p-7 transition-all duration-300 hover:border-amber-400/25">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 mb-5 border border-emerald-400/20">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Pillar 02</span>
            <h3 className="mt-1.5 text-lg font-serif font-medium text-white">Controlled Agent Telemetry</h3>
            <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed font-sans">
              Autonomous 5-stage orchestration: Entity resolution, cross-category insight retrieval, evidence normalization, and tri-concept generation with real-time logs.
            </p>
          </div>

          <div className="luxury-card rounded-2xl p-7 transition-all duration-300 hover:border-amber-400/25">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300 mb-5 border border-sky-400/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Pillar 03</span>
            <h3 className="mt-1.5 text-lg font-serif font-medium text-white">Deterministic Financials</h3>
            <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed font-sans">
              Code-enforced budget balancing across 7 production pillars. Guarantees 100% exact mathematical reconciliation down to the dollar with zero AI rounding drift.
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Showcase Dossiers */}
        <div className="mt-24">
          <div className="text-left mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-amber-400" />
                <h2 className="text-2xl font-serif font-medium text-white">Curated Cultural Showcases</h2>
              </div>
              <p className="text-xs text-zinc-400 mt-1.5">
                Select any production dossier to observe the Culture Radar agent query Qloo APIs live.
              </p>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Instant 1-Click Evaluation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {SAMPLE_BRIEFS.map((sample) => (
              <div
                key={sample.id}
                className="luxury-card luxury-card-interactive group relative flex flex-col justify-between rounded-2xl p-6"
              >
                <div>
                  {/* Card Header: Location & Budget */}
                  <div className="flex items-center justify-between text-xs pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-amber-200/90 font-mono text-[11px]">
                      <MapPin className="h-3.5 w-3.5 text-amber-400" />
                      <span>{sample.location.city.toUpperCase()}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">
                      ${sample.totalBudget.toLocaleString('en-US')} USD
                    </span>
                  </div>

                  {/* Title & Audience */}
                  <h3 className="mt-4 text-lg font-serif font-medium text-white group-hover:text-amber-200 transition-colors">
                    {sample.name}
                  </h3>

                  <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {sample.targetAudience.demographicSummary}
                  </p>

                  {/* Anchor Chips */}
                  <div className="mt-5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                      Anchor Taste Signals
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sample.anchorEntities?.artists?.map((a) => (
                        <span
                          key={a}
                          className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] font-mono text-zinc-300 border border-white/[0.06]"
                        >
                          {a}
                        </span>
                      ))}
                      {sample.anchorEntities?.brands?.map((b) => (
                        <span
                          key={b}
                          className="rounded-md bg-amber-400/[0.08] px-2 py-1 text-[11px] font-mono text-amber-200/80 border border-amber-400/20"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => handleLaunchPreset(sample.id)}
                    className="w-full flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-2.5 text-xs font-semibold text-zinc-200 border border-white/[0.08] group-hover:bg-[#f7dfa5] group-hover:text-zinc-950 group-hover:border-transparent transition-all"
                  >
                    <span>Launch Investigation</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
