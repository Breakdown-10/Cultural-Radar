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

const COLORS = [
  '#6366f1', // Talent (Indigo)
  '#3b82f6', // Venue (Blue)
  '#10b981', // F&B (Emerald)
  '#ec4899', // Experience Design (Pink)
  '#f59e0b', // Marketing (Amber)
  '#8b5cf6', // Operations (Purple)
  '#64748b'  // Contingency (Slate)
];

export function BudgetBreakdownChart({
  allocation,
  currency = 'USD'
}: BudgetBreakdownChartProps) {
  const data = [
    { name: 'Talent & Entertainment', value: allocation.talentAndEntertainment, color: COLORS[0] },
    { name: 'Venue & Production', value: allocation.venueAndProduction, color: COLORS[1] },
    { name: 'Food & Beverage', value: allocation.foodAndBeverage, color: COLORS[2] },
    { name: 'Experience Design', value: allocation.experienceDesign, color: COLORS[3] },
    { name: 'Marketing & PR', value: allocation.marketingAndPR, color: COLORS[4] },
    { name: 'Operations & Staff', value: allocation.operationsAndStaff, color: COLORS[5] },
    { name: 'Contingency', value: allocation.contingency, color: COLORS[6] }
  ];

  const total = allocation.total;

  return (
    <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-5">
      <div className="flex items-center justify-between border-b border-[#1f2433] pb-3 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Deterministic Budget Allocation</h3>
          <p className="text-xs text-slate-400">100% mathematical balance guaranteed</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Total Spend</span>
          <p className="text-lg font-bold text-white">
            ${total.toLocaleString()} {currency}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Pie Donut */}
        <div className="h-56 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0d0f17" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: unknown) => [`$${Number(val).toLocaleString()}`, 'Allocated']}
                contentStyle={{
                  backgroundColor: '#121520',
                  borderColor: '#272d3f',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
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
              <div key={item.name} className="flex items-center justify-between py-1 border-b border-[#181c28]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-400">{pct}%</span>
                  <span className="font-mono font-semibold text-white">
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
