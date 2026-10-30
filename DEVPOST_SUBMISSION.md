# 🧭 Culture Radar — Devpost Submission Kit

> **Official Entry for Qloo Agentic Hackathon 2026**  
> *"Agents, but with taste"*

---

## 📌 Project Overview

- **Project Name:** Culture Radar
- **Tagline:** Autonomous AI Event Strategist Powered by Qloo Cultural Intelligence & Deterministic Financial Balancing
- **Primary Category / Track:** Agentic Applications / Culture & Taste AI
- **Repository:** https://github.com/Breakdown-10/Cultural-Radar.git
- **Live Demo URL:** *[Insert your Vercel deployment URL]*
- **Video Demo (YouTube/Vimeo):** *[Insert your public YouTube/Vimeo video URL]*

---

## 💡 The Story Behind Culture Radar

### Inspiration
The global live events and experiential marketing industry exceeds **$1.5 Trillion annually**, yet over **70% of brand activations and cultural gatherings fail to resonate deeply with their target audiences**. 

Why? Because organizers and creative agencies are trapped between two flawed planning paradigms:
1. **Human Bias & Demographic Stereotypes:** Guessing attendee tastes based on coarse age brackets or subjective committee opinions.
2. **Generic LLM Hallucinations:** Prompting standard LLMs like ChatGPT or Claude yields generic, mainstream clichés—recommending top-40 pop headliners, generic mass-market energy drinks, and uninspired venue concepts that feel interchangeable in any city.

We asked: **What if an autonomous AI agent possessed empirical cultural taste?**  
What if, instead of guessing, an agent could query 250 million real cultural affinity correlations to craft mathematically balanced, authentic, and distinctive event strategies?

That is **Culture Radar**.

---

## ⚡ What Culture Radar Does

Culture Radar is an autonomous, end-to-end event strategy agent. Planners provide an event name, location, audience psychographic summary, total budget, and anchor artists or brands. Culture Radar then autonomously executes a 5-stage orchestration pipeline:

1. **Structured Intake & Audience Profiling (`/brief`)**: Validates location signals, host city acoustics, scale, and anchor tastes.
2. **Qloo Entity Resolution (`/search`)**: Resolves arbitrary user input into verified Qloo entity UUIDs with popularity metrics.
3. **Cross-Domain Taste Affinity Engine (`/v2/insights`)**: Queries Qloo's taste graph across three critical event verticals:
   - **Performers & Sonic Acts** (`urn:entity:artist`)
   - **Brand Partners & Sponsors** (`urn:entity:brand`)
   - **Culinary & Venue Destinations** (`urn:entity:place`)
4. **Evidence Normalization & Provenance Tracking**: Converts raw affinity scores into verifiable evidence records with clear data limitations.
5. **Tri-Concept & Deterministic Financial Synthesis (`/concepts`)**:
   - Generates **3 culturally differentiated concepts**:
     - *Concept 1:* Music & Sonic-Led (acoustics, vinyl culture, downtempo)
     - *Concept 2:* Design & Spatial Atmosphere (olfactive fragrance, minimal architecture)
     - *Concept 3:* Gastronomy & Community Gathering (communal dining, regional spice pairings)
   - Enforces a **Zero-Drift Budget Allocation**: Enforces code-level mathematical reconciliation across 7 production pillars (Talent, Venue, F&B, Experience Design, Marketing, Operations, Contingency). Budget sum **always equals exactly 100.00%** of total budget down to the exact dollar.
6. **Baseline Comparison Benchmark**: Features a side-by-side comparison mode contrasting Culture Radar against a conventional LLM baseline to prove how Qloo cultural intelligence materially shifts strategic outcomes.
7. **Comprehensive Strategy Visualizer & PDF Export (`/strategy/[id]`)**: Full interactive dashboard with Recharts Cultural Radar, Recharts Budget Donut, 4-phase production timeline, operational risk registry, and natural-language strategy refinement.

---

## 🛠️ How We Built It

- **Frontend & Framework:** Next.js 15 (App Router, React 19, Server & Client Components) with TypeScript.
- **Styling & Visual Design:** Tailwind CSS v4 with custom cyber-luxe dark palette, glassmorphism, and responsive layout.
- **Visual Analytics:** Recharts (`RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PieChart`, `Cell`, `Tooltip`, `Legend`).
- **Cultural Intelligence Core:** Typed Qloo API client communicating with `https://hackathon.api.qloo.com`:
  - `GET /search`: Anchor entity resolution with fuzzy query matching.
  - `GET /v2/insights`: Affinity correlation mining with `filter.type`, `signal.interests.entities`, and trend bias weighting.
  - `GET /v2/tags`: Cultural taste taxonomy integration.
  - In-memory TTL cache and exponential backoff retry on HTTP 429 rate limits.
- **Agent Orchestrator & LLM:** Google Gemini (`@ai-sdk/google` via Vercel AI SDK) with structured Zod schemas (`generateObject`), coupled with an automatic fallback synthesis engine to guarantee zero downtime.
- **Deterministic Financial Engine:** Pure TypeScript algorithm allocating exact budgets with integer remainder redistribution, preventing AI math hallucinations.
- **Testing & Quality Assurance:** Comprehensive Vitest suite with 13 automated tests covering the Qloo client, budget allocator, and agent pipeline.

