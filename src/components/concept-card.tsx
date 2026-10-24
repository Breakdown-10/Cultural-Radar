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

  return (
    <div
      className={`luxury-card relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
        isSelected
          ? 'border-amber-400/50 bg-[#12141e] ring-2 ring-amber-400/30 shadow-2xl'
          : 'hover:border-white/[0.2] hover:bg-white/[0.02]'
      }`}
    >
      <div>
        {/* Concept Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/[0.08] px-2.5 py-0.5 text-[10px] font-mono font-medium text-amber-200 tracking-wider uppercase">
            Direction 0{concept.conceptNumber}
          </span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>{concept.supportingEvidenceIds.length} Qloo Signals</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mt-4">
          <h3 className="text-lg font-serif font-medium text-white group-hover:text-amber-200 transition-colors">
            {concept.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-400 italic font-serif">{concept.tagline}</p>
        </div>

        {/* Creative Direction */}
        <div className="mt-3.5 rounded-xl bg-black/40 p-3.5 border border-white/[0.06] text-xs text-zinc-300 font-sans leading-relaxed">
          <p className="line-clamp-3">{concept.creativeDirection}</p>
        </div>

        {/* Recommended Pillars */}
        <div className="mt-4 space-y-2 text-xs">
          {/* Headliner */}
          {headliner && (
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-2.5 border border-white/[0.06]">
              <div className="flex items-center gap-2 truncate">
                <Music className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                <span className="font-medium text-white truncate">{headliner.name}</span>
              </div>
              {headliner.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(headliner.evidenceIds[0])}
                  className="rounded-md bg-amber-400/[0.08] px-2 py-0.5 text-[10px] font-mono font-medium text-amber-200 hover:bg-amber-400/20 border border-amber-400/20 shrink-0 transition-colors"
                >
                  Evidence
                </button>
              )}
            </div>
          )}

          {/* Brand Partner */}
          {brand && (
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-2.5 border border-white/[0.06]">
              <div className="flex items-center gap-2 truncate">
                <Tag className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                <span className="font-medium text-white truncate">{brand.name}</span>
              </div>
              {brand.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(brand.evidenceIds[0])}
                  className="rounded-md bg-emerald-500/[0.08] px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20 shrink-0 transition-colors"
                >
                  Evidence
                </button>
              )}
            </div>
          )}

          {/* F&B Place */}
          {vendor && (
            <div className="flex items-center justify-between rounded-xl bg-white/[0.03] p-2.5 border border-white/[0.06]">
              <div className="flex items-center gap-2 truncate">
                <MapPin className="h-3.5 w-3.5 text-sky-300 shrink-0" />
                <span className="font-medium text-white truncate">{vendor.name}</span>
              </div>
              {vendor.evidenceIds[0] && (
                <button
                  type="button"
                  onClick={() => onInspectEvidence?.(vendor.evidenceIds[0])}
                  className="rounded-md bg-sky-500/[0.08] px-2 py-0.5 text-[10px] font-mono font-medium text-sky-300 hover:bg-sky-500/20 border border-sky-500/20 shrink-0 transition-colors"
                >
                  Evidence
                </button>
              )}
            </div>
          )}
        </div>

        {/* Budget Allocation Summary */}
        <div className="mt-5 pt-3.5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-wider">Exact Spend Allocation</span>
            <span className="font-mono text-xs font-semibold text-white">
              ${concept.budgetAllocation.total.toLocaleString()} {currency}
            </span>
          </div>
          <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              style={{
                width: `${(concept.budgetAllocation.talentAndEntertainment / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-[#f7dfa5]"
              title="Talent"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.venueAndProduction / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-[#d4af37]"
              title="Venue"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.experienceDesign / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-[#ff6b4a]"
              title="Experience"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.foodAndBeverage / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-[#10b981]"
              title="F&B"
            />
            <div
              style={{
                width: `${(concept.budgetAllocation.marketingAndPR / concept.budgetAllocation.total) * 100}%`
              }}
              className="bg-[#38bdf8]"
              title="Marketing"
            />
          </div>
        </div>
      </div>

      {/* Select Action */}
      <div className="mt-6 pt-3.5">
        <button
          type="button"
          onClick={() => onSelect(concept)}
          className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold transition-all ${
            isSelected
              ? 'bg-gradient-to-b from-[#f7dfa5] to-[#d4af37] text-zinc-950 shadow-xl shadow-amber-950/20'
              : 'bg-white/[0.04] text-zinc-200 border border-white/[0.08] hover:bg-[#f7dfa5] hover:text-zinc-950 hover:border-transparent'
          }`}
        >
          <span>{isSelected ? 'Active Selection' : 'Develop Comprehensive Strategy'}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
