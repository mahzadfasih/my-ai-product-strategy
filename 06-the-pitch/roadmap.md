# Three-Horizon Roadmap & Board Pitch

## Roadmap

### Horizon 1 — Now (0-3 months)
*Quick wins. Ship with existing capabilities.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Use LLM to extract requirements from document | Directly enables the first step of ValT's core workflow: converting a requirements document into structured requirements. The capability is foundational to the product thesis. | H |


### Horizon 2 — Next (3-9 months)
*Bets. Requires new capabilities or integrations.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Agent writing requirements as rules in a rules engine | If the agent can reliably convert requirements into executable rules, ValT can automate the first agentic workflow while keeping the PM in control of rule approval. | M |
| Agent to run project data against rules and populate report | If the agent can reliably execute rules against project data and produce accurate, actionable violations, ValT can deliver the second dependent workflow and fulfill its core Orchestrator thesis. | M |
| Agent to learn common rules to improve future validations | produce reusable rules that improve validation quality across customers, ValT can create a data flywheel that becomes harder to replicate over time. | M |

### Horizon 3 — Bet (9-18 months)
*Moonshots. High uncertainty, high potential.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Agent to update project data based on report | Validation must first be highly reliable, and ValT needs an explicit authorization, audit, rollback, and escalation model for changing project data. This also requires revisiting the current "never auto" autonomy boundary. | L |
| Set permissions for user access | The product needs clearly defined roles and permissions tied to the agent boundaries, approval workflow, and access to project data | L |

## Board Pitch

**Thesis (1 sentence):**
ValT turns requirements documents into approved, executable rules and validates project data against them, reducing the manual work of compliance checking while creating a reusable rule system across projects.

**The case:**
1. Why now: Our company is moving toward connected, agentic workflows across its AEC portfolio, while project data is becoming increasingly accessible through the platform. This creates a window to prove a workflow that moves from unstructured requirements to validation against real project data. The window is limited: if we do not establish differentiated workflow value now, the underlying platform capabilities can make this type of solution increasingly easy to reproduce.
2. What's defensible: What's defensible: The proposed moat is the Data Flywheel: requirements become structured rules, rules are used across projects, and recurring rules become reusable validation assets. The current Moat score is 3/5, with Data at 5/5 and Platform at 2/5, so the defensibility is not the agent itself. It is the accumulated, domain-specific rule corpus and validation history. This moat is not proven yet: the Data Flywheel Score and Weakest Loop are still undefined. The H2 "learn common rules" bet is therefore critical to proving whether repeated usage actually creates an advantage.
3. The economics: $800K is the proposed investment, but the unit economics are not yet quantified. M3 still needs inference cost per validation, AI-adjusted gross margin, pricing model, cascading strategy, net-margin shift, and break-even. The immediate economic test is whether the labor and risk reduction from automated validation supports a sustainable price while inference costs remain bounded as usage scales. Until those numbers are established, the $800K should be treated as a staged investment to prove the business case, not as an underwritten 18-month return.

**The risks:**
1. Trust / failure modes: Trust / failure modes: The highest-consequence failure is a false negative: ValT says a project complies when it actually violates a material requirement. The current contract targets 92% reliability, uses tiered confidence, requires human review below the confidence threshold, and prevents autonomous project-data changes. The remaining gap is failure-mode coverage: the strategy does not yet identify the specific adversarial cases that could produce unacceptable false negatives. H1/H2 must establish this through a meaningful golden dataset and validation by requirement type before the product can make consequential compliance claims.
2. Scale / governance: At 10x usage, the risks are inference cost, bad rules propagating through the Data Flywheel, inconsistent validation quality, and unauthorized project-data changes. M5 contains the right autonomy boundary: agents can generate rules, but PMs approve them; validation can run automatically; project-data changes remain prohibited. The governance model still needs a concrete mechanism for promoting recurring rules, measuring whether they improve validation quality, and preventing incorrect rules from compounding across customers.
3. Competitive: The kill condition is failure to establish differentiated workflow or data advantage before platform capabilities commoditize the workflow. H2 must demonstrate that requirements can be reliably converted into executable rules, project data can be reliably validated, and repeated usage creates reusable rules that improve the product. If those three things do not materialize, H3 autonomy should not be funded.

**The ask:**

## M1 Baseline vs. Now
*Your 3-sentence AI strategy from Module 1 vs. what you'd say now:*

**M1 baseline:**

**Now:**
