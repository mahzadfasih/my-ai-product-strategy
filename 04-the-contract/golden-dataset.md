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
| Accuracy | 92% | Weekly · 300 golden rows · LLM-as-Judge (GPT-4o, accuracy rubric) | <88% → route to human review queue |
| Hallucination rate | <1% | Same weekly run · safety rubric flags fabricated policies/numbers | >2% → auto-rollback to last good model |
| Latency (p95) | <800ms | Continuous prod monitoring (Datadog) · p95 by endpoint | >5s for 60min → page on-call |
| Drift velocity | <0.5%/wk | 4-week rolling accuracy trend vs. golden dataset | >1% decay/wk → trigger gold-set audit |

## HITL Architecture

**Trigger:** Confidence <60% OR safety rubric flag fires on a customer-facing output

**Reviewer:** Rotating PM on call (weekday 9-5 ET) · senior CSM after hours

**Feedback loop:** Reviewer corrections feed back into the weekly gold-set audit. 5+ corrections in a week triggers a model retrain candidate.


## Red-Team Findings
*What failure mode did your partner find that you missed?*
