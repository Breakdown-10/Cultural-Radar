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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative h-full w-full max-w-md border-l border-[#272d3f] bg-[#0d0f17] p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f2433]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-400">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Qloo Cultural Evidence</h3>
              <span className="text-[11px] text-slate-400">Traceable API Record</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-400 hover:bg-[#181c28] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Entity Card */}
        <div className="mt-5 space-y-4">
          <div className="rounded-lg border border-[#272d3f] bg-[#121520] p-4">
            <span className="inline-block rounded border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300 uppercase tracking-wider">
              {evidence.entityType.replace('urn:entity:', '')}
            </span>
            <h4 className="mt-2 text-lg font-bold text-white">{evidence.entityName}</h4>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">{evidence.finding}</p>

            {evidence.affinityScore !== undefined && (
              <div className="mt-3 flex items-center justify-between rounded bg-[#090a0f] px-3 py-2 border border-[#1f2433]">
                <span className="text-xs text-slate-400">Empirical Affinity Score</span>
                <span className="text-xs font-semibold text-emerald-400">
                  {(evidence.affinityScore * 100).toFixed(0)}% Match
                </span>
              </div>
            )}
          </div>

          {/* Source Metadata */}
          <div className="rounded-lg border border-[#272d3f] bg-[#121520] p-4 space-y-2.5 text-xs">
            <h5 className="font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
              Provenance Details
            </h5>
            <div className="flex justify-between py-1 border-b border-[#1f2433]">
              <span className="text-slate-400">Evidence ID:</span>
              <span className="font-mono text-slate-200">{evidence.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1f2433]">
              <span className="text-slate-400">API Source:</span>
              <span className="text-indigo-300 font-medium">{evidence.source}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#1f2433]">
              <span className="text-slate-400">Operation:</span>
              <span className="font-mono text-slate-200">/{evidence.operation}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Qloo Entity ID:</span>
              <span className="font-mono text-slate-300 truncate max-w-[180px]">{evidence.entityId}</span>
            </div>
          </div>

          {/* Limitations if any */}
          {evidence.limitations && evidence.limitations.length > 0 && (
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3.5 text-xs">
              <h5 className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1.5">
                <Info className="h-3.5 w-3.5 text-amber-400" />
                Data Limitations Disclosed
              </h5>
              <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                {evidence.limitations.map((lim, idx) => (
                  <li key={idx}>{lim}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw JSON Inspect */}
          {evidence.rawReference && (
            <details className="rounded-lg border border-[#272d3f] bg-[#090a0f] p-3 text-xs">
              <summary className="cursor-pointer font-medium text-slate-400 hover:text-slate-200">
                Inspect Raw Response Payload
              </summary>
              <pre className="mt-2 max-h-48 overflow-x-auto rounded bg-black/40 p-2 font-mono text-[10px] text-slate-300">
                {JSON.stringify(evidence.rawReference, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
