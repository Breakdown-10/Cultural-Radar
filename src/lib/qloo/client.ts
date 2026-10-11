/**
 * Qloo Cultural Intelligence API Client
 * Official Base URL: https://hackathon.api.qloo.com
 * Official Auth: X-Api-Key header
 */

import {
  QlooEntity,
  QlooSearchParams,
  QlooInsightsParams,
  QlooTagSearchParams,
  QlooTag,
  QlooApiResponse
} from './types';
import { qlooCache } from './cache';
import {
  MOCK_ENTITIES_BY_QUERY,
  MOCK_INSIGHTS_BY_CATEGORY,
  MOCK_TAGS
} from './mock-fixtures';

export class QlooClient {
  private apiKey: string;
  private baseUrl: string;
  private useMockFallback: boolean;

  constructor(options?: {
    apiKey?: string;
    baseUrl?: string;
    useMockFallback?: boolean;
  }) {
    this.apiKey = options?.apiKey || process.env.QLOO_API_KEY || '';
    this.baseUrl = (
      options?.baseUrl ||
      process.env.QLOO_BASE_URL ||
      'https://hackathon.api.qloo.com'
    ).replace(/\/$/, '');
    this.useMockFallback =
      options?.useMockFallback ??
      (process.env.USE_MOCK_FALLBACK === 'true' || !this.apiKey);
  }

  /**
   * Search for cultural entities (artists, brands, places, films, etc.)
   */
  async search(params: QlooSearchParams): Promise<QlooApiResponse<QlooEntity[]>> {
    const cacheKey = `search:${JSON.stringify(params)}`;
    const cached = qlooCache.get<QlooApiResponse<QlooEntity[]>>(cacheKey);
    if (cached) return cached;

    // Use mock fallback if explicitly configured or no API key provided
    if (this.useMockFallback || !this.apiKey) {
      const normalizedQuery = params.query.toLowerCase().trim();
      let matched: QlooEntity[] = [];

      for (const [key, entities] of Object.entries(MOCK_ENTITIES_BY_QUERY)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
          matched = entities;
          break;
        }
      }

      if (matched.length === 0) {
        // Fallback generic matched entity if query not in fixtures
        matched = [
          {
            id: `ent_search_${Buffer.from(params.query).toString('hex').slice(0, 8)}`,
            name: params.query,
            type: params.types?.[0] || 'urn:entity:artist',
            popularity: 0.75,
            properties: {
              category: 'cultural_entity',
              description: `Entity matching query "${params.query}"`
            }
          }
        ];
      }

      const response: QlooApiResponse<QlooEntity[]> = {
        success: true,
        data: params.take ? matched.slice(0, params.take) : matched,
        meta: {
          total: matched.length,
          take: params.take || matched.length,
          executionTimeMs: 12
        }
      };

      qlooCache.set(cacheKey, response);
      return response;
    }

