import { z } from 'zod';

export const CulturalEvidenceRecordSchema = z.object({
  id: z.string(),
  source: z.enum(['qloo', 'qloo_mock_fixture', 'fallback']),
  operation: z.enum(['search', 'insights', 'tags']),
  entityId: z.string(),
  entityName: z.string(),
  entityType: z.enum([
    'urn:entity:artist',
    'urn:entity:brand',
    'urn:entity:place',
    'urn:entity:podcast',
    'urn:entity:book',
    'urn:entity:movie',
    'urn:entity:tag'
  ]),
  finding: z.string(),
  affinityScore: z.number().min(0).max(1).optional(),
  popularity: z.number().min(0).max(1).optional(),
  queryContext: z.object({
    queriedAnchor: z.string().optional(),
    locationContext: z.string().optional(),
    targetCategory: z.string().optional()
  }),
  rawReference: z.record(z.string(), z.unknown()).optional(),
  limitations: z.array(z.string()).default([])
});

export type CulturalEvidenceRecord = z.infer<typeof CulturalEvidenceRecordSchema>;
