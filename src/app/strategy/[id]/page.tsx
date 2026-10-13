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
  Check
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
        setRefineFeedback(`Updated strategy: ${data.changesApplied.instruction}`);
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
    a.download = `culture-radar-strategy-${brief.id}.json`;
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
        <div>
          <Compass className="mx-auto h-8 w-8 text-indigo-400 animate-spin mb-3" />
          <h2 className="text-base font-bold text-white">Synthesizing Strategy Dashboard...</h2>
          <p className="text-xs text-slate-400 mt-1">Grounding recommendations in verified cultural evidence.</p>
        </div>
      </div>
    );
  }

  const concept = strategyReport.concept;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-10">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-[#1f2433]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300 mb-2">
            <ShieldCheck className="h-3 w-3" />
            <span>Qloo Evidence-Backed Strategy</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{concept.title}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            {brief.name} • {brief.location.city}, {brief.location.country} • {brief.estimatedAttendance.toLocaleString('en-US')} Guests
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>Share Link</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-all"
          >
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-all"
          >
            <Printer className="h-3.5 w-3.5 text-purple-400" />
            <span>Print to PDF</span>
          </button>
        </div>
      </div>

      {/* Conversational Refinement Bar */}
      <div className="no-print rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 to-purple-950/20 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Interactive Strategy Refinement</h3>
          </div>
          <span className="text-[11px] text-slate-400">Deterministic auto-rebalancing</span>
        </div>

        <form onSubmit={handleRefine} className="flex gap-2">
          <input
            type="text"
            value={refineInput}
            onChange={(e) => setRefineInput(e.target.value)}
            placeholder="e.g. 'Reduce budget by 20%', 'Shift focus to live music', 'Remove luxury sponsors'..."
            className="flex-1 rounded-lg border border-[#272d3f] bg-[#090a0f] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isRefining}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors disabled:opacity-50"
          >
            {isRefining ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
            <span>Refine</span>
          </button>
        </form>

        {refineFeedback && (
          <p className="text-xs text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            {refineFeedback}
          </p>
        )}

        {/* Quick Refinement Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
          <span>Try:</span>
          {['Reduce budget by 15%', 'Shift focus to live music', 'Focus on design & spatial art', 'Remove luxury brand partners'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setRefineInput(preset)}
              className="rounded bg-[#121520] px-2 py-0.5 text-slate-300 hover:text-white border border-[#272d3f]"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Summary & Creative Positioning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-4 print-card">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Executive Summary</h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
            {strategyReport.executiveSummary}
          </p>
          <div className="pt-3 border-t border-[#1f2433]">
            <span className="text-[11px] uppercase font-bold text-indigo-400 block mb-1">Positioning Thesis</span>
            <p className="text-xs text-slate-300 italic">{strategyReport.positioningStatement}</p>
          </div>
        </div>

        {/* Audience Fit Profile */}
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-4 print-card">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Audience Alignment</h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Demographic Focus</span>
              <p className="text-slate-200 font-medium mt-0.5">{brief.targetAudience.demographicSummary}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Atmosphere & Vibe</span>
              <p className="text-slate-200 font-medium mt-0.5">{brief.targetAudience.vibeOrAtmosphere}</p>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Core Lifestyle Crossovers</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {brief.targetAudience.interests.map((int, i) => (
                  <span key={i} className="rounded bg-[#121520] px-2 py-0.5 text-[10px] text-slate-300 border border-[#272d3f]">
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
        <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#1f2433] pb-3">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          Experiential Programming & Evidence Registry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Headliners & Music */}
          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 space-y-4 print-card">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Music className="h-4 w-4" />
              <span>Headliners & Performers</span>
            </div>
            <div className="space-y-3 text-xs">
              {concept.programming.headliners.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-[#121520] p-3 border border-[#1f2433]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{item.name}</span>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300 hover:bg-indigo-500/30"
                      >
                        Qloo Evidence
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-slate-300 text-xs">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gastronomy & F&B Places */}
          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 space-y-4 print-card">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <MapPin className="h-4 w-4" />
              <span>Culinary & Craft F&B</span>
            </div>
            <p className="text-xs text-slate-400 italic">{concept.foodAndLifestyle.fnbDirection}</p>
            <div className="space-y-3 text-xs">
              {concept.foodAndLifestyle.candidateVendors.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-[#121520] p-3 border border-[#1f2433]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{item.name}</span>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/30"
                      >
                        Qloo Evidence
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-slate-300 text-xs">{item.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Brand Partnerships */}
          <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 space-y-4 print-card">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
              <Tag className="h-4 w-4" />
              <span>Brand Collaborators</span>
            </div>
            <div className="space-y-3 text-xs">
              {concept.brandPartnerships.candidateBrands.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-[#121520] p-3 border border-[#1f2433]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white text-sm block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                    {item.evidenceIds[0] && (
                      <button
                        type="button"
                        onClick={() => {
                          const ev = strategyReport.evidenceRegistry[item.evidenceIds[0]];
                          if (ev) setInspectedEvidence(ev);
                        }}
                        className="rounded bg-pink-500/20 px-1.5 py-0.5 text-[10px] font-medium text-pink-300 hover:bg-pink-500/30"
                      >
                        Qloo Evidence
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-slate-300 text-xs">{item.synergyRationale}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4-Phase Production Timeline */}
      <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-5 print-card">
        <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1f2433] pb-3">
          <Calendar className="h-4 w-4 text-indigo-400" />
          Production Milestones & Roadmap
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {strategyReport.productionTimeline.map((p, idx) => (
            <div key={idx} className="rounded-lg bg-[#121520] p-4 border border-[#1f2433] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-indigo-400 font-bold">
                  {p.timelineOffsetWeeks === 0 ? 'Event Week' : `${p.timelineOffsetWeeks}w`}
                </span>
                <Clock className="h-3.5 w-3.5 text-slate-500" />
              </div>
              <h4 className="font-bold text-white">{p.milestone}</h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                {p.deliverables.map((del, dIdx) => (
                  <li key={dIdx}>{del}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management & Disclosed Hypotheses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-card">
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            Operational Risk Management
          </h3>
          <div className="space-y-2 text-xs">
            {strategyReport.riskManagement.map((risk, idx) => (
              <div key={idx} className="rounded-lg bg-[#121520] p-3 border border-[#1f2433]">
                <span className="font-semibold text-slate-200">{risk.risk}</span>
                <p className="mt-1 text-slate-400 text-[11px]">{risk.mitigation}</p>
                {risk.evidenceGap && (
                  <span className="mt-1.5 inline-block text-[10px] text-amber-400/90 italic">
                    * Identified as an empirical evidence gap requiring local vendor validation.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Creative Hypotheses (Disclosed AI Ideas)
          </h3>
          <p className="text-xs text-slate-400">
            Per PRD Section FR-04: Ideas not directly retrieved from Qloo are transparently labeled as creative hypotheses.
          </p>
          <div className="space-y-2 text-xs">
            {concept.creativeHypotheses.map((hyp, idx) => (
              <div key={idx} className="rounded-lg bg-[#121520] p-3 border border-[#1f2433] text-slate-300">
                • {hyp}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
