'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07080b] text-zinc-400 no-print">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-medium text-white tracking-tight">Culture Radar</span>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-2 py-0.5 text-[10px] font-mono text-amber-200/80">
                Taste AI
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md font-sans">
              Autonomous cultural intelligence agent replacing demographic stereotypes with empirical taste data. Built with Qloo&apos;s 250M+ entity taste graph and deterministic code-level budget balancing.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-2.5 py-1 text-[11px] font-mono text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>QLOO API GATEWAY: CONNECTED</span>
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">hackathon.api.qloo.com</span>
            </div>
          </div>

          {/* Workflow Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-medium text-white uppercase tracking-widest">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-200 transition-colors">
                  Showcase Briefs
                </Link>
              </li>
              <li>
                <Link href="/brief" className="hover:text-amber-200 transition-colors">
                  Event Brief Intake
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-amber-200 transition-colors">
                  Agent Telemetry Workspace
                </Link>
              </li>
              <li>
                <Link href="/concepts" className="hover:text-amber-200 transition-colors">
                  Tri-Concept Evaluation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Tech */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-medium text-white uppercase tracking-widest">Hackathon Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://qloo.devpost.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-amber-200 transition-colors"
                >
                  <span>Qloo Devpost Portal</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.qloo.com/reference/api-overview"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-amber-200 transition-colors"
                >
                  <span>Qloo API Documentation</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ai.google.dev/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-amber-200 transition-colors"
                >
                  <span>Google Gemini 2.0 Flash</span>
                  <ArrowUpRight className="h-3 w-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <span className="text-zinc-500 font-mono text-[11px]">MIT Open Source License</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1.5 font-sans">
            <span>Built for the</span>
            <span className="font-medium text-zinc-300">Qloo Agentic Hackathon 2026</span>
            <span className="italic text-amber-200/60 font-serif font-light">(&ldquo;Agents, but with taste&rdquo;)</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>DETERMINISTIC FINANCIALS ENFORCED</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
