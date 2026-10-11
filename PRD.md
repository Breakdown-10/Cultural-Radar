# CULTURE RADAR
## Product Requirements Document (PRD)

**Version:** 1.0  
**Product type:** AI-powered cultural intelligence and event strategy agent  
**Purpose:** Qloo Agentic Hackathon 2026  
**Status:** Proposed MVP  
**Target platform:** Responsive web application

---

# 1. Executive Summary

Culture Radar is an AI-powered event strategy agent that helps event organizers design experiences tailored to their target audiences using Qloo's cultural intelligence API.

Event organizers often rely on intuition, demographic assumptions, or generic market research when deciding which artists, food experiences, entertainment formats, and brand partnerships will resonate with an audience.

Culture Radar introduces a data-informed alternative. Users describe their event, target audience, location, and budget. The agent researches relevant cultural affinities through Qloo, evaluates candidate concepts, and generates an actionable event strategy with explanations of the cultural signals behind its recommendations.

Unlike a conventional AI event planner, Culture Radar uses Qloo as a core research and recommendation engine. Its purpose is to discover meaningful relationships across cultural categories and translate those relationships into practical planning decisions.

**Product promise:** Turn cultural intelligence into experiences people are more likely to connect with.

## 1.1 Product vision

Become a cultural intelligence copilot for event organizers, entertainment venues, festivals, and experiential marketing agencies.

## 1.2 Core value proposition

- Replace unsupported creative guesses with evidence-informed planning.
- Discover relationships between audience tastes and event components.
- Generate differentiated event concepts for different audiences.
- Explain the rationale behind each recommendation.
- Enable organizers to revise event strategies interactively.

## 1.3 Hackathon objective

Deliver a polished, working demonstration of an agent that uses Qloo's API and an LLM together to produce a meaningfully better event strategy than a generic LLM alone.

The MVP must demonstrate real API integration, agentic research, a coherent user experience, a credible business use case, and an original application of cultural intelligence.

---

# 2. Problem Statement

## 2.1 The problem

Event organizers must make interconnected decisions about:

- Event theme and positioning.
- Artists, performers, and entertainment.
- Food, beverage, and lifestyle experiences.
- Potential brand partnerships.
- Audience-specific programming.
- Budget allocation and experience priorities.

These decisions are often made using incomplete information. Basic demographic segmentation cannot fully explain cultural preferences, and generic AI assistants may produce plausible but unverified recommendations.

An event intended for one audience may feel generic or disconnected to another, even when the venue, budget, and marketing are adequate.

## 2.2 The opportunity

Qloo's API provides taste-driven insights, recommendations, entity discovery, audience-related analysis, and location-oriented insights through supported endpoints.

Culture Radar will use these capabilities to investigate cultural affinities and help an AI agent reason about event concepts.

For example, rather than simply recommending popular musicians, the system can investigate which candidate artists or cultural experiences have relevant affinities to the specified audience or anchor interests, where supported by the API.

The agent then translates those findings into a coherent event proposal.

## 2.3 Target problem statement

"Event organizers lack an accessible way to translate cultural intelligence about their target audiences into concrete, differentiated event concepts and programming decisions."

---

# 3. Target Users

## 3.1 Primary persona: Independent event organizer

**Profile:** Organizes concerts, cultural gatherings, lifestyle events, and community experiences.

**Goals:**
- Develop compelling event concepts.
- Understand audience preferences.
- Differentiate events from competitors.
- Reduce time spent on initial research.

**Pain points:**
- Limited research budgets.
- Too many programming options.
- Difficulty justifying creative decisions.
- Reliance on intuition and trend-following.

## 3.2 Secondary persona: Experiential marketing agency

**Profile:** Creates branded activations, product launches, pop-ups, and consumer experiences.

**Goals:**
- Develop culturally relevant campaign experiences.
- Find appropriate entertainment and brand collaborators.
- Present research-backed proposals to clients.

## 3.3 Future persona: Venue or festival operator

**Profile:** Manages venues, festivals, or recurring live entertainment programs.

**Goals:**
- Explore new event concepts.
- Improve programming diversity.
- Identify potential audience interests and complementary experiences.

## 3.4 Initial target market

The MVP will focus on independent event organizers and small experiential agencies.

This audience is specific enough to support a coherent workflow while allowing the product to expand later.

---

# 4. Product Goals and Non-Goals

