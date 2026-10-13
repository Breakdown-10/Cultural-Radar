'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SAMPLE_BRIEFS } from '@/data/sample-briefs';
import { useCultureRadar } from '@/lib/store';
import {
  Sparkles,
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
    <div className="relative isolate overflow-hidden">
      {/* Background Gradient Accents */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6366f1] to-[#10b981] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Qloo Agentic Hackathon 2026 Official Entry</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto leading-tight">
          Plan Events People <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400">Connect With</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transform audience taste profiles into evidence-grounded entertainment, sensory design, and brand partnerships with Qloo Cultural Intelligence.
        </p>

        {/* Live Evaluation Callout for Judges */}
        <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-[#121522]/90 backdrop-blur px-4 py-1.5 text-xs text-indigo-200">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hackathon Evaluation: Click &ldquo;Explore Dubai Showcase&rdquo; for the live 5-stage research loop.</span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/brief"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
          >
            <span>Build an Event Strategy</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={() => handleLaunchPreset(SAMPLE_BRIEFS[0].id)}
            className="flex items-center gap-2 rounded-lg border border-[#272d3f] bg-[#121520] px-6 py-3 text-sm font-semibold text-slate-200 hover:border-indigo-500 hover:text-white transition-all"
          >
            <Compass className="h-4 w-4 text-indigo-400" />
            <span>Explore Dubai Showcase</span>
          </button>
        </div>

        {/* Core Value Pillars */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17]/80 p-6 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Empirical Taste Affinities</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Replaces unsupported demographic guesses with verified affinity data across artists, brands, and culinary destinations.
            </p>
          </div>

          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17]/80 p-6 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 mb-4 border border-emerald-500/20">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Controlled Agent Workflow</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Multi-step orchestration: Entity resolution, cross-category insight retrieval, evidence normalization, and tri-concept generation.
            </p>
          </div>

          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17]/80 p-6 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-400 mb-4 border border-pink-500/20">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">Deterministic Budgeting</h3>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Code-enforced budget balancing across 7 production pillars. Guarantees 100% mathematical reconciliation with zero AI hallucinated math.
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Presets Showcase */}
        <div className="mt-20">
          <div className="text-left mb-6">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Interactive Showcase Briefs</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Select any curated real-world brief to watch the Culture Radar agent investigate Qloo affinities in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {SAMPLE_BRIEFS.map((sample) => (
              <div
                key={sample.id}
                className="group relative flex flex-col justify-between rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 hover:border-indigo-500/50 hover:bg-[#121522] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-[#181c28]">
                    <span className="flex items-center gap-1 font-medium text-indigo-300">
                      <MapPin className="h-3 w-3" />
                      {sample.location.city}
                    </span>
                    <span className="font-mono text-slate-300">${sample.totalBudget.toLocaleString('en-US')}</span>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {sample.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                    {sample.targetAudience.demographicSummary}
                  </p>

                  {/* Anchors preview */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {sample.anchorEntities?.artists?.map((a) => (
                      <span
                        key={a}
                        className="rounded bg-[#181c28] px-2 py-0.5 text-[10px] text-slate-300 border border-[#242b3d]"
                      >
                        {a}
                      </span>
                    ))}
                    {sample.anchorEntities?.brands?.map((b) => (
                      <span
                        key={b}
                        className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] text-indigo-300 border border-indigo-500/20"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#181c28]">
                  <button
                    onClick={() => handleLaunchPreset(sample.id)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#181c28] py-2 text-xs font-semibold text-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-all"
                  >
                    <span>Launch Agentic Research</span>
                    <ArrowRight className="h-3.5 w-3.5" />
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
