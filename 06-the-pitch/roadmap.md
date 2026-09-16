# Three-Horizon Roadmap & Board Pitch

## Roadmap
### Horizon 1, Ship (0-4 weeks)

| Initiative | Strategy Component | Why it ships now | Confidence |
|---|---|---|---|
| 1. Read documents to extract requirements | **Bet** | This is the first step of the core ValT workflow and directly enables the product promise. It is foundational capability rather than a strategic uncertainty. | H |
| 2. Use LLM to extract requirements | **Bet** | This is the AI capability that turns the input document into structured requirements, directly enabling the Orchestrator workflow described in the Bet. | H |

### Horizon 2, Validate (1-3 months)

| Initiative | Strategy Component | Hypothesis | Kill Criteria | Confidence |
|---|---|---|---|---|
| 3. Agent to write requirements as rules in a rules engine | **Guardrails** | If the agent can translate requirements into usable rules with ≥92% reliability and human approval, ValT can safely automate rule creation without compromising the trust contract. | If rule-generation accuracy does not reach ≥92% on the golden/adversarial dataset by week 6, we stop and redesign the approach. | M |
| 4. Agent to run project data against rules and populate report | **Bet** | If the agent can reliably execute the generated rules against project data and produce actionable violations, the core two-step ValT orchestration works end-to-end. | If validation results do not reach ≥92% accuracy on the golden/adversarial dataset by week 6, we stop and reassess the execution approach. | M |

### Horizon 3, Explore (3-6 months)

| Initiative | Strategy Component | What must be true first | Confidence |
|---|---|---|---|
| 5. Agent to update project data based on report | **Guardrails** | ValT must first prove high-confidence validation and establish an explicit authorization, audit, rollback, and escalation model for project-data changes. This also requires revisiting the current "never auto" autonomy boundary. | L |

### Unmapped (cut or rethink)

| Initiative | Why it's unmapped | Recommendation |
|---|---|---|
| — | All five initiatives connect directly to at least one of the five strategy components. | — |

### Mapping Disagreements

No disagreements, all user mappings stand.

**The most over-indexed horizon is H1:** the backlog is heavily weighted toward building the core pipeline, while H2 is thin on explicit **Moat/Margin** validation and H3 has only one bet testing the next level of autonomy.

**The single H3 bet I'd protect if budget got cut is #5:** it is the only initiative testing whether ValT can evolve from detecting violations to participating in remediation, which could materially expand the Orchestrator thesis.

**The one initiative I should kill today is none of these five:** #5 should not be killed, but it should remain an H3 experiment rather than quietly becoming part of the current product commitment.


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
