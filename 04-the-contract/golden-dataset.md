# Golden Dataset & Reliability Contract

## Golden Dataset

Dataset health
- Total: 3
- Edge cases: 1 (33.3%)
- Judge mix: 67% rule / 0% LLM / 33% both

## Golden Dataset Spec

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|-----------|-----------|
| 1 | .xls of requirements | set of rules that map to requirements | N | both |
| 2 | project data | measurement against rules | N | rule |
| 3 | .pdf of requirements | set of rules that map to the requirements | Y | rule |


**Adversarial rows included:** 3
**Coverage gaps identified by partner:**

## Confidence UX Design

**Approach:** show uncertainty / tiered confidence / human-in-loop trigger

**High confidence (>90%):**
**Medium confidence (70-90%):**
**Low confidence (<70%):**

**User control surface:**

## Reliability Contract

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| Accuracy | | | |
| Hallucination rate | | | |
| Latency (p95) | | | |
| Drift velocity | | | |

## HITL Architecture
<!-- When does a human step in? What's the escalation path? -->

## Red-Team Findings
*What failure mode did your partner find that you missed?*
