'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, Layers, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#08090d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent border border-amber-400/30 text-amber-300 shadow-sm transition-transform group-hover:scale-105">
            <Compass className="h-4.5 w-4.5 transition-transform duration-500 group-hover:rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-medium tracking-tight text-white">Culture Radar</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                v1.0 • Taste AI
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 tracking-wide font-sans hidden md:block">
              Empirical Event Strategist
            </p>
          </div>
        </Link>

        {/* Center: Live Qloo Taste Graph Status */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 text-[11px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-tight">QLOO TASTE GRAPH • CONNECTED</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === '/' 
                ? 'bg-white/[0.08] text-white shadow-inner' 
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span>Showcase</span>
          </Link>

          <Link
            href="/brief"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === '/brief' 
                ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' 
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Build Strategy</span>
          </Link>

          <a
            href="https://qloo.devpost.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white hover:bg-white/[0.04]"
          >
            <span>Devpost Entry</span>
            <ArrowUpRight className="h-3 w-3 text-zinc-500" />
          </a>
        </nav>
      </div>
    </header>
  );
}
