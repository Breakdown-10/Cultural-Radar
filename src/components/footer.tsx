'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ExternalLink, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1f2433] bg-[#090a0f] text-slate-400 no-print">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#181c28]">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/30">
                <Compass className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Culture Radar</span>
              <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                Qloo Agentic
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Autonomous AI event strategy agent replacing demographic guesswork with empirical cultural taste intelligence. Powered by Qloo&apos;s 250M+ entity graph and deterministic zero-drift budget allocation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Qloo API Gateway: Connected</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">hackathon.api.qloo.com</span>
            </div>
          </div>

          {/* Workflow Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Agent Workflow</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-300 transition-colors">
                  Showcase Briefs
                </Link>
              </li>
              <li>
                <Link href="/brief" className="hover:text-indigo-300 transition-colors">
                  Event Brief Intake
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-indigo-300 transition-colors">
                  Agent Telemetry Workspace
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="hover:text-indigo-300 transition-colors">
                  Tri-Concept Evaluation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Tech */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hackathon Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://qloo.devpost.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
                >
                  <span>Qloo Devpost Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.qloo.com/reference/api-overview"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
                >
                  <span>Qloo API Documentation</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
                >
                  <span>Google Gemini 2.0 Flash</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">MIT Open Source License</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1.5">
            <span>Built for the</span>
            <span className="font-semibold text-slate-300">Qloo Agentic Hackathon 2026</span>
            <span>(&ldquo;Agents, but with taste&rdquo;)</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Deterministic Financials Enforced</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