## 4.1 Goals

1. Generate event strategies grounded in actual Qloo API results.
2. Demonstrate meaningful cross-category cultural intelligence.
3. Provide a multi-step AI agent workflow.
4. Explain the evidence behind key recommendations.
5. Allow users to compare and refine event concepts.
6. Deliver a professional, visually compelling web experience.
7. Produce a useful final event strategy report.
8. Make the application publicly accessible for hackathon judging.

## 4.2 Non-goals for the MVP

The initial release will not attempt to:

- Guarantee ticket sales, attendance, or revenue.
- Predict demand with unsupported numerical forecasts.
- Book artists or negotiate contracts.
- Purchase tickets or execute financial transactions.
- Provide a complete event operations platform.
- Replace professional event managers.
- Support every event type and geographic market.
- Claim statistically validated audience preferences without appropriate evidence.
- Use synthetic cultural data while presenting it as a real Qloo response.

The MVP will focus on research, recommendation, explanation, and planning.

---

# 5. Core Product Experience

Culture Radar should feel like a specialized event strategy workspace rather than a generic chat interface.

## 5.1 User journey

1. The user opens Culture Radar.
2. The user creates an event brief.
3. The agent validates the brief and identifies research needs.
4. The system searches and validates relevant entities using Qloo's supported lookup capabilities.
5. The agent requests relevant cultural insights from Qloo.
6. The agent analyzes the returned evidence and generates candidate event concepts.
7. The user reviews the concepts and their supporting evidence.
8. The user selects a concept and requests a detailed event plan.
9. The agent generates the final report.
10. The user can refine the plan, compare alternatives, and export the result.

## 5.2 Example user brief

"Plan a 1,000-person music and lifestyle event in Dubai for young professionals. Our budget is $100,000. We want a distinctive experience combining music, food, art, and lifestyle brands."

The system should turn this into a structured brief, identify the required research, retrieve relevant cultural evidence, and generate an event strategy.

All audience descriptions and budget figures in this example are user inputs, not claims about Qloo's data.

---

# 6. Functional Requirements

## FR-01: Event brief creation

**Priority:** P0 — Must have

The application must provide a structured form for defining an event.

Required fields:

- Event name or working title.
- Event location.
- Event type.
- Target audience description.
- Estimated attendance.
- Total budget.
- Event objectives.

Optional fields:

- Preferred cultural categories.
- Existing favorite artists, brands, venues, or other anchor entities.
- Desired atmosphere.
- Excluded themes or categories.
- Event date or time frame.
- Additional organizer notes.

**Acceptance criteria:**
- Users can submit a valid brief.
- Required fields are validated.
- Budget and attendance accept valid positive values.
- The submitted brief is displayed in a reviewable summary.
- The agent requests clarification if essential information is missing.

## FR-02: Research planning agent

**Priority:** P0 — Must have

The agent must translate the event brief into a series of research tasks.

Example tasks:

- Identify relevant cultural categories.
- Resolve anchor entities to valid Qloo entity identifiers.
- Investigate audience- or location-relevant affinities where supported.
- Retrieve candidate entities for relevant event components.
- Compare candidate concepts using available evidence.
- Identify missing evidence and limitations.

The agent should determine which queries are useful instead of sending a single generic request to Qloo.

**Acceptance criteria:**
- The agent produces a structured research plan.
- Each research task has a clear purpose.
- Research tasks use validated parameters.
- Unsupported query types are not silently fabricated.
- The interface exposes understandable progress updates.

## FR-03: Qloo API integration

**Priority:** P0 — Must have

Qloo must be a core part of the product's research and recommendation pipeline.

The implementation should use relevant supported API capabilities, potentially including:

- Entity search and entity lookup.
- Insights and recommendations.
- Audience-related insights.
- Tag-based taste analysis.
- Location-based insights.
- Analysis or comparison endpoints where appropriate and available.

The exact endpoints and parameters must be verified against the current Qloo API documentation and the hackathon-provided API access.

Documentation: https://github.com/qloo/docs-public

**Required behavior:**
1. Resolve user-provided anchor entities to valid identifiers.
2. Construct valid requests using supported parameters.
3. Retrieve real API results.
4. Normalize and store the relevant response fields.
5. Associate each finding with its source request and returned entity.
6. Provide the normalized evidence to the LLM for analysis.
7. Handle empty results, rate limits, timeouts, and invalid parameters.

