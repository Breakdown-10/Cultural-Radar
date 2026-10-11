'use client';

import React from 'react';
import { EventConcept } from '@/lib/schemas/concept';
import { Music, Tag, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface ConceptCardProps {
  concept: EventConcept;
  currency?: string;
  isSelected?: boolean;
  onSelect: (concept: EventConcept) => void;
  onInspectEvidence?: (evidenceId: string) => void;
}

export function ConceptCard({
  concept,
  currency = 'USD',
  isSelected = false,
  onSelect,
  onInspectEvidence
}: ConceptCardProps) {
  const headliner = concept.programming.headliners[0];
  const brand = concept.brandPartnerships.candidateBrands[0];
  const vendor = concept.foodAndLifestyle.candidateVendors[0];

  const profileColors: Record<number, { bg: string; border: string; text: string }> = {
    1: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
    2: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
    3: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' }
  };

  const style = profileColors[concept.conceptNumber] || profileColors[1];

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border p-5 transition-all ${
        isSelected
          ? 'border-indigo-500 bg-[#121522] ring-2 ring-indigo-500/30 shadow-xl'
          : 'border-[#1f2433] bg-[#0d0f17] hover:border-[#2e364d] hover:bg-[#10131e]'
      }`}
    >
      <div>
        {/* Concept Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#1f2433]">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${style.bg} ${style.border} ${style.text}`}
          >
            Concept {concept.conceptNumber}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>{concept.supportingEvidenceIds.length} Qloo Signals</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
            {concept.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 italic">{concept.tagline}</p>
        </div>

        {/* Creative Direction */}
        <div className="mt-3.5 rounded-lg bg-[#090a0f] p-3 border border-[#1a1e2b] text-xs text-slate-300">
          <p className="line-clamp-3">{concept.creativeDirection}</p>
        </div>

        {/* Recommended Pillars */}
        <div className="mt-4 space-y-2 text-xs">
          {/* Headliner */}
          {headliner && (
            <div className="flex items-center justify-between rounded-md bg-[#121520] p-2 border border-[#1f2433]">
              <div className="flex items-center gap-2 truncate">
                <Music className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                <span className="font-semibold text-white truncate">{headliner.name}</span>
              </div>
              {headliner.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(headliner.evidenceIds[0])}
                  className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300 hover:bg-indigo-500/30 shrink-0"
                >
                  Evidence
                </button>
              )}
            </div>
          )}

          {/* Brand Partner */}
          {brand && (
            <div className="flex items-center justify-between rounded-md bg-[#121520] p-2 border border-[#1f2433]">
              <div className="flex items-center gap-2 truncate">
                <Tag className="h-3.5 w-3.5 text-pink-400 shrink-0" />
                <span className="font-semibold text-white truncate">{brand.name}</span>
              </div>
              {brand.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(brand.evidenceIds[0])}
                  className="rounded bg-pink-500/20 px-1.5 py-0.5 text-[10px] font-medium text-pink-300 hover:bg-pink-500/30 shrink-0"
                >
                  Evidence
                </button>
              )}
            </div>
          )}

          {/* F&B Place */}
          {vendor && (
            <div className="flex items-center justify-between rounded-md bg-[#121520] p-2 border border-[#1f2433]">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white truncate">{vendor.name}</span>
              </div>
              {vendor.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(vendor.evidenceIds[0])}
                  className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-300 hover:bg-emerald-500/30 shrink-0"
                >
                  Evidence
                </button>
              )}
            </div>
          )}
        </div>

        {/* Budget Allocation Summary */}
        <div className="mt-4 pt-3 border-t border-[#1f2433]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400">Total Planned Spend</span>
            <span className="font-bold text-white">
              ${concept.budgetAllocation.total.toLocaleString()} {currency}
            </span>
          </div>
          <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#181c28]">
            <div
              style={{
                width: `${(concept.budgetAllocation.talentAndEntertainment / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-indigo-500"
              title="Talent"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.venueAndProduction / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-blue-500"
              title="Venue"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.experienceDesign / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-pink-500"
              title="Experience"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.foodAndBeverage / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-emerald-500"
              title="F&B"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.marketingAndPR / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-amber-500"
              title="Marketing"
            />
          </div>
        </div>
      </div>

      {/* Select Action */}
      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={() => onSelect(concept)}
          className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all ${
            isSelected
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-[#181c28] text-slate-200 hover:bg-indigo-600 hover:text-white'
          }`}
        >
          <span>{isSelected ? 'Selected Concept' : 'Develop This Concept'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
