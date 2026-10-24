'use client';

import React, { useState, useEffect } from 'react';
import { useCultureRadar } from '@/lib/store';
import { BudgetBreakdownChart } from '@/components/budget-breakdown-chart';
import { CulturalRadarChart } from '@/components/cultural-radar-chart';
import {
  Sparkles,
  Printer,
  Calendar,
  ShieldCheck,
  Send,
  RefreshCw,
  AlertTriangle,
  Music,
  Tag,
  MapPin,
  Clock,
  Compass,
  Download,
  Share2,
  Check,
  ArrowRight
} from 'lucide-react';

export default function StrategyDashboardPage() {
  const {
    brief,
    concepts,
    evidence,
    selectedConcept,
    setSelectedConcept,
    strategyReport,
    setStrategyReport,
    setInspectedEvidence
  } = useCultureRadar();

  const [refineInput, setRefineInput] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [refineFeedback, setRefineFeedback] = useState<string | null>(null);

  // Generate strategy report if not present
  useEffect(() => {
    async function initStrategy() {
      if (!strategyReport && concepts.length > 0) {
        const concept = selectedConcept || concepts[0];
        if (!selectedConcept) setSelectedConcept(concept);

        const res = await fetch('/api/agent/generate-strategy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            brief,
            selectedConcept: concept,
            evidence
          })
        });

        if (res.ok) {
          const data = await res.json();
          setStrategyReport(data.report);
        }
      }
    }

    initStrategy();
  }, [brief, concepts, selectedConcept, strategyReport, evidence, setSelectedConcept, setStrategyReport]);

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInput.trim() || !strategyReport) return;

    setIsRefining(true);
    setRefineFeedback(null);
    try {
      const res = await fetch('/api/agent/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          report: strategyReport,
          instruction: refineInput.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setStrategyReport(data.report);
        setRefineFeedback(`Strategy recalibrated: ${data.changesApplied.instruction}`);
        setRefineInput('');
      }
    } catch (err) {
      console.error('Refinement error:', err);
    } finally {
      setIsRefining(false);
    }
  };

  const [copiedLink, setCopiedLink] = useState(false);

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    if (!strategyReport) return;
    const jsonStr = JSON.stringify(strategyReport, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cultural-radar-strategy-${brief.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!strategyReport) {
    return (
      <div className="flex h-96 items-center justify-center text-center">
        <div className="luxury-card p-10 max-w-md">
          <div className="mx-auto h-12 w-12 rounded-full border border-champagne/30 bg-champagne/5 flex items-center justify-center mb-4">
            <Compass className="h-6 w-6 text-champagne animate-spin" />
          </div>
          <h2 className="text-lg font-serif font-medium text-white tracking-wide">Synthesizing Strategy Dossier</h2>
          <p className="text-xs text-slate-400 mt-2 font-mono tracking-wider">
            GROUNDING ALLOCATION & PROGRAMMING IN VERIFIED QLOO AFFINITY SIGNALS...
          </p>
        </div>
      </div>
    );
  }

  const concept = strategyReport.concept;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Top Header & Executive Controls */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/5 px-3 py-1 text-[11px] font-mono tracking-wider text-champagne mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>QLOO EMPIRICAL STRATEGY DOSSIER</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
            {concept.title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
            {brief.name.toUpperCase()} • {brief.location.city.toUpperCase()}, {brief.location.country.toUpperCase()} • {brief.estimatedAttendance.toLocaleString('en-US')} DELEGATES
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 no-print">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-obsidian-card px-4 py-2.5 text-xs font-mono font-medium text-slate-300 hover:border-champagne/40 hover:text-white transition-all shadow-sm"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-champagne" />
                <span>Share Brief</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-obsidian-card px-4 py-2.5 text-xs font-mono font-medium text-slate-300 hover:border-champagne/40 hover:text-white transition-all shadow-sm"
          >
            <Download className="h-3.5 w-3.5 text-champagne" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="gold-button flex items-center gap-2 px-4 py-2.5 text-xs"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Executive Print (PDF)</span>
          </button>
        </div>
      </div>

      {/* Executive Command Bar: Conversational Refinement */}
      <div className="no-print luxury-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded-md bg-champagne/10 border border-champagne/30 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-champagne" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-medium text-white tracking-wide">Executive Strategy Recalibration</h3>
              <p className="text-[11px] text-slate-400 font-mono">Real-time programmatic and financial reallocation</p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono text-champagne/70 border border-champagne/20 bg-champagne/5 rounded px-2 py-0.5">
            ⌘K Dynamic Agent
          </span>
        </div>

        <form onSubmit={handleRefine} className="flex gap-2.5">
          <input
            type="text"
            value={refineInput}
            onChange={(e) => setRefineInput(e.target.value)}
            placeholder="Instruct agent: 'Reduce overall budget by 15%', 'Pivot gastronomy towards sustainable seafood'..."
            className="flex-1 rounded-lg border border-white/[0.1] bg-obsidian-base px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-champagne/50 focus:outline-none focus:ring-1 focus:ring-champagne/30 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={isRefining}
            className="gold-button flex items-center gap-2 px-5 py-2.5 text-xs disabled:opacity-50"
          >
            {isRefining ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            <span>Recalibrate</span>
          </button>
        </form>

        {refineFeedback && (
          <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-300 flex items-center gap-2 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{refineFeedback}</span>
          </div>
        )}

        {/* Curation Quick Refinement Prompts */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span className="font-mono text-champagne/70">Preset Prompts:</span>
          {[
            'Reallocate 15% from Production to Headliners',
            'Pivot gastronomy toward zero-waste experiential dining',
            'Emphasize niche spatial sound architecture',
            'Eliminate corporate commercial sponsors'
          ].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setRefineInput(preset)}
              className="rounded-full bg-white/[0.03] hover:bg-champagne/10 px-3 py-1 text-slate-300 hover:text-champagne border border-white/[0.08] hover:border-champagne/30 transition-colors text-[11px]"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Summary & Creative Positioning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 luxury-card p-7 space-y-5 print-card">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-champagne">
              Executive Briefing & Curation Rationale
            </h2>
            <span className="text-[10px] font-mono text-slate-400">CONFIDENTIAL DOSSIER</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-light">
            {strategyReport.executiveSummary}
          </p>
          <div className="pt-4 border-t border-white/[0.08] space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-champagne block">
              Core Positioning Thesis
            </span>
            <p className="text-sm font-serif italic text-slate-200">
              &ldquo;{strategyReport.positioningStatement}&rdquo;
            </p>
          </div>
        </div>

        {/* Audience Fit Profile */}
        <div className="luxury-card p-7 space-y-5 print-card">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-champagne">
              Audience Alignment
            </h2>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-4 text-xs font-sans">
            <div>
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Demographic Profile</span>
              <p className="text-slate-200 font-medium mt-1">{brief.targetAudience.demographicSummary}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider">Target Atmosphere</span>
              <p className="text-slate-200 font-medium mt-1">{brief.targetAudience.vibeOrAtmosphere}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono uppercase tracking-wider mb-2">Cross-Category Signals</span>
              <div className="flex flex-wrap gap-1.5">
                {brief.targetAudience.interests.map((int, i) => (
                  <span key={i} className="rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] text-slate-300 border border-white/[0.08]">
                    {int}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics: Budget Donut + Cultural Radar Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-card">
        <BudgetBreakdownChart
          allocation={concept.budgetAllocation}
          currency={brief.currency}
        />
        <CulturalRadarChart />
      </div>

      {/* Programmatic Pillars: Entertainment, Gastronomy, Brand Partnerships */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-champagne" />
            </div>
            <h2 className="text-xl font-serif font-normal text-white tracking-wide">
              Experiential Programming & Evidence Registry
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">3 VERIFIED CULTURAL PILLARS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Headliners & Music */}
          <div className="luxury-card p-6 space-y-4 print-card">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-champagne font-mono text-xs tracking-wider uppercase">
                <Music className="h-4 w-4" />
                <span>Headliners & Sound</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{concept.programming.headliners.length} Curated</span>
            </div>
            <div className="space-y-3.5 text-xs">
              {concept.programming.headliners.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-obsidian-base p-4 border border-white/[0.06] hover:border-champagne/30 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-white">{item.name}</span>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded-full bg-champagne/10 px-2 py-0.5 text-[10px] font-mono text-champagne hover:bg-champagne/20 border border-champagne/30 transition-colors"
                      >
                        Qloo Affinity
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gastronomy & F&B Places */}
          <div className="luxury-card p-6 space-y-4 print-card">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-wider uppercase">
                <MapPin className="h-4 w-4" />
                <span>Culinary & Craft F&B</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{concept.foodAndLifestyle.candidateVendors.length} Curated</span>
            </div>
            <p className="text-xs text-slate-400 font-serif italic">{concept.foodAndLifestyle.fnbDirection}</p>
            <div className="space-y-3.5 text-xs">
              {concept.foodAndLifestyle.candidateVendors.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-obsidian-base p-4 border border-white/[0.06] hover:border-emerald-500/30 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-medium text-white">{item.name}</span>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                      >
                        Qloo Affinity
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Partnerships */}
          <div className="luxury-card p-6 space-y-4 print-card">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2 text-warmcoral font-mono text-xs tracking-wider uppercase">
                <Tag className="h-4 w-4" />
                <span>Brand Collaborators</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{concept.brandPartnerships.candidateBrands.length} Curated</span>
            </div>
            <div className="space-y-3.5 text-xs">
              {concept.brandPartnerships.candidateBrands.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-obsidian-base p-4 border border-white/[0.06] hover:border-warmcoral/30 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-sm font-medium text-white block">{item.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.category}</span>
                    </div>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded-full bg-warmcoral/10 px-2 py-0.5 text-[10px] font-mono text-warmcoral hover:bg-warmcoral/20 border border-warmcoral/30 transition-colors"
                      >
                        Qloo Affinity
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">{item.synergyRationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4-Phase Production Timeline */}
      <div className="luxury-card p-8 space-y-6 print-card">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-champagne" />
            </div>
            <h2 className="text-xl font-serif font-normal text-white tracking-wide">
              Production Milestones & Roadmap
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">4 STRATEGIC PHASES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {strategyReport.productionTimeline.map((p, idx) => (
            <div key={idx} className="rounded-lg bg-obsidian-base p-5 border border-white/[0.06] hover:border-champagne/30 transition-all space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                <span className="font-mono text-champagne font-bold text-xs tracking-wider">
                  {p.timelineOffsetWeeks === 0 ? 'EVENT LAUNCH' : `T - ${p.timelineOffsetWeeks} WEEKS`}
                </span>
                <Clock className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <h4 className="font-serif font-medium text-white text-sm">{p.milestone}</h4>
              <ul className="space-y-1.5 text-slate-400 text-xs font-sans">
                {p.deliverables.map((del, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-1.5">
                    <span className="text-champagne/60 mt-1">•</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management & Disclosed Hypotheses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-card">
        <div className="luxury-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-serif font-medium text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Operational Risk Registry
            </h3>
            <span className="text-[10px] font-mono text-amber-400/80">PRE-EMPTIVE MITIGATION</span>
          </div>
          <div className="space-y-3 text-xs">
            {strategyReport.riskManagement.map((risk, idx) => (
              <div key={idx} className="rounded-lg bg-obsidian-base p-4 border border-white/[0.06] space-y-1.5">
                <span className="font-serif font-medium text-slate-200 text-sm block">{risk.risk}</span>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">{risk.mitigation}</p>
                {risk.evidenceGap && (
                  <span className="mt-1 inline-block text-[10px] font-mono text-amber-400/90">
                    * Identified empirical gap requiring regional vendor confirmation.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <h3 className="text-sm font-serif font-medium text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Creative Hypotheses (Disclosed AI Ideas)
            </h3>
            <span className="text-[10px] font-mono text-emerald-400/80">HONEST TRANSPARENCY</span>
          </div>
          <p className="text-xs text-slate-400 font-sans">
            Per PRD Section FR-04: Concepts not directly queried from Qloo APIs are transparently disclosed to ensure institutional integrity.
          </p>
          <div className="space-y-2.5 text-xs">
            {concept.creativeHypotheses.map((hyp, idx) => (
              <div key={idx} className="rounded-lg bg-obsidian-base p-3.5 border border-white/[0.06] text-slate-300 font-sans flex items-start gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-champagne shrink-0 mt-0.5" />
                <span>{hyp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