---

## 🥊 The Differentiator: Culture Radar vs. Generic LLM Baseline

| Feature | Generic LLM Strategy | Culture Radar (Qloo-Powered) |
|---|---|---|
| **Performer Curation** | Mainstream Top-40 pop & generic EDM DJs | Nuanced downtempo, global groove, and indie acts with measured affinity (e.g. Khruangbin -> Bonobo -> Arc De Soleil) |
| **Sponsor Alignment** | Mass-market soda or energy drink brands | High-synergy botanical luxury, minimalist EV, and niche craft partners (e.g. Aesop, Polestar, Diptyque) |
| **Culinary & Venue Fit** | Generic catering trucks or hotel ballrooms | Contextually matched local roasters and artisan chocolatiers (e.g. Nightjar Coffee, Mirzam) |
| **Budget Reliability** | Hallucinated figures that don't add up to the total | 100% code-enforced mathematical reconciliation across all 7 production pillars |
| **Data Provenance** | Zero evidence; unverified claims | Traceable Evidence Registry linking every recommendation to Qloo affinity scores |

---

## 🧗 Challenges We Overcame

1. **Normalizing Heterogeneous Qloo Payloads:** Qloo's `/search` returns entity arrays with `entity_id` and `types[]`, whereas `/v2/insights` returns structured objects `{ results: { entities: [...] } }`. We built a robust normalizing adapter (`normalizeQlooEntity`) that seamlessly resolves types, popularity scores, and metadata into unified TypeScript schemas.
2. **Place Insights Signal Requirements:** Discovered that Qloo requires at least one active interest signal for `urn:entity:place` queries. We connected resolved anchor entity UUIDs directly into the place insights signal stream.
3. **Zero-Drift Financial Allocation:** Floating-point division often introduces rounding drift ($100,000 budget resulting in $99,999.98). We engineered an exact integer remainder allocation algorithm that reconciles every single dollar.
4. **Resilient Dual-Mode Synthesis:** Integrated Google Gemini structured output with automatic graceful degradation to ensure the application never crashes even during external API traffic spikes.

---

## 🏆 Accomplishments We're Proud Of

- Built a **non-trivial, production-grade agent** that addresses a genuine, multi-billion-dollar business problem rather than a novelty gimmick.
- Demonstrated **clear, measurable value of Qloo's Taste Graph** via the built-in Baseline Benchmark comparison.
- Achieved **100% test coverage on core engines** with 13 passing Vitest unit and integration tests.
- Designed an intuitive, high-polish user interface that feels like a professional enterprise SaaS tool.

---

## 📚 What We Learned

- Cultural affinities are multi-dimensional: fans of indie psychedelic funk don't just listen to similar bands—they purchase specific skincare brands, drive specific automotive brands, and frequent specific third-wave coffee roasters.
- Qloo's cross-category correlation engine provides the exact connective tissue that autonomous AI agents need to transition from generic reasoning to authentic, domain-expert decision making.

---

## 🚀 What's Next for Culture Radar

- **Live Ticketing & Venue Availability Integration:** Hooking into live booking APIs (Resident Advisor, Eventbrite, Pollstar) to cross-reference Qloo affinities with artist tour routing.
- **Sponsor ROI Pitch Deck Generator:** Instant 1-click export of data-backed sponsorship pitch decks demonstrating audience taste overlap to potential brand partners.
- **Multi-City Tour Optimizer:** Extending the agent to route multi-stop festival tours based on regional taste affinity heatmaps.

---

## 🏷️ Built With Tags (For Devpost)

`qloo-api`, `next.js`, `react`, `typescript`, `google-gemini`, `ai-sdk`, `tailwind-css`, `recharts`, `zod`, `vitest`

---

## 🧪 Testing Instructions for Hackathon Judges

1. **Option A: Live Hosted Application (Recommended)**
   - Visit the live URL: *[Insert your Vercel deployment URL]*
   - Click **"Explore Dubai Showcase"** on the landing page for an instant 1-click walkthrough.
   - Watch the **Cultural Research Workspace (`/research`)** dynamically resolve entities and query Qloo insights across 5 telemetry stages.
   - On the **Concepts (`/concepts`)** page, click **"Compare with Generic LLM"** to toggle the side-by-side baseline benchmark.
   - Select any concept to enter the **Strategy Dashboard (`/strategy/[id]`)**. Explore the interactive Cultural Radar chart, Budget Donut, production timeline, and test the **Interactive Strategy Refinement** input (e.g., type *"Reduce budget by 15%"*).
   - Click **"Print to PDF"** for an executive client report.

2. **Option B: Running Locally**
   ```bash
   git clone <repo-url>
   cd "cultural-radar"
   npm install
   cp .env.example .env.local
   # Add your QLOO_API_KEY and GOOGLE_GENERATIVE_AI_API_KEY
   npm run dev
   # Open http://localhost:3000
   ```
   To run automated test suite:
   ```bash
   npm test
   ```