**Acceptance criteria:**
- The application makes real Qloo API calls.
- Qloo credentials remain on the server.
- At least two distinct research operations are demonstrated in the primary workflow.
- Results displayed as Qloo-derived evidence originate from actual API responses.
- Failed requests do not produce fabricated success states.
- The application provides a useful fallback when a query returns no results.

## FR-04: Cultural evidence engine

**Priority:** P0 — Must have

The system must convert raw API results into structured evidence that can support event-planning decisions.

Each evidence record should contain, where available:

- Entity name and identifier.
- Entity category.
- Source API operation.
- Relevant affinity or association data.
- Location or audience context.
- Original response reference.
- Evidence limitations.

The engine must preserve the distinction between:

1. **Retrieved evidence:** What Qloo actually returned.
2. **Agent interpretation:** What the LLM infers from that evidence.
3. **Planning recommendation:** What the product proposes the organizer should do.

Affinity scores must not be presented as probabilities of attendance, ticket purchases, or event success unless independently validated for that specific purpose.

**Acceptance criteria:**
- Key recommendations can be traced to relevant retrieved evidence.
- Missing evidence is identified.
- The LLM does not invent Qloo scores or API findings.
- Evidence is available for inspection from the final report.

## FR-05: Event concept generation

**Priority:** P0 — Must have

The agent must generate three distinct event concepts from the brief and available evidence.

Each concept must include:

- Concept name.
- One-sentence positioning.
- Target audience.
- Core experience.
- Proposed programming direction.
- Candidate entertainment or cultural elements.
- Food, lifestyle, or complementary experiences.
- Potential brand partnership directions.
- Estimated budget allocation.
- Evidence supporting the concept.
- Assumptions and unresolved questions.

The three concepts should have meaningfully different creative directions, not merely different names.

For example:

- Concept A: Music-led cultural festival.
- Concept B: Design-led lifestyle gathering.
- Concept C: Food, music, and community experience.

These are illustrative directions, not predetermined Qloo recommendations.

**Acceptance criteria:**
- Three distinguishable concepts are generated.
- Each concept incorporates relevant retrieved evidence.
- Unsupported ideas are clearly identified as creative hypotheses.
- Budget allocations reconcile with the user-provided total.
- The user can select a concept for further development.

## FR-06: Recommendation explanation

**Priority:** P0 — Must have

Every major recommendation must include a concise explanation.

The explanation should answer:

- What is being recommended?
- Which retrieved evidence supports it?
- Why is it relevant to this event brief?
- What assumptions remain?
- How confident should the organizer be in the interpretation?

The product should not expose private internal reasoning. It should provide concise, evidence-based explanations and source references.

**Acceptance criteria:**
- Recommendations include understandable rationales.
- Supporting evidence is accessible.
- Unsupported conclusions are marked as hypotheses.
- No fabricated certainty or ungrounded numerical claims appear.

## FR-07: Event strategy report

**Priority:** P0 — Must have

After the organizer selects a concept, the agent must generate a comprehensive event plan.

The report should contain:

1. Executive summary.
2. Event positioning and creative direction.
3. Target audience brief.
4. Cultural intelligence findings.
5. Proposed entertainment and programming.
6. Food and complementary experiences.
7. Potential partnerships.
8. Budget allocation.
9. Suggested execution priorities.
10. Risks, assumptions, and evidence gaps.
11. Suggested next steps.

**Acceptance criteria:**
- The report is generated from the selected brief and concept.
- Recommendations remain consistent with the budget and constraints.
- The report separates evidence from suggestions.
- The report can be viewed as a polished web page.
- The user can export or download the report.

## FR-08: Interactive refinement

**Priority:** P0 — Must have

Users must be able to revise the event strategy using natural language.

Example prompts:

- "Reduce the budget by 20%."
- "Make the event more focused on live music."
- "Suggest a more accessible concept."
- "Remove the luxury brand partnerships."
- "Generate a second concept for the same audience."

The agent must update relevant parts of the plan and recalculate budget allocations where necessary.

When a change materially affects the research assumptions, the agent should retrieve new evidence rather than simply rewording the previous response.

**Acceptance criteria:**
- The user can refine a generated concept.
- Changes are reflected in the updated plan.
- Budget arithmetic remains valid.
- Material changes trigger appropriate new research.
- Previous versions are retained during the active session.

