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

**Scope:**
**Autonomy boundaries:**
**Escalation triggers:**
**Audit cadence:**
**Regulatory exposure (EU AI Act / other):**

## Agent Topology
<!-- If using agents: what can each agent do? What can't it do? Who approves what? -->

## Shadow AI Audit

| Tool | Owner | Risk Level | Decision |
|------|-------|-----------|----------|
| | | H / M / L | keep / govern / kill |
| | | H / M / L | keep / govern / kill |
| | | H / M / L | keep / govern / kill |

**Total tools found:**
**Tools after triage:**
**Estimated hidden spend:**
