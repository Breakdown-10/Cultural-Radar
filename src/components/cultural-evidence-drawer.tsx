'use client';

import React from 'react';
import { CulturalEvidenceRecord } from '@/lib/schemas/evidence';
import { X, ShieldCheck, Database, Info } from 'lucide-react';

interface CulturalEvidenceDrawerProps {
  evidence: CulturalEvidenceRecord | null;
  onClose: () => void;
}

export function CulturalEvidenceDrawer({ evidence, onClose }: CulturalEvidenceDrawerProps) {
  if (!evidence) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative h-full w-full max-w-md border-l border-white/[0.08] bg-[#08090d] p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-serif font-medium text-white">Qloo Cultural Evidence</h3>
              <span className="text-[11px] font-mono text-zinc-500">Traceable Graph Telemetry</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Entity Card */}
        <div className="mt-6 space-y-4">
          <div className="luxury-card rounded-2xl p-5 border-white/[0.08]">
            <span className="inline-block rounded-md border border-amber-400/30 bg-amber-400/[0.08] px-2.5 py-0.5 text-[10px] font-mono font-medium text-amber-200 uppercase tracking-wider">
              {evidence.entityType.replace('urn:entity:', '')}
            </span>
            <h4 className="mt-2.5 text-lg font-serif font-medium text-white">{evidence.entityName}</h4>
            <p className="mt-1.5 text-xs text-zinc-300 font-sans leading-relaxed">{evidence.finding}</p>

            {evidence.affinityScore !== undefined && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-black/50 px-3.5 py-2.5 border border-white/[0.06]">
                <span className="text-xs font-mono text-zinc-400">Empirical Affinity Metric</span>
                <span className="text-xs font-mono font-semibold text-emerald-300">
                  {(evidence.affinityScore * 100).toFixed(0)}% Match
                </span>
              </div>
            )}
          </div>

          {/* Source Metadata */}
          <div className="luxury-card rounded-2xl p-5 border-white/[0.08] space-y-3 text-xs">
            <h5 className="font-mono text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2 pb-2 border-b border-white/[0.06]">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Provenance Breakdown
            </h5>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-500 font-mono text-[11px]">Evidence ID:</span>
              <span className="font-mono text-zinc-200 text-[11px]">{evidence.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-500 font-mono text-[11px]">API Source:</span>
              <span className="text-amber-200/90 font-mono text-[11px]">{evidence.source}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/[0.04]">
              <span className="text-zinc-500 font-mono text-[11px]">Operation:</span>
              <span className="font-mono text-zinc-200 text-[11px]">/{evidence.operation}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500 font-mono text-[11px]">Qloo Entity UUID:</span>
              <span className="font-mono text-zinc-300 text-[11px] truncate max-w-[170px]">{evidence.entityId}</span>
            </div>
          </div>

          {/* Limitations if any */}
          {evidence.limitations && evidence.limitations.length > 0 && (
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4 text-xs">
              <h5 className="font-mono text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2">
                <Info className="h-3.5 w-3.5 text-amber-400" />
                Data Limitations Disclosed
              </h5>
              <ul className="space-y-1.5 text-zinc-300 text-xs">
                {evidence.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">▸</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw JSON Inspect */}
          {evidence.rawReference && (
            <details className="rounded-xl border border-white/[0.06] bg-black/40 p-3.5 text-xs">
              <summary className="cursor-pointer font-mono text-[11px] text-zinc-400 hover:text-zinc-200">
                Inspect Raw Response Payload
              </summary>
              <pre className="mt-2.5 max-h-48 overflow-x-auto rounded-lg bg-black/70 p-3 font-mono text-[10px] text-zinc-300 border border-white/[0.06]">
                {JSON.stringify(evidence.rawReference, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