## FR-09: Concept comparison

**Priority:** P1 — Should have

Users should be able to compare the three concepts across:

- Creative differentiation.
- Relevance to the event brief.
- Breadth and quality of supporting evidence.
- Budget fit.
- Implementation complexity.
- Unresolved assumptions.

The comparison must not imply that a concept will perform better commercially unless the product has supporting validation.

## FR-10: Export and sharing

**Priority:** P1 — Should have

Users should be able to export the final strategy into a clean report format, preferably PDF.

If time permits, support a shareable read-only report URL.

## FR-11: Error handling and fallback

**Priority:** P0 — Must have

The application must handle:

- Qloo API unavailability.
- Invalid or ambiguous entities.
- Empty search results.
- Rate limits.
- LLM timeouts.
- Invalid generated tool arguments.
- Incomplete user briefs.
- Budget inconsistencies.

If the Qloo API fails, the application must disclose that cultural evidence could not be retrieved. It may offer a clearly labeled generic draft, but it must not present that draft as Qloo-informed.

## FR-12: Session persistence

**Priority:** P1 — Should have

The application should preserve the current event brief, concepts, research findings, and report during a session.

For the MVP, session storage or a lightweight database is sufficient. Full account management is not required unless needed for deployment.

---

# 7. Agent Architecture and Workflow

## 7.1 Architectural principle

Culture Radar should use a controlled agent loop rather than relying on a single large prompt.

The LLM is responsible for planning research, selecting appropriate tools, interpreting results, generating concepts, and revising plans.

Qloo is responsible for supplying cultural intelligence through its supported API.

The application backend is responsible for validation, access control, API orchestration, evidence tracking, and budget calculations.

## 7.2 High-level architecture

User interface  
→ Event brief validation  
→ Agent orchestrator  
→ Research planner  
→ Qloo lookup and insights tools  
→ Evidence normalization  
→ LLM synthesis  
→ Concept generation  
→ Budget validation  
→ Event strategy report  
→ User feedback and refinement

## 7.3 Agent tools

The agent should have access to a small set of explicitly defined tools.

**Tool 1: `search_entities`**

Find candidate entities using Qloo's entity search capabilities.

Input:
- Search term.
- Optional entity category.
- Optional filters supported by the API.

Output:
- Matching entity identifiers.
- Names and categories.
- Available metadata.
- Match status.

**Tool 2: `get_cultural_insights`**

Retrieve relevant Qloo insights for a validated research question.

Input:
- Validated entity identifiers or supported audience signals.
- Desired output category.
- Applicable location or audience constraints.

Output:
- Retrieved entities or tags.
- Available affinity data.
- Source information.
- Query status.

**Tool 3: `analyze_candidates`**

Normalize and compare retrieved candidates.

This tool can be implemented using deterministic application code where possible rather than another LLM call.

Output:
- Candidate comparison.
- Evidence coverage.
- Missing fields.
- Relevant limitations.

**Tool 4: `generate_event_concepts`**

Use the LLM to generate concept proposals from the validated evidence bundle and user constraints.

Output:
- Three structured event concepts.
- Proposed programming.
- Supporting evidence references.
- Assumptions.

**Tool 5: `validate_budget`**

Calculate and validate budget allocations using deterministic code.

Output:
- Category allocations.
- Total budget.
- Remaining contingency.
- Validation errors.

**Tool 6: `revise_event_plan`**

Update the selected concept after user feedback. Trigger additional research when the requested change requires new evidence.

## 7.4 Agent execution policy

The agent must:

- Use a bounded number of tool calls per request.
- Validate tool arguments before execution.
- Prefer structured outputs over free-form tool responses.
- Retry transient failures only within a defined limit.
- Avoid repeated searches for equivalent queries.
- Cache suitable repeated lookups where permitted.
- Never expose secrets or unrestricted internal API responses.
- Stop when the required evidence and deliverables are sufficient.

The MVP should prioritize a reliable, bounded workflow over a complex multi-agent system.

---

# 8. Technical Architecture

## 8.1 Recommended stack

**Frontend**
- Next.js.
- React.
- TypeScript.
- Tailwind CSS.
- A reusable component system such as shadcn/ui.
- Recharts for evidence and budget visualizations.

**Backend**
- Next.js server-side API routes or a dedicated Node.js backend.
- TypeScript.
- Zod for request and response validation.

