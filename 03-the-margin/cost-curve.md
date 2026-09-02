# Cost Curve & Pricing Strategy

# Margin Calculator

## Inputs
- Avg requests/user/month: 500
- Blended cost/request: $0.02
- Revenue/user/month: $80
- Non-AI COGS/user/month: $5

## Current Margin
- AI COGS/user: $10.00
- Total COGS/user: $15.00
- Gross margin: 81.3% ($65.00/user)

## Stress Test
| Scenario | AI COGS | Margin |
|----------|---------|--------|
| 3x Cost  | $30.00 | 56.3% ($45.00) |
| 2x Usage | $20.00 | 68.8% ($55.00) |

## Cost Curve
| Feature | Complexity | Model Tier | Cost/REQ | Volume % | Weighted | Forntier / Basic Model |
|--------------------|----------------|-------|-----------|----------|----------|-------------|
| Text to Rule Set | Simple | | | | | |
| Validate Project Against Rule Set | Medium | | | | | |
| Make Recommendation based on Validation| Complex | | | | | |

# Pricing Strategy
Pricing Strategy Block

Pricing Strategy
- Strategy posture: Maximize
- Pricing model: Outcome / Resolution
- Unit of work metered: reports generated
- Base fee ($/month): 300
- Price per unit: $0.1
- Estimated units/user/month: 20
- Implied revenue/user/month: $302.00

Decision Note
Why this pricing structure fits the buyer and the value delivered: This gives the customer to run validation ad-hoc based on their project needs and manage and understand their cost better.

## Cost Model

| Cost Category | Per-User/Month | Notes |
|--------------|----------------|-------|
| Inference (primary model) | | |
| Inference (cascading/triage) | | |
| Infrastructure | | |
| Data/storage | | |
| Human-in-the-loop | | |
| **Total AI COGS** | | |

## Cascading Strategy
<!-- Cheap model → frontier model routing logic -->

**Triage model:**
**Frontier model:**
**Routing rule:**
**Expected cascade ratio:**

## Pricing Model

**Current pricing:**
**Proposed AI pricing:**
**Model:** seat-based / usage-based / outcome-based / hybrid

## Stress Tests

| Scenario | Impact on Margin | Response |
|----------|-----------------|----------|
| Inference costs 3x | | |
| Heaviest segment doubles | | |
| Model provider raises prices 50% | | |

## Board One-Pager
<!-- Before/After: Old SaaS revenue vs. AI usage revenue for your product -->

Before (traditional SaaS):
After (AI-enabled):
Net margin shift:
