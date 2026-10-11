/**
 * Baseline Control Generator (Without Qloo Evidence)
 * Satisfies PRD Section 9.4 Technical Differentiation:
 * Demonstrates the contrast between a generic LLM event plan and Culture Radar's Qloo-backed strategy.
 */

import { EventBrief } from '../schemas/brief';
import { EventConcept } from '../schemas/concept';
import { calculateBudget } from '../budget/calculator';

export function generateBaselineConcept(brief: EventBrief): {
  concept: EventConcept;
  critique: {
    lackOfCulturalAffinity: string;
    genericAssumptions: string[];
    missedOpportunities: string[];
  };
} {
  const genericConcept: EventConcept = {
    id: `baseline_${brief.id}`,
    conceptNumber: 1,
    title: `${brief.name} (Generic Baseline Concept)`,
    tagline: 'Standard live music and lifestyle party for young urbanites',
    creativeDirection: 'A standard contemporary gathering featuring commercial popular hits, generic food trucks, and conventional brand sponsors.',
    targetAudienceFit: 'Broadly targets young adults based on generic age and city demographics without empirical taste clustering.',
    coreExperience: 'Stage with sound system, perimeter food stalls, and a standard bar.',
    programming: {
      headliners: [
        {
          name: 'Mainstream Top 40 / Commercial House DJ',
          rationale: 'Generic assumption based on general city popularity, not affinity data.',
          evidenceIds: []
        }
      ],
      supportingActs: [
        {
          name: 'Local Opening DJ',
          rationale: 'Standard booking without verified audience taste connection.',
          evidenceIds: []
        }
      ]
    },
    foodAndLifestyle: {
      fnbDirection: 'Assorted commercial food trucks (burgers, tacos, generic beer).',
      candidateVendors: [
        {
          name: 'Commercial Mobile Beverage Cart',
          rationale: 'Generic vendor choice with no lifestyle brand synergy.',
          evidenceIds: []
        }
      ],
      installations: ['Photo booth backdrop with logo']
    },
    brandPartnerships: {
      candidateBrands: [
        {
          name: 'Mass Market Energy Drink / Soda Brand',
          category: 'Commercial Beverage',
          synergyRationale: 'Standard mass-market sponsor assumed for any youth event.',
          evidenceIds: []
        }
      ]
    },
    budgetAllocation: calculateBudget(brief.totalBudget, 'balanced'),
    supportingEvidenceIds: [],
    creativeHypotheses: [
      'Assumes young professionals only respond to high-tempo mainstream music',
      'Assumes attendees prioritize mass-brand freebies over craft design'
    ],
    unresolvedRisks: [
      'High risk of feeling generic, interchangeable, and unmemorable',
      'Potential backlash from design-conscious attendees regarding uncurated branding'
    ]
  };

  return {
    concept: genericConcept,
    critique: {
      lackOfCulturalAffinity:
        'Without Qloo, the AI defaults to the most generic mass-market stereotypes of the audience age group rather than uncovering nuanced cultural affinities.',
      genericAssumptions: [
        'Assumes "young professionals" want generic commercial house music instead of organic downtempo / world soul.',
        'Assumes standard energy drink sponsors instead of high-affinity botanical lifestyle or Scandinavian design brands.',
        'Zero verifiable evidence IDs supporting creative decisions.'
      ],
      missedOpportunities: [
        'Missed high-affinity crossover between specialty coffee roasteries and indie electronic music listeners.',
        'Failed to discover regional vinyl funk and artisan spice storytelling that deepens local relevance.'
      ]
    }
  };
}
