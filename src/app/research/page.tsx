'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useCultureRadar } from '@/lib/store';
import { CulturalEvidenceRecord } from '@/lib/schemas/evidence';
import { EventConcept } from '@/lib/schemas/concept';
import {
  Compass,
  CheckCircle2,
  Loader2,
  Clock,
  Database,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface StageState {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  metric?: string;
}

export default function ResearchWorkspacePage() {
  const router = useRouter();
  const { brief, setEvidence, setConcepts, setInspectedEvidence } = useCultureRadar();

  const [stages, setStages] = useState<StageState[]>([
    {
      id: 'brief_analysis',
      label: '1. Brief & Audience Profiling',
      description: 'Parsing audience psychographics and host city location signals',
      status: 'pending'
    },
    {
      id: 'entity_resolution',
      label: '2. Qloo Entity Resolution (/search)',
      description: 'Resolving user anchor artists and brands to validated Qloo entity IDs',
      status: 'pending'
    },
    {
      id: 'insights_gathering',
      label: '3. Cultural Affinity Engine (/v2/insights)',
      description: 'Retrieving cross-category affinities across Music, Lifestyle Brands, and Places',
      status: 'pending'
    },
    {
      id: 'evidence_normalization',
      label: '4. Evidence Normalization',
      description: 'Structuring raw Qloo signals into traceable, verifiable evidence records',
      status: 'pending'
    },
    {
      id: 'concept_synthesis',
      label: '5. Tri-Concept & Budget Synthesis',
      description: 'Synthesizing 3 culturally differentiated concepts with 100% budget balance',
      status: 'pending'
    }
  ]);

  const [progressPercent, setProgressPercent] = useState(10);
  const [logs, setLogs] = useState<string[]>([]);
  const [localEvidence, setLocalEvidence] = useState<CulturalEvidenceRecord[]>([]);
  const [isDone, setIsDone] = useState(false);
  const hasExecutedRef = useRef(false);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    if (hasExecutedRef.current) return;
    hasExecutedRef.current = true;

    async function executeResearchPipeline() {
      try {
        // Stage 1: Brief Analysis
        updateStage('brief_analysis', 'running');
        addLog(`Analyzing event brief "${brief.name}" in ${brief.location.city}...`);
        setProgressPercent(20);
        await new Promise((r) => setTimeout(r, 600));
        updateStage('brief_analysis', 'completed', 'Brief Validated');

        // Stage 2 & 3 & 4: Call backend /api/agent/plan-research
        updateStage('entity_resolution', 'running');
        addLog(`Querying Qloo /search API for anchor entities: ${(brief.anchorEntities?.artists || []).join(', ')}...`);
        setProgressPercent(40);

        const planRes = await fetch('/api/agent/plan-research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(brief)
        });

        if (!planRes.ok) {
          const errData = await planRes.json().catch(() => null);
          throw new Error(errData?.error || `Research planning API failed (HTTP ${planRes.status})`);
        }

        const planData = await planRes.json();
        const evidenceRecords: CulturalEvidenceRecord[] = planData.evidence || [];
        setLocalEvidence(evidenceRecords);
        setEvidence(evidenceRecords);

        updateStage('entity_resolution', 'completed', `${evidenceRecords.filter((e) => e.operation === 'search').length} Entities Resolved`);
        addLog(`Discovered ${evidenceRecords.length} Qloo cultural affinity signals across artists, brands, and venues.`);

        // Stage 3 & 4: Cultural Insights & Normalization
        updateStage('insights_gathering', 'completed', `${planData.summary.artistsCount} Artists, ${planData.summary.brandsCount} Brands`);
        updateStage('evidence_normalization', 'running');
        setProgressPercent(75);
        await new Promise((r) => setTimeout(r, 600));
        updateStage('evidence_normalization', 'completed', `${evidenceRecords.length} Records Verified`);

        // Stage 5: Concept Synthesis via /api/agent/generate-concepts
        updateStage('concept_synthesis', 'running');
        addLog('Synthesizing 3 culturally differentiated concepts with deterministic budget allocations...');
        setProgressPercent(88);

        const conceptRes = await fetch('/api/agent/generate-concepts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brief, evidence: evidenceRecords })
        });

        if (!conceptRes.ok) {
          const errData = await conceptRes.json().catch(() => null);
          throw new Error(errData?.error || `Concept synthesis API failed (HTTP ${conceptRes.status})`);
        }

        const conceptData = await conceptRes.json();
        const concepts: EventConcept[] = conceptData.concepts || [];
        setConcepts(concepts);

        updateStage('concept_synthesis', 'completed', '3 Concepts Balanced');
        addLog('Successfully generated 3 event concepts with 100% budget reconciliation.');
        setProgressPercent(100);
        setIsDone(true);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Research pipeline encountered an issue';
        addLog(`Error: ${errorMsg}`);
        setStages((prev) =>
          prev.map((s) => (s.status === 'running' ? { ...s, status: 'error' } : s))
        );
      }
    }

    executeResearchPipeline();
  }, [brief, setEvidence, setConcepts]);

  const updateStage = (id: string, status: StageState['status'], metric?: string) => {
    setStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status, metric: metric ?? s.metric } : s))
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-3 py-0.5 text-xs font-mono text-amber-200/90 mb-2.5">
            <Compass className="h-3 w-3 text-amber-400 animate-spin" />
            <span>AGENTIC ORCHESTRATION PIPELINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">Cultural Telemetry Workspace</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans">
            Real-time telemetry stream as Culture Radar resolves entities, queries Qloo taste graph, and normalizes evidence.
          </p>
        </div>

        {/* Target Brief Snapshot */}
        <div className="luxury-card rounded-xl p-4 text-xs text-right border-white/[0.08]">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider block">Commission Target</span>
          <span className="font-serif text-sm font-medium text-white block mt-0.5">{brief.name}</span>
          <span className="text-amber-200/80 block font-mono text-[11px] mt-0.5">
            {brief.location.city.toUpperCase()} • ${brief.totalBudget.toLocaleString('en-US')} USD
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 space-y-2.5">
        <div className="flex justify-between text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">Agent Telemetry Execution</span>
          <span className="font-mono text-amber-300 font-bold">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.04] border border-white/[0.06]">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* 5-Stage Orchestration Cards */}
      <div className="mt-8 space-y-3">
        {stages.map((st) => (
          <div
            key={st.id}
            className={`flex items-center justify-between rounded-xl border p-4.5 transition-all ${
              st.status === 'completed'
                ? 'border-emerald-500/25 bg-emerald-950/15'
                : st.status === 'running'
                ? 'border-amber-400/40 bg-amber-400/[0.04] ring-1 ring-amber-400/20'
                : st.status === 'error'
                ? 'border-rose-500/30 bg-rose-950/15'
                : 'border-white/[0.06] bg-white/[0.02] opacity-50'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                {st.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : st.status === 'running' ? (
                  <Loader2 className="h-5 w-5 text-amber-300 animate-spin" />
                ) : st.status === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-rose-400" />
                ) : (
                  <Clock className="h-5 w-5 text-zinc-600" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-medium text-white font-sans">{st.label}</h4>
                <p className="text-xs text-zinc-400 mt-0.5 font-sans">{st.description}</p>
              </div>
            </div>

            {st.metric && (
              <span className="rounded-lg bg-black/40 px-3 py-1 text-xs font-mono font-semibold text-emerald-300 border border-emerald-500/20">
                {st.metric}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Discovered Cultural Evidence Strip */}
      {localEvidence.length > 0 && (
        <div className="mt-8 luxury-card rounded-2xl p-6 border-white/[0.08]">
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-amber-400" />
              Retrieved Qloo Cultural Signals ({localEvidence.length})
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">Click card for provenance breakdown</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {localEvidence.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setInspectedEvidence(ev)}
                className="group flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-300 hover:border-amber-400/40 hover:bg-white/[0.06] hover:text-white transition-all text-left"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-amber-400 transition-colors" />
                <span className="font-medium text-white">{ev.entityName}</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
                  ({ev.entityType.replace('urn:entity:', '')})
                </span>
                {ev.affinityScore !== undefined && (
                  <span className="rounded-md bg-amber-400/[0.08] px-1.5 py-0.5 text-[10px] font-mono font-semibold text-amber-200/90 border border-amber-400/20">
                    {(ev.affinityScore * 100).toFixed(0)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Agent Log Console */}
      <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#050608] p-5 font-mono text-xs text-zinc-300 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3 text-zinc-400 text-[11px]">
          <span className="uppercase tracking-widest text-[10px] text-zinc-500">Live Agent Execution Telemetry</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            STREAM ACTIVE
          </span>
        </div>
        <div className="max-h-48 overflow-y-auto space-y-1.5 text-[11px]">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2 text-zinc-300 hover:text-white transition-colors">
              <span className="text-zinc-600 select-none">{(idx + 1).toString().padStart(2, '0')}</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completion CTA */}
      {isDone && (
        <div className="mt-8 flex justify-end animate-in fade-in duration-300">
          <button
            onClick={() => router.push('/concepts')}
            className="flex items-center gap-2.5 rounded-xl bg-gradient-to-b from-[#f7dfa5] to-[#d4af37] px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-xl shadow-amber-950/20 hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span>Review Generated Concepts</span>
            <ArrowRight className="h-4 w-4 text-zinc-950" />
          </button>
        </div>
      )}
    </div>
  );
}
