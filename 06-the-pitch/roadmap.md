# Three-Horizon Roadmap & Board Pitch

## Roadmap

## Horizon 1: Ship (0–4 weeks)

| Initiative | Strategy Component | Why it ships now | Confidence |
|---|---|---|---|
| 1. Use LLM to extract requirements from document | **Bet** | Directly enables the first step of ValT's core workflow: converting a requirements document into structured requirements. The capability is foundational to the product thesis. | H |

## Horizon 2: Validate (1–3 months)

| Initiative | Strategy Component | Hypothesis | Kill Criteria | Confidence |
|---|---|---|---|---|
| 2. Agent writing requirements as rules in a rules engine | **Bet** | If the agent can reliably convert requirements into executable rules, ValT can automate the first agentic workflow while keeping the PM in control of rule approval. | If fewer than 92% of generated rules are correct and usable on the golden/adversarial dataset by week 6, we stop and redesign the rule-generation approach. | M |
| 3. Agent to run project data against rules and populate report | **Bet** | If the agent can reliably execute rules against project data and produce accurate, actionable violations, ValT can deliver the second dependent workflow and fulfill its core Orchestrator thesis. | If fewer than 92% of validation results are correct on the golden/adversarial dataset by week 6, we stop and reassess the execution approach. | M |
| 5. Agent to learn common rules to improve future validations | **Moat** | If recurring requirements produce reusable rules that improve validation quality across customers, ValT can create a data flywheel that becomes harder to replicate over time. | If recurring rules do not measurably improve validation accuracy or reduce rule-authoring effort across customers by week 6, we stop and rethink the learning loop. | M |

## Horizon 3: Explore (3–6 months)

| Initiative | Strategy Component | What must be true first | Confidence |
|---|---|---|---|
| 4. Agent to update project data based on report | **Guardrails** | Validation must first be highly reliable, and ValT needs an explicit authorization, audit, rollback, and escalation model for changing project data. This also requires revisiting the current "never auto" autonomy boundary. | L |
| 6. Set permissions for user access | **Guardrails** | The product needs clearly defined roles and permissions tied to the agent boundaries, approval workflow, and access to project data. | L |

## Unmapped (Cut or Rethink)

| Initiative | Why it's unmapped | Recommendation |
|---|---|---|
| — | All six initiatives connect to at least one of the five strategy components. | — |

## Mapping Disagreements

No disagreements; all user mappings stand.

**The most over-indexed horizon is H2:** this is appropriate for the strategic core, but H1 needs enough implementation to prove the basic workflow, while H3 should stay small and focused on future autonomy and governance.

**The single H3 bet I'd protect if budget got cut is #4:** automated project updates are the clearest test of whether ValT can expand beyond reporting into an action-oriented orchestrator, although the current Guardrails deliberately prevent autonomous changes.

**The one initiative I should kill today is #6:** permissions are necessary eventually, but "set permissions" is infrastructure hygiene rather than a strategic bet; keep only the minimum permissions required for the current pilot and avoid treating it as a roadmap initiative.

## Board Pitch

**Thesis (1 sentence):**

**The case:**
1. Why now:
2. What's defensible:
3. The economics:

**The risks:**
1. Trust / failure modes:
2. Scale / governance:
3. Competitive:

**The ask:**

## M1 Baseline vs. Now
*Your 3-sentence AI strategy from Module 1 vs. what you'd say now:*

**M1 baseline:**

**Now:**
