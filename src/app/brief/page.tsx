'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCultureRadar } from '@/lib/store';
import { SAMPLE_BRIEFS } from '@/data/sample-briefs';
import { z } from 'zod';
import { EventBrief, EventBriefSchema } from '@/lib/schemas/brief';
import {
  Sparkles,
  Users,
  DollarSign,
  Compass,
  ArrowRight,
  Plus,
  Trash2,
  RotateCcw
} from 'lucide-react';

export default function BriefBuilderPage() {
  const router = useRouter();
  const { brief, setBrief } = useCultureRadar();

  const [formData, setFormData] = useState<EventBrief>(brief);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [artistInput, setArtistInput] = useState('');
  const [brandInput, setBrandInput] = useState('');

  const handlePresetSelect = (id: string) => {
    const selected = SAMPLE_BRIEFS.find((b) => b.id === id);
    if (selected) {
      setFormData(selected);
      setErrors({});
    }
  };

  const handleResetBlank = () => {
    setFormData({
      id: `brief_${Date.now()}`,
      name: '',
      location: { city: '', country: '', venueType: '' },
      eventType: 'lifestyle_gathering',
      targetAudience: { demographicSummary: '', interests: [], vibeOrAtmosphere: '' },
      estimatedAttendance: 500,
      totalBudget: 50000,
      currency: 'USD',
      objectives: [],
      anchorEntities: { artists: [], brands: [], places: [] },
      excludedThemes: [],
      createdAt: new Date().toISOString()
    });
    setErrors({});
  };

  const addArtist = () => {
    if (!artistInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      anchorEntities: {
        ...prev.anchorEntities,
        artists: [...(prev.anchorEntities?.artists || []), artistInput.trim()],
        brands: prev.anchorEntities?.brands || [],
        places: prev.anchorEntities?.places || []
      }
    }));
    setArtistInput('');
  };

  const removeArtist = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      anchorEntities: {
        ...prev.anchorEntities,
        artists: (prev.anchorEntities?.artists || []).filter((_, i) => i !== index),
        brands: prev.anchorEntities?.brands || [],
        places: prev.anchorEntities?.places || []
      }
    }));
  };

  const addBrand = () => {
    if (!brandInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      anchorEntities: {
        ...prev.anchorEntities,
        brands: [...(prev.anchorEntities?.brands || []), brandInput.trim()],
        artists: prev.anchorEntities?.artists || [],
        places: prev.anchorEntities?.places || []
      }
    }));
    setBrandInput('');
  };

  const removeBrand = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      anchorEntities: {
        ...prev.anchorEntities,
        brands: (prev.anchorEntities?.brands || []).filter((_, i) => i !== index),
        artists: prev.anchorEntities?.artists || [],
        places: prev.anchorEntities?.places || []
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validated = EventBriefSchema.parse(formData);
      setBrief(validated);
      router.push('/research');
    } catch (err: unknown) {
      const fieldErrors: Record<string, string> = {};
      if (err instanceof z.ZodError) {
        err.issues.forEach((issue) => {
          const path = issue.path.join('.');
          fieldErrors[path] = issue.message;
        });
      }
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-3 py-0.5 text-xs font-mono text-amber-200/90 mb-2.5">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>STRUCTURED EVENT INTAKE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight">Event Commission Brief</h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans">
            Define your audience psychographics, host city, and budget to guide Qloo affinity resolution.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-400 font-mono">Dossier Presets:</span>
          {SAMPLE_BRIEFS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handlePresetSelect(s.id)}
              className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-300 hover:border-amber-400/40 hover:text-amber-200 transition-colors"
            >
              {s.location.city}
            </button>
          ))}
          <button
            type="button"
            onClick={handleResetBlank}
            className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-transparent px-2.5 py-1.5 text-xs text-zinc-500 hover:border-rose-500/40 hover:text-rose-300 transition-colors"
            title="Start with a blank brief form"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Blank</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Section 1: Event Fundamentals */}
        <div className="luxury-card rounded-2xl p-7 space-y-5">
          <h2 className="text-base font-serif font-medium text-white flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
            <Compass className="h-4 w-4 text-amber-400" />
            1. Event Fundamentals & Locale
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Event Working Title *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Symphony & Spice: Sunset to Starlight"
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              {errors.name && <p className="mt-1 text-[11px] text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Event Format *
              </label>
              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value as EventBrief['eventType'] })
                }
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="lifestyle_gathering">Lifestyle & Culture Gathering</option>
                <option value="concert_festival">Music & Live Performance Festival</option>
                <option value="branded_activation">Branded Experiential Activation</option>
                <option value="culinary_experience">Culinary & Gastronomy Showcase</option>
                <option value="art_exhibition">Contemporary Art & Spatial Design</option>
                <option value="corporate_gala">Innovator Summit / Gala</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Host City *
              </label>
              <input
                type="text"
                value={formData.location.city}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, city: e.target.value }
                  })
                }
                placeholder="e.g. Dubai"
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              {errors['location.city'] && (
                <p className="mt-1 text-[11px] text-red-400">{errors['location.city']}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Country *
              </label>
              <input
                type="text"
                value={formData.location.country}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    location: { ...formData.location, country: e.target.value }
                  })
                }
                placeholder="e.g. United Arab Emirates"
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Audience & Vibe */}
        <div className="luxury-card rounded-2xl p-7 space-y-5">
          <h2 className="text-base font-serif font-medium text-white flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
            <Users className="h-4 w-4 text-emerald-400" />
            2. Audience Psychographics & Atmosphere
          </h2>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Target Audience Profile *
            </label>
            <input
              type="text"
              value={formData.targetAudience.demographicSummary}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetAudience: { ...formData.targetAudience, demographicSummary: e.target.value }
                })
              }
              placeholder="e.g. Young creative professionals, tech entrepreneurs, ages 24–38"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Desired Atmosphere / Vibe *
            </label>
            <input
              type="text"
              value={formData.targetAudience.vibeOrAtmosphere}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetAudience: { ...formData.targetAudience, vibeOrAtmosphere: e.target.value }
                })
              }
              placeholder="e.g. Sophisticated, warm, immersive, neo-bohemian, relaxed luxury"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Section 3: Attendance & Budget */}
        <div className="luxury-card rounded-2xl p-7 space-y-5">
          <h2 className="text-base font-serif font-medium text-white flex items-center gap-2.5 border-b border-white/[0.06] pb-3.5">
            <DollarSign className="h-4 w-4 text-amber-400" />
            3. Scale & Deterministic Financial Constraints
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Estimated Attendance *
              </label>
              <input
                type="number"
                min="10"
                value={formData.estimatedAttendance}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedAttendance: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Total Budget ($ USD) *
              </label>
              <input
                type="number"
                min="1000"
                step="1000"
                value={formData.totalBudget}
                onChange={(e) =>
                  setFormData({ ...formData, totalBudget: parseFloat(e.target.value) || 0 })
                }
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-mono text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Cultural Anchors (For Qloo Lookup) */}
        <div className="luxury-card rounded-2xl p-7 space-y-5">
          <div className="border-b border-white/[0.06] pb-3.5">
            <h2 className="text-base font-serif font-medium text-white flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-amber-400" />
              4. Cultural Taste Anchors (For Qloo Entity Resolution)
            </h2>
            <p className="mt-1 text-xs text-zinc-400 font-sans">
              Provide specific artists or brands that anchor your crowd. Qloo resolves these into entity UUIDs to discover taste affinities.
            </p>
          </div>

          {/* Anchor Artists */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Anchor Artists / Performers
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={artistInput}
                onChange={(e) => setArtistInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addArtist();
                  }
                }}
                placeholder="e.g. Khruangbin, Bonobo"
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={addArtist}
                className="flex items-center gap-1 rounded-xl bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-zinc-200 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white transition-all"
              >
                <Plus className="h-3.5 w-3.5 text-amber-300" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.anchorEntities?.artists?.map((artist, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.05] px-3 py-1 text-xs font-mono text-zinc-200 border border-white/[0.08]"
                >
                  {artist}
                  <button type="button" onClick={() => removeArtist(i)} className="text-zinc-500 hover:text-rose-400 transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Anchor Brands */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Anchor Brands / Lifestyle Sponsors
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addBrand();
                  }
                }}
                placeholder="e.g. Aesop, Polestar"
                className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400/40 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={addBrand}
                className="flex items-center gap-1 rounded-xl bg-white/[0.06] px-4 py-2.5 text-xs font-semibold text-zinc-200 border border-white/[0.08] hover:bg-white/[0.1] hover:text-white transition-all"
              >
                <Plus className="h-3.5 w-3.5 text-amber-300" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.anchorEntities?.brands?.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400/[0.08] px-3 py-1 text-xs font-mono text-amber-200/90 border border-amber-400/20"
                >
                  {b}
                  <button type="button" onClick={() => removeBrand(i)} className="text-amber-400/60 hover:text-rose-400 transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="flex items-center gap-2.5 rounded-xl bg-gradient-to-b from-[#f7dfa5] to-[#d4af37] px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-xl shadow-amber-950/20 hover:brightness-110 transition-all active:scale-[0.98]"
          >
            <span>Initiate Autonomous Research</span>
            <ArrowRight className="h-4 w-4 text-zinc-950" />
          </button>
        </div>
      </form>
    </div>
  );
}
