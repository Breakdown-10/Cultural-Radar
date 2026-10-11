/**
 * Qloo API Mock Fixtures for automated testing and offline fallback.
 * Realistic cultural affinities across artists, brands, and venues.
 */
import { QlooEntity } from './types';

export const MOCK_ENTITIES_BY_QUERY: Record<string, QlooEntity[]> = {
  // Dubai music & lifestyle anchors
  'khruangbin': [
    {
      id: 'ent_artist_khruangbin_01',
      name: 'Khruangbin',
      type: 'urn:entity:artist',
      subtype: 'musician',
      popularity: 0.88,
      properties: {
        category: 'music',
        genres: ['psychedelic rock', 'funk', 'world soul', 'dub'],
        description: 'American musical trio formed in Houston, Texas, known for blending global music influences.'
      }
    }
  ],
  'bonobo': [
    {
      id: 'ent_artist_bonobo_02',
      name: 'Bonobo',
      type: 'urn:entity:artist',
      subtype: 'musician',
      popularity: 0.86,
      properties: {
        category: 'music',
        genres: ['downtempo', 'ambient electronica', 'trip hop'],
        description: 'British musician, producer, and DJ based in Los Angeles.'
      }
    }
  ],
  'aesop': [
    {
      id: 'ent_brand_aesop_01',
      name: 'Aesop',
      type: 'urn:entity:brand',
      subtype: 'lifestyle_skincare',
      popularity: 0.92,
      properties: {
        category: 'luxury_lifestyle',
        description: 'Australian luxury cosmetics and botanical personal care brand known for minimalist architectural retail.'
      }
    }
  ],
  'polestar': [
    {
      id: 'ent_brand_polestar_02',
      name: 'Polestar',
      type: 'urn:entity:brand',
      subtype: 'automotive_design',
      popularity: 0.81,
      properties: {
        category: 'sustainable_design',
        description: 'Swedish electric performance car brand prioritizing progressive environmental design.'
      }
    }
  ],
  'alserkal': [
    {
      id: 'ent_place_alserkal_01',
      name: 'Alserkal Avenue',
      type: 'urn:entity:place',
      subtype: 'arts_district',
      popularity: 0.84,
      properties: {
        category: 'culture_venue',
        location: {
          city: 'Dubai',
          country: 'United Arab Emirates',
          lat: 25.1412,
          lon: 55.2272,
          address: '17th St - Al Quoz 1, Dubai'
        },
        description: 'Renowned cultural district housing contemporary art galleries, artisan dining, and concept spaces.'
      }
    }
  ]
};

