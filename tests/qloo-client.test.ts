import { describe, it, expect, beforeEach } from 'vitest';
import { QlooClient } from '../src/lib/qloo/client';
import { qlooCache } from '../src/lib/qloo/cache';

describe('QlooClient', () => {
  beforeEach(() => {
    qlooCache.clear();
  });

  it('initializes with default hackathon base URL', () => {
    const client = new QlooClient({ apiKey: 'test-key' });
    expect(client).toBeDefined();
  });

  it('searches for cultural entities with mock fallback', async () => {
    const client = new QlooClient({ apiKey: '', useMockFallback: true });
    const res = await client.search({ query: 'Khruangbin', take: 5 });

    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].name).toBe('Khruangbin');
    expect(res.data[0].type).toBe('urn:entity:artist');
  });

  it('retrieves cross-category insights for artists', async () => {
    const client = new QlooClient({ apiKey: '', useMockFallback: true });
    const res = await client.getInsights({
      filterType: 'urn:entity:artist',
      signalInterestsEntities: ['ent_artist_khruangbin_01'],
      take: 2
    });

    expect(res.success).toBe(true);
    expect(res.data.length).toBe(2);
    expect(res.data[0].type).toBe('urn:entity:artist');
    expect(res.data[0].score).toBeDefined();
  });

  it('retrieves cross-category insights for brands', async () => {
    const client = new QlooClient({ apiKey: '', useMockFallback: true });
    const res = await client.getInsights({
      filterType: 'urn:entity:brand',
      take: 3
    });

    expect(res.success).toBe(true);
    expect(res.data.length).toBe(3);
    expect(res.data[0].type).toBe('urn:entity:brand');
  });

  it('retrieves cultural tags for taste taxonomy', async () => {
    const client = new QlooClient({ apiKey: '', useMockFallback: true });
    const res = await client.searchTags({ query: 'coffee' });

    expect(res.success).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0].name.toLowerCase()).toContain('coffee');
  });

  it('caches repeated queries in memory', async () => {
    const client = new QlooClient({ apiKey: '', useMockFallback: true });
    const res1 = await client.search({ query: 'Aesop' });
    expect(qlooCache.size()).toBe(1);

    const res2 = await client.search({ query: 'Aesop' });
    expect(res2.data[0].id).toBe(res1.data[0].id);
    expect(qlooCache.size()).toBe(1);
  });
});
