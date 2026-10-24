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
    <div className="luxury-card rounded-2xl p-6 border-white/[0.08]">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-3">
        <div>
          <h3 className="text-sm font-serif font-medium text-white">Cultural Affinity Radar</h3>
          <p className="text-xs text-zinc-400 font-sans">Multi-dimensional audience taste alignment</p>
        </div>
        <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-2.5 py-0.5 text-[10px] font-mono text-amber-200">
          QLOO V2 SIGNALS
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={affinityData}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.08)" />
            <PolarAngleAxis 
              dataKey="dimension" 
              tick={{ fill: '#e4e4e7', fontSize: 11, fontFamily: 'var(--font-sans), sans-serif', fontWeight: 500 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: '#71717a', fontSize: 9, fontFamily: 'var(--font-mono), monospace' }} 
              stroke="rgba(255, 255, 255, 0.08)" 
            />
            <Radar
              name="Audience Affinity"
              dataKey="affinityScore"
              stroke="#f7dfa5"
              fill="#f7dfa5"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0c0e14',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'var(--font-mono), monospace',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
              }}
              formatter={(val: unknown) => [`${val}%`, 'Cultural Match']}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
