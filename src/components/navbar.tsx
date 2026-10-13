'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, Layers, ExternalLink } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f2433] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/30">
            <Compass className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white">Culture Radar</span>
            <span className="ml-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
              Qloo Agentic
            </span>
          </div>
        </Link>

        {/* Center: Live Qloo Taste Graph Status */}
        <div className="hidden md:flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-[#0d1419] px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Qloo Taste Graph: Active</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              pathname === '/' ? 'bg-[#181c28] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Showcase</span>
          </Link>

          <Link
            href="/brief"
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              pathname === '/brief' ? 'bg-[#181c28] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>New Brief</span>
          </Link>

          <a
            href="https://docs.qloo.com/reference/api-overview"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            <span>Qloo Docs</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </nav>
      </div>
    </header>
  );
}