**AI**
- An LLM with reliable structured-output and tool-calling support.
- A controlled agent orchestration layer.
- Schema validation for all generated concepts and reports.

**Data**
- In-memory session state for the earliest prototype.
- Supabase or PostgreSQL if persistence is needed.
- Server-side caching for repeated, appropriate API queries.

**Deployment**
- Vercel or another reliable public hosting platform.
- Server-side environment variables for API credentials.

This is a proposed stack, not a requirement of the hackathon. The implementation may use equivalent technologies.

## 8.2 Qloo integration layer

Create a dedicated Qloo client module.

Responsibilities:
- Authentication.
- Request construction.
- Parameter validation.
- Timeouts and error normalization.
- Response parsing.
- Logging and request tracing.
- Retry handling where appropriate.

Keep the Qloo API key on the server. Never embed it in client-side JavaScript or public source files.

## 8.3 Data flow

1. Receive the event brief.
2. Validate the request.
3. Ask the agent to plan the research.
4. Resolve relevant anchor entities.
5. Query appropriate Qloo insights.
6. Normalize the responses into evidence records.
7. Generate concepts from the evidence and brief.
8. Validate output schemas and budget arithmetic.
9. Return concepts and evidence to the interface.
10. Generate and validate the final report.

## 8.4 Budget calculation

Budget allocation must be handled with deterministic code, not trusted solely to the LLM.

Example budget categories:

- Entertainment and talent.
- Venue and production.
- Food and beverage.
- Experience design.
- Marketing.
- Operations.
- Contingency.

The sum must equal the stated total budget, subject to the product's explicit allocation rules.

All proposed amounts are planning estimates, not verified vendor quotes.

---

# 9. Qloo Data and Evidence Requirements

Qloo is central to the product. Its integration must be demonstrable and technically meaningful.

## 9.1 Research strategy

The agent should combine only the signals that are relevant to the user's brief and supported by the API.

Potential research dimensions include:

- Cultural affinities around anchor entities.
- Audience-related taste insights.
- Relationships across relevant entity categories.
- Geographic context.
- Tag-based analysis.
- Comparisons between candidate entities or concepts, where supported.

The product must not assume every combination of signals is supported by every endpoint.

## 9.2 Evidence schema

Each evidence record should follow a normalized structure similar to:

```json
{
  "id": "evidence_001",
  "source": "qloo",
  "operation": "insights",
  "entityId": "validated-entity-id",
  "entityName": "Example Entity",
  "entityType": "validated-category",
  "finding": "Description of the retrieved result",
  "affinityValue": null,
  "context": {
    "location": "User-provided location",
    "audience": "User-provided audience"
  },
  "limitations": []
}
```

This is an internal application schema. Actual field values and affinity data must come from verified API responses. The application must not assume that every query returns a numeric affinity score.

## 9.3 Evidence quality rules

- Prefer validated entity matches over ambiguous text matches.
- Preserve the source of each material finding.
- Do not infer causation from an observed affinity.
- Do not convert affinity scores directly into sales or attendance probabilities.
- Clearly label LLM-generated interpretations.
- Explain when results are sparse or incomplete.
- Never manufacture API evidence to improve the presentation.

## 9.4 Technical differentiation

To demonstrate that Qloo materially improves the product, the app should provide a comparison mode.

**Baseline:** Generate an event concept from the user brief using the LLM without Qloo-derived evidence.

**Culture Radar:** Generate a concept using the same brief, the same general output schema, and real Qloo evidence.

Present both outputs side by side, with evidence and differences highlighted.

This comparison is intended to demonstrate the influence of cultural intelligence. It should not claim statistically proven superiority based on a single example.

---

# 10. UI/UX Requirements

## 10.1 Design direction

The product should feel like a premium event strategy and cultural intelligence workspace.

Design principles:
- Dark, editorial visual identity.
- High-quality typography.
- Clear visual hierarchy.
- Restrained accent colors.
- Evidence cards and compact data visualizations.
- Strong loading and progress states.
- Responsive layouts for desktop and mobile.
- Minimal unnecessary chat UI.

The interface should communicate both creative inspiration and analytical credibility.

## 10.2 Screen 1: Landing page

**Headline:** Plan events people connect with.

**Subheadline:** Use cultural intelligence to turn audience insights into distinctive event experiences.

Primary CTA: `Build an event strategy`

