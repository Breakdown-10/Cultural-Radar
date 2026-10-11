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
  Trash2
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-[#1f2433]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-300 mb-2">
            <Sparkles className="h-3 w-3" />
            <span>Structured Event Intake</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Event Brief Builder</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Define your audience, location, and budget constraints to initiate agentic Qloo research.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400">Quick Fill:</span>
          {SAMPLE_BRIEFS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handlePresetSelect(s.id)}
              className="rounded-md border border-[#272d3f] bg-[#121520] px-2.5 py-1 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition-colors"
            >
              {s.location.city}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Section 1: Event Fundamentals */}
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1f2433] pb-3">
            <Compass className="h-4 w-4 text-indigo-400" />
            1. Event Fundamentals
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
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1f2433] pb-3">
            <Users className="h-4 w-4 text-emerald-400" />
            2. Audience & Atmosphere
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
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
              className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
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
              className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: Attendance & Budget */}
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1f2433] pb-3">
            <DollarSign className="h-4 w-4 text-pink-400" />
            3. Scale & Financial Constraints
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Estimated Attendance *
              </label>
              <input
                type="number"
                min="10"
                value={formData.estimatedAttendance}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedAttendance: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                className="w-full rounded-lg border border-[#272d3f] bg-[#121520] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Cultural Anchors (For Qloo Lookup) */}
        <div className="rounded-xl border border-[#1f2433] bg-[#0d0f17] p-6 space-y-5">
          <div className="border-b border-[#1f2433] pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              4. Cultural Anchors (For Qloo API Resolution)
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Provide artists or brands your audience already loves. Qloo resolves these into entity IDs to discover taste affinities.
            </p>
          </div>

          {/* Anchor Artists */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                className="flex-1 rounded-lg border border-[#272d3f] bg-[#121520] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addArtist}
                className="flex items-center gap-1 rounded-lg bg-[#181c28] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-indigo-600 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.anchorEntities?.artists?.map((artist, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded bg-[#181c28] px-2.5 py-1 text-xs text-slate-200 border border-[#272d3f]"
                >
                  {artist}
                  <button type="button" onClick={() => removeArtist(i)} className="text-slate-400 hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Anchor Brands */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
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
                className="flex-1 rounded-lg border border-[#272d3f] bg-[#121520] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addBrand}
                className="flex items-center gap-1 rounded-lg bg-[#181c28] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-indigo-600 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {formData.anchorEntities?.brands?.map((b, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 rounded bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300 border border-indigo-500/20"
                >
                  {b}
                  <button type="button" onClick={() => removeBrand(i)} className="text-indigo-400 hover:text-red-400">
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
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
          >
            <span>Proceed to Agentic Research</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
