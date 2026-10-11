'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

interface CulturalRadarChartProps {
  affinityData?: {
    dimension: string;
    affinityScore: number;
    fullMark: number;
  }[];
}

const DEFAULT_DATA = [
  { dimension: 'Sound & Music', affinityScore: 94, fullMark: 100 },
  { dimension: 'Spatial & Design', affinityScore: 88, fullMark: 100 },
  { dimension: 'Brand Synergy', affinityScore: 91, fullMark: 100 },
  { dimension: 'Gastronomy & Beverage', affinityScore: 86, fullMark: 100 },
  { dimension: 'Community Vibe', affinityScore: 89, fullMark: 100 }
];

export function CulturalRadarChart({ affinityData = DEFAULT_DATA }: CulturalRadarChartProps) {
  return (
    <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5">
      <div className="flex items-center justify-between border-b border-[#1f2433] pb-3 mb-2">
        <div>
          <h3 className="text-sm font-semibold text-white">Cultural Affinity Radar</h3>
          <p className="text-xs text-slate-400">Cross-category audience taste alignment</p>
        </div>
        <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-300">
          Qloo Signals
        </span>
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={affinityData}>
            <PolarGrid stroke="#1f2433" />
            <PolarAngleAxis dataKey="dimension" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} stroke="#1f2433" />
            <Radar
              name="Audience Affinity"
              dataKey="affinityScore"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#121520',
                borderColor: '#272d3f',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val: unknown) => [`${val}%`, 'Cultural Match']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