Secondary CTA: `Explore an example`

Show a sample strategy preview with recommendations and their evidence.

## 10.3 Screen 2: Event brief builder

Use a structured form with sections:

- Event basics.
- Audience.
- Location and attendance.
- Budget.
- Cultural direction.
- Additional constraints.

Provide useful defaults and validation.

The form should feel fast to complete, not like a lengthy business questionnaire.

## 10.4 Screen 3: Research workspace

Show the agent's progress as understandable stages:

1. Understanding the event brief.
2. Resolving cultural entities.
3. Retrieving cultural insights.
4. Comparing evidence.
5. Developing event concepts.

Show actual tool status. Do not simulate completed API calls.

If an operation fails, show a clear error and a recovery option.

## 10.5 Screen 4: Concept comparison

Display three concept cards.

Each card should include:
- Concept title.
- Creative summary.
- Core experience.
- Candidate cultural elements.
- Budget overview.
- Evidence coverage.
- Key assumptions.

Primary action: `Develop this concept`

Secondary action: `Compare concepts`

## 10.6 Screen 5: Strategy dashboard

Recommended sections:

**Overview**
- Event concept.
- Target audience.
- Proposed positioning.

**Cultural insights**
- Retrieved entities and tags.
- Relevant affinities.
- Source details.
- Evidence limitations.

**Experience design**
- Entertainment.
- Food and lifestyle.
- Potential partnerships.

**Budget**
- Category allocations.
- Total planned spend.
- Contingency.

**Decision rationale**
- Why recommendations were made.
- What is supported by Qloo.
- What requires validation.

**Agent refinement**
- A natural-language input for changing the strategy.

## 10.7 Screen 6: Final report

Provide a polished report that can be read independently of the interactive interface.

Include an export action and clear metadata indicating the report's assumptions and generation date.

---

# 11. Non-Functional Requirements

## 11.1 Performance

- The interface should respond immediately to user interactions.
- Show progress during longer agent operations.
- Cache appropriate repeated requests.
- Use bounded retries and request timeouts.
- Target an initial useful result within 30 seconds under normal conditions, subject to API and LLM latency.
- If the full workflow takes longer, communicate progress rather than appearing frozen.

## 11.2 Reliability

- No unhandled API errors should crash the session.
- Partial failures must be visible.
- Budget validation must be deterministic.
- Structured LLM outputs must be validated before rendering.
- The application must have a usable recovery path after a failed request.

## 11.3 Security and privacy

- Keep API credentials on the server.
- Never log secrets.
- Avoid collecting personal information that is unnecessary for event planning.
- Do not infer sensitive personal traits from cultural preferences.
- Treat user input and external API content as untrusted data.
- Do not execute instructions embedded in retrieved content.
- Provide a way to clear session data.
- Use appropriate data retention and access controls if persistence is introduced.

## 11.4 Accessibility

- Support keyboard navigation.
- Use readable typography and sufficient contrast.
- Label all form inputs.
- Provide accessible validation messages.
- Do not rely on color alone to communicate evidence status.

## 11.5 Maintainability

- Separate frontend, agent orchestration, Qloo integration, and business logic.
- Use typed interfaces and documented schemas.
- Keep configuration in environment variables.
- Include setup instructions and reproducible development steps.
- Include automated tests for core behavior.

---

# 12. MVP Scope and Prioritization

## P0 — Required for the hackathon MVP

- Event brief builder.
- Qloo API integration.
- Entity resolution.
- At least two meaningful Qloo research operations.
- Structured evidence records.
- Bounded agent workflow.
- Three distinct event concepts.
- Evidence-based explanations.
- Budget validation.
- Final event strategy report.
- Natural-language refinement.
- Error handling.
- Public deployment.
- Public source repository and license.
- Demo video and submission materials.

## P1 — Add if time permits

- Side-by-side concept comparison.
- PDF export.
- Saved sessions.
- More advanced charts.
- Shareable reports.
- Multiple event templates.
- Additional research dimensions.
- More comprehensive automated evaluation.

## P2 — Post-hackathon

- Multi-user workspaces.
- Client collaboration.
- Vendor and venue integrations.
- Real ticketing and attendance data.
- Budget benchmarking against verified costs.
- Historical event performance analysis.
- Outcome-based model evaluation.
- Enterprise features.

The team should finish and test P0 before investing significant time in P1 or P2.

---

