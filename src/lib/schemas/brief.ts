import { z } from 'zod';

export const EventBriefSchema = z.object({
  id: z.string().default(() => `brief_${Date.now()}`),
  name: z.string().min(2, 'Event name must be at least 2 characters'),
  location: z.object({
    city: z.string().min(2, 'City is required'),
    country: z.string().min(2, 'Country is required'),
    venueType: z.string().optional(),
    coordinates: z
      .object({
        lat: z.number(),
        lon: z.number()
      })
      .optional()
  }),
  eventType: z.enum([
    'concert_festival',
    'branded_activation',
    'lifestyle_gathering',
    'culinary_experience',
    'art_exhibition',
    'corporate_gala'
  ]),
  targetAudience: z.object({
    demographicSummary: z.string().min(3, 'Audience summary is required'),
    interests: z.array(z.string()).default([]),
    vibeOrAtmosphere: z.string().min(2, 'Desired vibe/atmosphere is required')
  }),
  estimatedAttendance: z
    .number()
    .int()
    .positive('Attendance must be a positive number')
    .min(10, 'Minimum attendance is 10'),
  totalBudget: z
    .number()
    .positive('Budget must be greater than 0')
    .min(1000, 'Minimum budget is 1,000'),
  currency: z.string().default('USD'),
  objectives: z.array(z.string()).default([]),
  anchorEntities: z
    .object({
      artists: z.array(z.string()).default([]),
      brands: z.array(z.string()).default([]),
      places: z.array(z.string()).default([])
    })
    .default({ artists: [], brands: [], places: [] }),
  excludedThemes: z.array(z.string()).default([]),
  createdAt: z.string().default(() => new Date().toISOString())
});

export type EventBrief = z.infer<typeof EventBriefSchema>;