    try {
      const url = new URL(`${this.baseUrl}/search`);
      url.searchParams.append('query', params.query);

      if (params.types && params.types.length > 0) {
        params.types.forEach((type) => url.searchParams.append('types', type));
      }
      if (params.filterLocation) {
        url.searchParams.append('filter.location', params.filterLocation);
      }
      if (params.filterRadius) {
        url.searchParams.append('filter.radius', params.filterRadius.toString());
      }
      if (params.take) {
        url.searchParams.append('take', params.take.toString());
      }
      if (params.page) {
        url.searchParams.append('page', params.page.toString());
      }
      if (params.sortBy) {
        url.searchParams.append('sort_by', params.sortBy);
      }

      const res = await this.fetchWithRetry(url.toString());
      if (!res.ok) {
        return this.handleHttpError<QlooEntity[]>(res, 'search');
      }

      const data = await res.json();
      const entities: QlooEntity[] = Array.isArray(data)
        ? data
        : data.results || data.entities || [];

      const response: QlooApiResponse<QlooEntity[]> = {
        success: true,
        data: entities,
        meta: {
          total: entities.length,
          take: params.take || entities.length
        }
      };

      qlooCache.set(cacheKey, response);
      return response;
    } catch (err) {
      return {
        success: false,
        data: [],
        error: {
          code: 500,
          message: err instanceof Error ? err.message : 'Unknown search error'
        }
      };
    }
  }

  /**
   * Retrieve taste insights and recommendations across cultural categories
   */
  async getInsights(params: QlooInsightsParams): Promise<QlooApiResponse<QlooEntity[]>> {
    const cacheKey = `insights:${JSON.stringify(params)}`;
    const cached = qlooCache.get<QlooApiResponse<QlooEntity[]>>(cacheKey);
    if (cached) return cached;

    // Use mock fallback if explicitly configured or no API key provided
    if (this.useMockFallback || !this.apiKey) {
      const categoryEntities = MOCK_INSIGHTS_BY_CATEGORY[params.filterType] || [];
      const entities = params.take ? categoryEntities.slice(0, params.take) : categoryEntities;

      const response: QlooApiResponse<QlooEntity[]> = {
        success: true,
        data: entities,
        meta: {
          total: entities.length,
          take: params.take || entities.length,
          executionTimeMs: 18
        }
      };

      qlooCache.set(cacheKey, response);
      return response;
    }

    try {
      const url = new URL(`${this.baseUrl}/v2/insights`);
      url.searchParams.append('filter.type', params.filterType);

      if (params.signalInterestsEntities && params.signalInterestsEntities.length > 0) {
        url.searchParams.append(
          'signal.interests.entities',
          params.signalInterestsEntities.join(',')
        );
      }
      if (params.signalInterestsTags && params.signalInterestsTags.length > 0) {
        url.searchParams.append(
          'signal.interests.tags',
          params.signalInterestsTags.join(',')
        );
      }
      if (params.signalDemographicsAudiences && params.signalDemographicsAudiences.length > 0) {
        url.searchParams.append(
          'signal.demographics.audiences',
          params.signalDemographicsAudiences.join(',')
        );
      }
      if (params.signalLocation) {
        url.searchParams.append('signal.location', params.signalLocation);
      }
      if (params.biasTrends) {
        url.searchParams.append('bias.trends', params.biasTrends);
      }
      if (params.biasQuality !== undefined) {
        url.searchParams.append('bias.quality', params.biasQuality.toString());
      }
      if (params.take) {
        url.searchParams.append('take', params.take.toString());
      }
      if (params.offset) {
        url.searchParams.append('offset', params.offset.toString());
      }

      const res = await this.fetchWithRetry(url.toString());
      if (!res.ok) {
        return this.handleHttpError<QlooEntity[]>(res, 'insights');
      }

      const data = await res.json();
      const entities: QlooEntity[] = Array.isArray(data)
        ? data
        : data.results || data.entities || [];

      const response: QlooApiResponse<QlooEntity[]> = {
        success: true,
        data: entities,
        meta: {
          total: entities.length,
          take: params.take || entities.length
        }
      };

      qlooCache.set(cacheKey, response);
      return response;
    } catch (err) {
      return {
        success: false,
        data: [],
        error: {
          code: 500,
          message: err instanceof Error ? err.message : 'Unknown insights error'
        }
      };
    }
  }

  /**
   * Search for cultural tags and taste taxonomy
   */
  async searchTags(params: QlooTagSearchParams): Promise<QlooApiResponse<QlooTag[]>> {
    const cacheKey = `tags:${JSON.stringify(params)}`;
    const cached = qlooCache.get<QlooApiResponse<QlooTag[]>>(cacheKey);
    if (cached) return cached;

    if (this.useMockFallback || !this.apiKey) {
      const q = params.query.toLowerCase();
      const filtered = MOCK_TAGS.filter((t) => t.name.toLowerCase().includes(q));
      const results = filtered.length > 0 ? filtered : MOCK_TAGS.slice(0, 3);

      const response: QlooApiResponse<QlooTag[]> = {
        success: true,
        data: params.take ? results.slice(0, params.take) : results,
        meta: { total: results.length }
      };

      qlooCache.set(cacheKey, response);
      return response;
    }

    try {
      const url = new URL(`${this.baseUrl}/v2/tags`);
      url.searchParams.append('query', params.query);
      if (params.take) {
        url.searchParams.append('take', params.take.toString());
      }

      const res = await this.fetchWithRetry(url.toString());
      if (!res.ok) {
        return this.handleHttpError<QlooTag[]>(res, 'tags');
      }

      const data = await res.json();
      const tags: QlooTag[] = Array.isArray(data) ? data : data.tags || data.results || [];

      const response: QlooApiResponse<QlooTag[]> = {
        success: true,
        data: tags,
        meta: { total: tags.length }
      };

      qlooCache.set(cacheKey, response);
      return response;
    } catch (err) {
      return {
        success: false,
        data: [],
        error: {
          code: 500,
          message: err instanceof Error ? err.message : 'Unknown tags error'
        }
      };
    }
  }

  private async fetchWithRetry(url: string, retries: number = 2): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-Api-Key': this.apiKey,
            'Accept': 'application/json'
          },
          signal: AbortSignal.timeout(10000)
        });

        if (response.status === 429 && attempt < retries) {
          // Exponential backoff for rate limits
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        return response;
      } catch (err) {
        if (attempt === retries) throw err;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
    throw new Error('Max retries exceeded');
  }

  private async handleHttpError<T>(res: Response, endpoint: string): Promise<QlooApiResponse<T>> {
    let details: unknown = null;
    try {
      details = await res.json();
    } catch {
      // Body may not be JSON
    }

    let message = `Qloo API ${endpoint} failed with status ${res.status}`;
    if (res.status === 401) {
      message = 'Qloo 401 Unauthorized: Verify QLOO_API_KEY. Note: Hackathon keys only work against https://hackathon.api.qloo.com';
    } else if (res.status === 403) {
      message = 'Qloo 403 Forbidden: The requested entity type or parameter is not supported by your plan.';
    } else if (res.status === 404) {
      message = 'Qloo 404 Not Found: No matching entities or tags found for this query.';
    } else if (res.status === 429) {
      message = 'Qloo 429 Rate Limit Exceeded: Please wait before issuing additional queries.';
    }

    return {
      success: false,
      data: [] as unknown as T,
      error: {
        code: res.status,
        message,
        details
      }
    };
  }
}

export const qloo = new QlooClient();