export const MOCK_INSIGHTS_BY_CATEGORY: Record<string, QlooEntity[]> = {
  'urn:entity:artist': [
    {
      id: 'ent_artist_maribou_state',
      name: 'Maribou State',
      type: 'urn:entity:artist',
      subtype: 'electronic_live',
      popularity: 0.79,
      score: 0.94,
      properties: {
        genres: ['electronic', 'indie soul', 'organic downtempo'],
        description: 'English electronic music duo delivering soulful textures with live instrumentation.'
      }
    },
    {
      id: 'ent_artist_leon_vynehall',
      name: 'Leon Vynehall',
      type: 'urn:entity:artist',
      subtype: 'electronic_producer',
      popularity: 0.74,
      score: 0.91,
      properties: {
        genres: ['deep house', 'ambient house', 'leftfield'],
        description: 'British producer creating immersive sonic landscapes and rhythmic depth.'
      }
    },
    {
      id: 'ent_artist_yussef_dayes',
      name: 'Yussef Dayes',
      type: 'urn:entity:artist',
      subtype: 'jazz_contemporary',
      popularity: 0.82,
      score: 0.89,
      properties: {
        genres: ['contemporary jazz', 'afrobeat', 'broken beat'],
        description: 'Virtuoso South London drummer and composer fusing jazz with modern groove.'
      }
    },
    {
      id: 'ent_artist_habibi_funk',
      name: 'Habibi Funk',
      type: 'urn:entity:artist',
      subtype: 'dj_curator',
      popularity: 0.76,
      score: 0.95,
      properties: {
        genres: ['arabic funk', 'world groove', 'retro soul'],
        description: 'Berlin-based label and DJ collective re-discovering rare 1970s-80s North African and Middle Eastern grooves.'
      }
    }
  ],
  'urn:entity:brand': [
    {
      id: 'ent_brand_diptyque',
      name: 'Diptyque',
      type: 'urn:entity:brand',
      subtype: 'fragrance_home',
      popularity: 0.89,
      score: 0.92,
      properties: {
        category: 'sensory_lifestyle',
        description: 'Parisian luxury fragrance and scented candle maison celebrated for olfactive craftsmanship.'
      }
    },
    {
      id: 'ent_brand_kinfolk',
      name: 'Kinfolk',
      type: 'urn:entity:brand',
      subtype: 'media_lifestyle',
      popularity: 0.80,
      score: 0.88,
      properties: {
        category: 'editorial_aesthetics',
        description: 'Slow lifestyle publication and creative studio exploring slow living and design.'
      }
    },
    {
      id: 'ent_brand_sonos',
      name: 'Sonos',
      type: 'urn:entity:brand',
      subtype: 'acoustic_technology',
      popularity: 0.91,
      score: 0.87,
      properties: {
        category: 'audio_experience',
        description: 'Pioneering sound technology company delivering high-fidelity spatial listening experiences.'
      }
    },
    {
      id: 'ent_brand_mirzam',
      name: 'Mirzam Chocolate',
      type: 'urn:entity:brand',
      subtype: 'artisan_culinary',
      popularity: 0.77,
      score: 0.93,
      properties: {
        category: 'craft_gastronomy',
        description: 'Dubai-born artisanal bean-to-bar chocolate maker inspired by the historical Spice Route.'
      }
    }
  ],
  'urn:entity:place': [
    {
      id: 'ent_place_nightjar',
      name: 'Nightjar Coffee Roasters',
      type: 'urn:entity:place',
      subtype: 'craft_cafe',
      popularity: 0.81,
      score: 0.93,
      properties: {
        category: 'specialty_beverage',
        location: { city: 'Dubai', address: 'Alserkal Avenue, Al Quoz' },
        description: 'Artisanal cold brew and single-origin roastery known for craft culinary pairings and music vibes.'
      }
    },
    {
      id: 'ent_place_tomo',
      name: 'TOMO',
      type: 'urn:entity:place',
      subtype: 'japanese_dining',
      popularity: 0.85,
      score: 0.86,
      properties: {
        category: 'refined_dining',
        location: { city: 'Dubai', address: 'Raffles Dubai' },
        description: 'Authentic Japanese culinary destination featuring sunset skyline terrace views.'
      }
    },
    {
      id: 'ent_place_cinema_akil',
      name: 'Cinema Akil',
      type: 'urn:entity:place',
      subtype: 'indie_cinema_space',
      popularity: 0.79,
      score: 0.90,
      properties: {
        category: 'experiential_arts',
        location: { city: 'Dubai', address: 'Warehouse 68, Alserkal Avenue' },
        description: 'Independent arthouse platform and retro-styled screening space hosting cultural events.'
      }
    }
  ]
};

export const MOCK_TAGS = [
  { id: 'tag_genre_downtempo', name: 'Downtempo', type: 'genre', category: 'music' },
  { id: 'tag_vibe_neo_bohemian', name: 'Neo-Bohemian', type: 'aesthetic', category: 'lifestyle' },
  { id: 'tag_culinary_specialty_coffee', name: 'Specialty Coffee', type: 'culinary', category: 'fnb' },
  { id: 'tag_lifestyle_sustainable_design', name: 'Sustainable Design', type: 'ethos', category: 'design' },
  { id: 'tag_music_afro_house', name: 'Afro House', type: 'genre', category: 'music' },
  { id: 'tag_culinary_craft_cocktails', name: 'Artisan Mixology', type: 'culinary', category: 'fnb' }
];
