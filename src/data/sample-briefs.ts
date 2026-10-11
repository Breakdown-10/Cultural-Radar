import { EventBrief } from '../lib/schemas/brief';

export const SAMPLE_BRIEFS: EventBrief[] = [
  {
    id: 'brief_dubai_symphony_spice',
    name: 'Symphony & Spice: Sunset to Starlight',
    location: {
      city: 'Dubai',
      country: 'United Arab Emirates',
      venueType: 'Warehouse & Open Courtyard (e.g. Alserkal Avenue / Al Quoz)',
      coordinates: { lat: 25.1412, lon: 55.2272 }
    },
    eventType: 'lifestyle_gathering',
    targetAudience: {
      demographicSummary: 'Young creative professionals, expats, and tech entrepreneurs (ages 24–38)',
      interests: [
        'Psychedelic groove & global funk',
        'Specialty single-origin coffee',
        'Minimalist architecture & botanical design',
        'Artisanal culinary pairings'
      ],
      vibeOrAtmosphere: 'Sophisticated, warm, immersive, neo-bohemian, relaxed luxury'
    },
    estimatedAttendance: 1000,
    totalBudget: 100000,
    currency: 'USD',
    objectives: [
      'Create a standout cultural experience bridging music, culinary art, and spatial design',
      'Attract high-affinity lifestyle brand sponsors',
      'Build sustained social buzz and community loyalty'
    ],
    anchorEntities: {
      artists: ['Khruangbin', 'Bonobo'],
      brands: ['Aesop', 'Polestar'],
      places: ['Alserkal Avenue']
    },
    excludedThemes: ['Generic EDM raves', 'Corporate ballroom vibes', 'Mass commercial branding'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'brief_brooklyn_neo_acoustic',
    name: 'Greenpoint Sound & Clay: Neo-Acoustic Sessions',
    location: {
      city: 'Brooklyn, NY',
      country: 'United States',
      venueType: 'Industrial Ceramics Studio & Rooftop',
      coordinates: { lat: 40.7282, lon: -73.9442 }
    },
    eventType: 'concert_festival',
    targetAudience: {
      demographicSummary: 'Independent designers, musicians, and culinary makers (ages 22–35)',
      interests: [
        'Analog vinyl listening',
        'Ceramic craft & pottery',
        'Natural low-intervention wines',
        'Indie folk & ambient electronics'
      ],
      vibeOrAtmosphere: 'Intimate, tactile, acoustic warmth, earthy modernism'
    },
    estimatedAttendance: 500,
    totalBudget: 45000,
    currency: 'USD',
    objectives: [
      'Showcase underground acoustic and downtempo talent',
      'Foster intimate maker-to-consumer conversations',
      'Partner with independent local beverage makers'
    ],
    anchorEntities: {
      artists: ['Adrianne Lenker', 'Hiss Golden Messenger'],
      brands: ['Kinfolk', 'Muji'],
      places: ['Public Records Brooklyn']
    },
    excludedThemes: ['Loud arena pop', 'Single-use plastics', 'VIP velvet ropes'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'brief_tokyo_spatial_sound',
    name: 'Omotesando Spatial Light & Echo',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      venueType: 'Modern Gallery & Multi-Sensory Atrium',
      coordinates: { lat: 35.6652, lon: 139.7123 }
    },
    eventType: 'art_exhibition',
    targetAudience: {
      demographicSummary: 'Digital art collectors, audio engineers, and fashion pioneers (ages 26–42)',
      interests: [
        'Spatial audio & ambient synth',
        'Minimalist Japanese gastronomy',
        'Generative light installations',
        'High-end acoustic hardware'
      ],
      vibeOrAtmosphere: 'Futuristic serenity, precision craft, contemplative stillness'
    },
    estimatedAttendance: 800,
    totalBudget: 85000,
    currency: 'USD',
    objectives: [
      'Pioneer a synchronized multi-sensory light and sound experience',
      'Integrate premium hardware audio partners',
      'Engage global design press and tastemakers'
    ],
    anchorEntities: {
      artists: ['Ryuichi Sakamoto', 'Nils Frahm'],
      brands: ['Sonos', 'Issey Miyake'],
      places: ['Mori Art Museum']
    },
    excludedThemes: ['Overcrowded carnival atmosphere', 'Standard DJ sets'],
    createdAt: new Date().toISOString()
  }
];
