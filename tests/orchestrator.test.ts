import { describe, it, expect } from 'vitest';
import { orchestrator } from '../src/lib/agent/orchestrator';
import { generateBaselineConcept } from '../src/lib/agent/baseline';
import { SAMPLE_BRIEFS } from '../src/data/sample-briefs';
import { validateBudgetAllocation } from '../src/lib/budget/calculator';

describe('Agent Orchestrator Pipeline', () => {
  const brief = SAMPLE_BRIEFS[0]; // Dubai Symphony & Spice

  it('gathers and normalizes cross-category cultural evidence', async () => {
    const evidence = await orchestrator.gatherEvidence(brief);

    expect(evidence.length).toBeGreaterThan(0);
    expect(evidence[0].id).toBeDefined();
    expect(evidence[0].source).toBeDefined();
    expect(evidence[0].finding).toBeDefined();

    // Verify presence of artist, brand, and place evidence
    const types = new Set(evidence.map((e) => e.entityType));
    expect(types.has('urn:entity:artist')).toBe(true);
    expect(types.has('urn:entity:brand')).toBe(true);
    expect(types.has('urn:entity:place')).toBe(true);
  });

  it('generates 3 distinct concepts with 100% budget arithmetic reconciliation', async () => {
    const evidence = await orchestrator.gatherEvidence(brief);
    const concepts = await orchestrator.generateConcepts(brief, evidence);

    expect(concepts.length).toBe(3);

    for (const concept of concepts) {
      expect(concept.id).toBeDefined();
      expect(concept.title).toBeDefined();
      expect(concept.creativeDirection).toBeDefined();
      expect(concept.supportingEvidenceIds.length).toBeGreaterThan(0);

      // Validate budget
      const validation = validateBudgetAllocation(concept.budgetAllocation);
      expect(validation.isValid).toBe(true);
      expect(concept.budgetAllocation.total).toBe(brief.totalBudget);
    }
  });

  it('compiles a comprehensive strategy report from selected concept', async () => {
    const evidence = await orchestrator.gatherEvidence(brief);
    const concepts = await orchestrator.generateConcepts(brief, evidence);
    const report = orchestrator.generateStrategyReport(brief, concepts[0], evidence);

    expect(report.briefId).toBe(brief.id);
    expect(report.selectedConceptId).toBe(concepts[0].id);
    expect(report.executiveSummary).toBeDefined();
    expect(report.budgetBreakdown.length).toBe(7);
    expect(report.productionTimeline.length).toBeGreaterThan(0);
    expect(report.riskManagement.length).toBeGreaterThan(0);
  });

  it('produces a baseline concept with clear contrast and zero evidence IDs', () => {
    const { concept, critique } = generateBaselineConcept(brief);

    expect(concept.supportingEvidenceIds.length).toBe(0);
    expect(critique.lackOfCulturalAffinity).toBeDefined();
    expect(critique.genericAssumptions.length).toBeGreaterThan(0);
  });
});
