# Compounding System Design
## Feedback Loops

| Loop | Input | Output | Compounds? | Status |
|------|-------|--------|-----------|--------|
| Recursive Learning | Same rule surfaced across more that 100 customers' requirements | Add the rule as predefined in suggestion box | Y | active |
| Cross-Domain Transfer | Count of cost validation runs | Insight to PM to improve cost management features | N | missing |
| Network Intelligence | User corrections to built rules | Update golden rules | Y | active |

**Broken loop identified by partner:** Network Intelligence. Golder rules are not updated based on user corrections.
**Fix plan:** Provide PM with a report of changes -> PM update the golden set and open ticket

## Context Connectivity
<!-- How does knowledge flow across teams and domains? Where does it silo? -->

**How knowledge flows:** Product instrumentation > Usage insights > Product Manager > Prioritized backlog items to model team

**Where it silos:** Usage insight does not expand to dependent products and stay with the model PM.


## Governance Policy

**Scope:** AI features in the Validation platform in rule set up, validation run, report generation, and project updates. Excludes: Security requirements will be covered by Security team.

**Autonomy boundaries:** Auto-generate rules based on requirements documents., human approval required. Run validation against rules., auto. Make changes to project based on validation results., never auto.

**Escalation triggers:** 1. confidence is less than 70% in response. 2. any actions that require changing existing project data.

**Audit cadence:** Daily, eval (Engineering Manager). Monthly, golden data set (Product Manager). Weekly, hallucination rate (Product Manager).

**Regulatory exposure (EU AI Act / other):** GDPR, CPRA. Risk tier: limited. Controls: Model training on anonymized data, no agentic access to PII, provide option to users to request their data and information to be deleted..

## Agent Topology

Rule builder: reads requirements documents, builds rules in system. A project manager approves the list of rule sets. agent can't modify existing rules, or edit the requirements documents.
Project modifier: changes project data based on validation results. A project manager approves all changes. agent can't modify project data without approval.


## Shadow AI Audit

Shadow AI Audit (user-side), Module 5

## Discover, User-Side Workarounds
- customers provide requirements documents to ChatGPT to derive rules | source: User interview | signal: Workflow gap | freq: H | spend: $20/mo | decision: Build
- customers run our reports with ChatGPT to provide exec summary | source: User interview | signal: Capability gap | freq: M | spend: $0/mo | decision: Ignore
- customers build in-house agents to act on validation results | source: API pattern | signal: Workflow gap | freq: H | spend: $50/mo | decision: Build

## Pattern Assessment
- Workarounds found: 3
- Build candidates: 2
- Partner candidates: 0
- Ignore decisions: 1
- Adjacent spend: $70/mo
- Dominant signal: Workflow gap

## Action Plan
### Build
Building rulesets and applying changes to project data are opportunity spaces to drive revenue and preserve value of proprietary data. 

### Partner
·

### Ignore + Monitor
Producing exec summary reports based on validation outcomes is not a high priority for us to build as it won't drive revenue or impact customer adoption or retention. 

## Roadmap Brief
Based on your audit: 3 user-side workarounds discovered.
Decisions: 2 build · 0 partner · 1 ignore · 0 TBD.
Estimated adjacent spend: $70/mo across surveyed users.
Dominant signal: Workflow gap.

Recommended next step: Workflow gaps dominate, your users are stitching your product into multi-step pipelines. Strongest near-term move is partner integrations with the AI tools they already chain in.

Sequence the Build column by frequency × strategic relevance. Confirm Partner candidates with the external tools' partnership teams. Re-run this audit each quarter, workarounds shift fast.

