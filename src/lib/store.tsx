'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventBrief } from './schemas/brief';
import { CulturalEvidenceRecord } from './schemas/evidence';
import { EventConcept } from './schemas/concept';
import { EventStrategyReport } from './schemas/strategy';
import { SAMPLE_BRIEFS } from '@/data/sample-briefs';

interface CultureRadarContextType {
  brief: EventBrief;
  setBrief: (b: EventBrief) => void;
  evidence: CulturalEvidenceRecord[];
  setEvidence: (e: CulturalEvidenceRecord[]) => void;
  concepts: EventConcept[];
  setConcepts: (c: EventConcept[]) => void;
  selectedConcept: EventConcept | null;
  setSelectedConcept: (c: EventConcept | null) => void;
  strategyReport: EventStrategyReport | null;
  setStrategyReport: (r: EventStrategyReport | null) => void;
  inspectedEvidence: CulturalEvidenceRecord | null;
  setInspectedEvidence: (e: CulturalEvidenceRecord | null) => void;
  loadSampleBrief: (id: string) => void;
  resetAll: () => void;
}

const CultureRadarContext = createContext<CultureRadarContextType | undefined>(undefined);

export function CultureRadarProvider({ children }: { children: React.ReactNode }) {
  const [brief, setBriefState] = useState<EventBrief>(SAMPLE_BRIEFS[0]);
  const [evidence, setEvidenceState] = useState<CulturalEvidenceRecord[]>([]);
  const [concepts, setConceptsState] = useState<EventConcept[]>([]);
  const [selectedConcept, setSelectedConceptState] = useState<EventConcept | null>(null);
  const [strategyReport, setStrategyReportState] = useState<EventStrategyReport | null>(null);
  const [inspectedEvidence, setInspectedEvidence] = useState<CulturalEvidenceRecord | null>(null);

  // Sync with localStorage on client
  useEffect(() => {
    try {
      const savedBrief = localStorage.getItem('cr_brief');
      if (savedBrief) setBriefState(JSON.parse(savedBrief));

      const savedEvidence = localStorage.getItem('cr_evidence');
      if (savedEvidence) setEvidenceState(JSON.parse(savedEvidence));

      const savedConcepts = localStorage.getItem('cr_concepts');
      if (savedConcepts) setConceptsState(JSON.parse(savedConcepts));

      const savedSelected = localStorage.getItem('cr_selected_concept');
      if (savedSelected) setSelectedConceptState(JSON.parse(savedSelected));

      const savedReport = localStorage.getItem('cr_strategy_report');
      if (savedReport) setStrategyReportState(JSON.parse(savedReport));
    } catch {
      // LocalStorage access issues in private mode
    }
  }, []);

  const setBrief = (b: EventBrief) => {
    setBriefState(b);
    try {
      localStorage.setItem('cr_brief', JSON.stringify(b));
    } catch {}
  };

  const setEvidence = (e: CulturalEvidenceRecord[]) => {
    setEvidenceState(e);
    try {
      localStorage.setItem('cr_evidence', JSON.stringify(e));
    } catch {}
  };

  const setConcepts = (c: EventConcept[]) => {
    setConceptsState(c);
    try {
      localStorage.setItem('cr_concepts', JSON.stringify(c));
    } catch {}
  };

  const setSelectedConcept = (c: EventConcept | null) => {
    setSelectedConceptState(c);
    try {
      if (c) localStorage.setItem('cr_selected_concept', JSON.stringify(c));
      else localStorage.removeItem('cr_selected_concept');
    } catch {}
  };

  const setStrategyReport = (r: EventStrategyReport | null) => {
    setStrategyReportState(r);
    try {
      if (r) localStorage.setItem('cr_strategy_report', JSON.stringify(r));
      else localStorage.removeItem('cr_strategy_report');
    } catch {}
  };

  const loadSampleBrief = (id: string) => {
    const found = SAMPLE_BRIEFS.find((b) => b.id === id);
    if (found) {
      setBrief(found);
      setEvidence([]);
      setConcepts([]);
      setSelectedConcept(null);
      setStrategyReport(null);
    }
  };

  const resetAll = () => {
    setBrief(SAMPLE_BRIEFS[0]);
    setEvidence([]);
    setConcepts([]);
    setSelectedConcept(null);
    setStrategyReport(null);
    try {
      localStorage.clear();
    } catch {}
  };

  return (
    <CultureRadarContext.Provider
      value={{
        brief,
        setBrief,
        evidence,
        setEvidence,
        concepts,
        setConcepts,
        selectedConcept,
        setSelectedConcept,
        strategyReport,
        setStrategyReport,
        inspectedEvidence,
        setInspectedEvidence,
        loadSampleBrief,
        resetAll
      }}
    >
      {children}
    </CultureRadarContext.Provider>
  );
}

export function useCultureRadar() {
  const context = useContext(CultureRadarContext);
  if (!context) {
    throw new Error('useCultureRadar must be used within a CultureRadarProvider');
  }
  return context;
}
