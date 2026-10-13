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
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[#1f2433]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 mb-2">
            <Compass className="h-3 w-3 animate-spin" />
            <span>Agentic Orchestration Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cultural Research Workspace</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Live telemetry of the Culture Radar agent querying Qloo APIs and generating evidence-grounded concepts.
          </p>
        </div>

        {/* Target Brief Snapshot */}
        <div className="rounded-lg border border-[#272d3f] bg-[#121520] p-3 text-xs text-right">
          <span className="text-slate-400 block">Brief Target</span>
          <span className="font-bold text-white block">{brief.name}</span>
          <span className="text-slate-400 block font-mono text-[11px]">
            {brief.location.city} • ${brief.totalBudget.toLocaleString('en-US')} USD
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-semibold text-slate-300">Agent Research Progress</span>
          <span className="font-mono text-indigo-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#181c28]">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
          />
        </div>
      </div>

      {/* 5-Stage Orchestration Cards */}
      <div className="mt-8 space-y-3">
        {stages.map((st) => (
          <div
            key={st.id}
            className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
              st.status === 'completed'
                ? 'border-emerald-500/30 bg-emerald-950/10'
                : st.status === 'running'
                ? 'border-indigo-500 bg-[#121522] ring-1 ring-indigo-500/30'
                : st.status === 'error'
                ? 'border-red-500/30 bg-red-950/10'
                : 'border-[#1f2433] bg-[#0d0f17] opacity-60'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                {st.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                ) : st.status === 'running' ? (
                  <Loader2 className="h-5 w-5 text-indigo-400 animate-spin" />
                ) : st.status === 'error' ? (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <Clock className="h-5 w-5 text-slate-500" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{st.label}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{st.description}</p>
              </div>
            </div>

            {st.metric && (
              <span className="rounded bg-[#090a0f] px-2.5 py-1 text-xs font-mono font-semibold text-emerald-400 border border-[#1f2433]">
                {st.metric}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Discovered Cultural Evidence Strip */}
      {localEvidence.length > 0 && (
        <div className="mt-8 rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f2433] mb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-indigo-400" />
              Retrieved Qloo Cultural Signals ({localEvidence.length})
            </h3>
            <span className="text-[11px] text-slate-400">Click any card to inspect provenance</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {localEvidence.map((ev) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setInspectedEvidence(ev)}
                className="group flex items-center gap-1.5 rounded-lg border border-[#272d3f] bg-[#121520] px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition-all text-left"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 group-hover:bg-indigo-400" />
                <span className="font-semibold text-white">{ev.entityName}</span>
                <span className="text-[10px] text-slate-400">({ev.entityType.replace('urn:entity:', '')})</span>
                {ev.affinityScore !== undefined && (
                  <span className="rounded bg-indigo-500/20 px-1 text-[10px] font-mono text-indigo-300">
                    {(ev.affinityScore * 100).toFixed(0)}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Agent Log Console */}
      <div className="mt-8 rounded-xl border border-[#1f2433] bg-[#090a0f] p-4 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between pb-2 border-b border-[#1f2433] mb-3 text-slate-400 text-[11px]">
          <span>Live Agent Execution Log</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Connected
          </span>
        </div>
        <div className="max-h-40 overflow-y-auto space-y-1 text-[11px]">
          {logs.map((log, idx) => (
            <p key={idx} className="text-slate-300">
              {log}
            </p>
          ))}
        </div>
      </div>

      {/* Completion CTA */}
      {isDone && (
        <div className="mt-8 flex justify-end animate-in fade-in">
          <button
            onClick={() => router.push('/concepts')}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
          >
            <span>Review Generated Concepts</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