# 13. Success Metrics

## 13.1 Product metrics

The following are initial targets for internal testing, not measured performance claims.

| Metric | Initial target |
|---|---|
| Valid brief submission | 100% of valid test briefs |
| Successful end-to-end workflow | At least 90% of test runs |
| Concepts generated | Three per successful run |
| Evidence traceability | 100% of material Qloo-derived claims |
| Budget arithmetic | 100% of generated plans pass validation |
| Failed API calls handled gracefully | 100% of tested failure scenarios |
| Useful first result | Target within 30 seconds under normal conditions |

## 13.2 Evaluation methodology

Create a test set of at least 10 varied event briefs.

Include:
- Different event types.
- Different locations.
- Different budgets.
- Briefs with anchor entities.
- Briefs with ambiguous inputs.
- Briefs with sparse or missing cultural evidence.

For each test, evaluate:
- Relevance to the brief.
- Diversity of concepts.
- Evidence traceability.
- Budget consistency.
- Quality of explanations.
- Ability to revise the plan successfully.

Compare the Qloo-enabled output with a baseline LLM output using the same brief.

Where feasible, ask independent reviewers to assess the outputs without knowing which system produced them.

Do not report improvement percentages unless the evaluation actually supports them.

## 13.3 Hackathon success criteria

The submission is ready when:

- The deployed application works reliably.
- Qloo's contribution is obvious and demonstrable.
- The agent completes the main workflow without manual intervention.
- The final report is polished and actionable.
- The product has a specific user and credible commercial value.
- The demo clearly shows the distinction between retrieved evidence and generated recommendations.

---

# 14. Testing Strategy

## 14.1 Unit tests

Test:
- Brief validation.
- Budget calculations.
- Evidence normalization.
- Entity matching logic.
- Output schema validation.
- Error mapping.
- Prompt and tool argument validation.

## 14.2 Integration tests

Test:
- Qloo authentication.
- Entity search.
- Insights retrieval.
- API response parsing.
- Agent tool execution.
- Evidence passed into concept generation.
- Final report generation.

Use mocked API responses for automated tests where appropriate, but make it clear when a test is mocked.

## 14.3 End-to-end tests

Verify the complete user journey:

1. Submit a valid brief.
2. Complete Qloo research.
3. Generate three concepts.
4. Select a concept.
5. Generate the event plan.
6. Change a constraint.
7. Confirm that the plan updates.
8. Export the report.

## 14.4 Failure tests

Simulate:
- Invalid API keys.
- API timeouts.
- Empty search results.
- LLM failures.
- Invalid tool arguments.
- Missing budget values.
- Budget allocations exceeding the total.

The application should display useful error messages and recover where possible.

---

# 15. Delivery Roadmap

The current hackathon submission deadline is October 30, 2026, at 11:45 PM Eastern Time. The schedule below is a proposed execution plan that should be adjusted to the actual team size and remaining time.

## Phase 1: Validate the idea and API

**Deliverables:**
- Confirm the API key works.
- Test entity search and relevant insights.
- Identify supported entity types and parameters.
- Collect real example responses.
- Confirm that the intended event workflow is technically feasible.

**Exit criterion:** A working server-side Qloo integration returns usable evidence for at least one event brief.

## Phase 2: Build the core workflow

**Deliverables:**
- Event brief form.
- Research planner.
- Qloo client.
- Evidence normalization.
- Concept generation.
- Budget validation.

**Exit criterion:** One brief can produce three evidence-informed concepts.

## Phase 3: Build the product experience

**Deliverables:**
- Research workspace.
- Concept comparison.
- Strategy dashboard.
- Refinement interface.
- Final report.

**Exit criterion:** A user can complete the entire workflow without developer intervention.

## Phase 4: Reliability and evaluation

**Deliverables:**
- Integration tests.
- Error handling.
- Baseline comparison.
- Budget and evidence validation.
- Responsive UI.
- Deployment.

**Exit criterion:** The primary demo succeeds repeatedly, including after a refinement request.

## Phase 5: Submission preparation

**Deliverables:**
- Public demo URL.
- Public repository with license.
- README and setup instructions.
- Concise project description.
- Demo video under three minutes.
- Final verification of all submission fields.

**Exit criterion:** Judges can understand, access, and evaluate the project independently.

---

# 16. Three-Minute Hackathon Demo

The demo must show the product working, not just slides or mockups.

