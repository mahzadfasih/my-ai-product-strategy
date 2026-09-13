# Cost Curve & Pricing Strategy

Leader: Run validation during project execution.
Filler: Set validation rules based on requirements document.
Killer: execute changes to project data based on validation results.
Killer usage: 50%
Bundle or add-on: add-on

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
| Text to Rule Set | Simple | Small | $0.005 | 50% | $0.0025 | Basic |
| Validate Project Against Rule Set | Medium | Mid | $0.005 | 30% | 0.0015 | Basic |
| Make Recommendation based on Validation| Complex | Frontier | $0.01 | 20% | 0.002 | Frontier |

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


## Pricing Model

**Current pricing:**
**Proposed AI pricing:**
**Model:** seat-based / usage-based / outcome-based / hybrid


## Board One-Pager

### Before (traditional SaaS):
- Revenue: $50/seat * 40,000
- COGS: $30,000
- Gross Margin: 98.5%
### After (AI-enabled): 
- Revenue: ($300 base + $0.1*20)*40,000
- COGS: $600,000
- Gross Margin: 95%
### Net margin shift:
- Delta margin %: -3.5%
- Delta gross $: 570,000
