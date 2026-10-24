'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { BudgetAllocation } from '@/lib/schemas/concept';

interface BudgetBreakdownChartProps {
  allocation: BudgetAllocation;
  currency?: string;
}

const LUXURY_PALETTE = [
  '#f7dfa5', // Talent (Champagne Gold)
  '#d4af37', // Venue (Muted Gold)
  '#10b981', // F&B (Emerald)
  '#ff6b4a', // Experience Design (Warm Coral)
  '#38bdf8', // Marketing & PR (Sky Blue)
  '#a78bfa', // Operations & Staff (Lavender)
  '#71717a'  // Contingency (Muted Zinc)
];

export function BudgetBreakdownChart({
  allocation,
  currency = 'USD'
}: BudgetBreakdownChartProps) {
  const data = [
    { name: 'Talent & Entertainment', value: allocation.talentAndEntertainment, color: LUXURY_PALETTE[0] },
    { name: 'Venue & Production', value: allocation.venueAndProduction, color: LUXURY_PALETTE[1] },
    { name: 'Food & Beverage', value: allocation.foodAndBeverage, color: LUXURY_PALETTE[2] },
    { name: 'Experience Design', value: allocation.experienceDesign, color: LUXURY_PALETTE[3] },
    { name: 'Marketing & PR', value: allocation.marketingAndPR, color: LUXURY_PALETTE[4] },
    { name: 'Operations & Staff', value: allocation.operationsAndStaff, color: LUXURY_PALETTE[5] },
    { name: 'Contingency Reserve', value: allocation.contingency, color: LUXURY_PALETTE[6] }
  ];

  const total = allocation.total;

  return (
    <div className="luxury-card rounded-2xl p-6 border-white/[0.08]">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5 mb-4">
        <div>
          <h3 className="text-sm font-serif font-medium text-white">Deterministic Budget Allocation</h3>
          <p className="text-xs text-zinc-400 font-sans">100% exact mathematical balance guaranteed</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Total Spend</span>
          <p className="text-base font-mono font-semibold text-white">
            ${total.toLocaleString()} {currency}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Pie Donut */}
        <div className="h-60 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#07080b" strokeWidth={2.5} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: unknown) => [`$${Number(val).toLocaleString()} ${currency}`, 'Allocated']}
                contentStyle={{
                  backgroundColor: '#0c0e14',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono), monospace',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend & Percentages */}
        <div className="space-y-2 text-xs">
          {data.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between py-1 border-b border-white/[0.04]">
                <div className="flex items-center gap-2 truncate">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-300 font-medium truncate">{item.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-[11px] text-zinc-500">{pct}%</span>
                  <span className="font-mono text-xs font-semibold text-white">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
