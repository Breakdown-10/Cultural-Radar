/**
 * Qloo Cultural Intelligence API Type Definitions
 * Based on official documentation: https://docs.qloo.com/reference/api-overview
 */

export type QlooEntityType =
  | 'urn:entity:artist'
  | 'urn:entity:brand'
  | 'urn:entity:place'
  | 'urn:entity:destination'
  | 'urn:entity:book'
  | 'urn:entity:movie'
  | 'urn:entity:person'
  | 'urn:entity:podcast'
  | 'urn:entity:tv_show'
  | 'urn:entity:video_game';

export type QlooSearchType =
  | QlooEntityType
  | 'urn:entity:actor'
  | 'urn:entity:album'
  | 'urn:entity:author'
  | 'urn:entity:director'
  | 'urn:entity:locality';

export interface QlooEntityProperties {
  name?: string;
  category?: string;
  subtype?: string;
  genres?: string[];
  description?: string;
  images?: { url: string; width?: number; height?: number }[];
  location?: {
    city?: string;
    metro?: string;
    region?: string;
    country?: string;
    lat?: number;
    lon?: number;
    address?: string;
  };
  external_urls?: Record<string, string>;
  quality_score?: number;
  popularity?: number;
  [key: string]: unknown;
}

export interface QlooEntity {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  popularity?: number;
  score?: number;
  properties?: QlooEntityProperties;
  tags?: { id: string; name: string; type?: string }[];
}

export interface QlooSearchParams {
  query: string;
  types?: QlooSearchType[];
  filterLocation?: string; // "lat,lon" or WKT point or Qloo UUID
  filterRadius?: number;   // In miles, defaults to 10
  take?: number;           // Results limit
  page?: number;
  sortBy?: 'match' | 'distance' | 'popularity';
}

export interface QlooInsightsParams {
  filterType: QlooEntityType;
  signalInterestsEntities?: string[]; // Qloo entity IDs
  signalInterestsTags?: string[];     // Qloo tag IDs
  signalDemographicsAudiences?: string[];
  signalLocation?: string;
  biasTrends?: 'off' | 'very_low' | 'low' | 'mid' | 'medium' | 'high' | 'very_high';
  biasQuality?: 'very_low' | 'low' | 'mid' | 'medium' | 'high' | 'very_high' | number;
  take?: number;
  offset?: number;
}

export interface QlooTagSearchParams {
  query: string;
  types?: string[];
  take?: number;
}

export interface QlooTag {
  id: string;
  name: string;
  type?: string;
  category?: string;
}

export interface QlooApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    take?: number;
    executionTimeMs?: number;
  };
  error?: {
    code: number;
    message: string;
    details?: unknown;
  };
}
