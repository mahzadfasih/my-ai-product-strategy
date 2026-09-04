# Golden Dataset & Reliability Contract

## Golden Dataset

Dataset health
- Total: 3
- Edge cases: 1 (33.3%)
- Judge mix: 67% rule / 0% LLM / 33% both

## Golden Dataset Spec

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|-----------|-----------|
| 1 | All corridors must have a minimum clear width of 1500 mm. | Corridor width > 1500 mm | N | rule |
| 2 | Cost code = value | Calculated project cost | N | both |
| 3 | Combustible cladding = value | Fire hazard identified | Y | rule |


Dataset health
- Total: 3
- Edge cases: 1 (33.3%)
- Judge mix: 67% rule / 0% LLM / 33% both


## Confidence UX Design

**Approach:** tiered confidence for information and human-in-loop trigger for actions

**Confident (>90%):** Short answer. no reference required.

**Uncertain (50-90%):** Highlight as uncertain answers.

**Not confident (<50%):** Don't generate. Show an error message that validation failed.

**User control surface:** 

- Users correct & override outputs
- Corrections feed back into the model / dataset
- Users adjust the confidence threshold _(not yet)_
- Users see AI reasoning / drivers _(not yet)_


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