## 0:00–0:20 — The problem

Explain that event organizers often use generic demographics and intuition to design experiences.

Show the Culture Radar landing page.

**Narration:** "Two audiences can look similar on paper but connect with very different cultural experiences. Culture Radar helps organizers explore those differences."

## 0:20–0:45 — Enter the brief

Submit a concrete event brief with a location, audience, event type, and budget.

Show the system validating the inputs and planning its research.

## 0:45–1:20 — Demonstrate Qloo

Show actual entity resolution and Qloo research activity.

Display retrieved entities or tags and relevant evidence.

Explain how the cultural evidence informs the event strategy.

## 1:20–1:50 — Reveal the concepts

Show three distinct event concepts with supporting evidence and budget summaries.

Highlight one unexpected but defensible cultural connection discovered through the research.

## 1:50–2:20 — Show the strategy

Open the selected concept's final report.

Demonstrate how entertainment, complementary experiences, and potential partnerships form a coherent plan.

## 2:20–2:40 — Demonstrate agency

Change a major constraint, such as the budget or event format.

Show the agent revising the plan and performing new research where necessary.

## 2:40–3:00 — Close with impact

Show the baseline comparison and the final evidence-backed plan.

**Closing line:** "Culture Radar turns cultural intelligence into event strategies organizers can understand, refine, and act on."

---

# 17. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Qloo does not support an expected query | Verify API capabilities early and adapt the workflow to supported endpoints |
| Cultural results are sparse | Use alternative valid signals, disclose gaps, and avoid inventing evidence |
| The LLM fabricates explanations | Require evidence references and validate claims against retrieved records |
| The agent is too slow | Bound tool calls, cache suitable results, and show progress |
| Concepts look generic | Use explicit audience constraints, evidence-guided generation, and concept diversity checks |
| Budget numbers are unrealistic | Label them as estimates and allow organizers to edit them |
| Too many features delay delivery | Finish the P0 workflow before adding secondary features |
| API credentials leak | Use server-side secrets and exclude credentials from logs and source control |
| Demo fails during judging | Deploy early, test the public application, and prepare a clearly labeled recorded walkthrough |
| Commercial claims exceed the evidence | Describe cultural affinities as decision support, not guaranteed business outcomes |

---

# 18. Final Product Differentiation

Culture Radar must not position itself as simply another AI event planner.

Its differentiating capabilities are:

1. Cultural intelligence retrieved through Qloo.
2. Research that connects cultural insights to event components.
3. An agent that uses evidence to develop and revise event concepts.
4. Explanations that distinguish API findings from AI-generated hypotheses.
5. A concrete event strategy report with validated budget calculations.
6. A transparent comparison between a generic LLM baseline and the Qloo-enabled workflow.

The key product question is:

**Would the event strategy materially change if Qloo were removed?**

If the answer is no, the integration is too shallow and the product needs to be redesigned.

---

# 19. Definition of Done

Culture Radar's MVP is complete when all of the following are true:

- [ ] A user can submit a valid event brief.
- [ ] The application performs real Qloo API requests.
- [ ] The agent resolves and validates relevant entities.
- [ ] Cultural evidence is normalized and traceable.
- [ ] Three distinct event concepts are generated.
- [ ] Major recommendations include evidence-based explanations.
- [ ] Budget allocations are calculated and validated by code.
- [ ] A complete event strategy report is produced.
- [ ] The user can refine the strategy conversationally.
- [ ] Material changes trigger new research when appropriate.
- [ ] API and LLM failures are handled gracefully.
- [ ] No fake Qloo findings are presented as real.
- [ ] The application is deployed and accessible.
- [ ] The public repository contains setup instructions and an open-source license.
- [ ] The demo video shows the working product within the permitted duration.
- [ ] The final submission materials are complete and accurate.

---

# 20. Final Product Statement

**Culture Radar is an AI-powered cultural intelligence agent that helps event organizers create more relevant, distinctive experiences by translating Qloo's taste insights into evidence-informed event strategies.**

It combines cultural research, agentic reasoning, transparent recommendations, and practical planning into a single workflow.

The MVP will focus on one clear job: helping an organizer move from an event brief to a defensible, culturally informed event concept and actionable strategy.

Its success will depend not on the number of features it offers, but on how clearly it demonstrates that Qloo's cultural intelligence changes the decisions the agent makes.