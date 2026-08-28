# The Prototype Bet

## What I Built
**ValT** — a one-page web app where a project manager uploads project requirements and a project file, presses **Execute**, and gets back the list of project areas
that are not compliant with those requirements.

## Tool Used
Claude Code. Self-contained static app — no build step, no server, no login, no key.

- `prototype/index.html` — UI (dark theme, single page)
- `prototype/engine.js` — the three-stage validation engine
- `prototype/test.html` — 71 assertions over the engine; open it in a browser, or run headless:
  `chrome --headless=new --no-sandbox --dump-dom prototype/test.html`
- `prototype/samples/` — a requirements doc and an element schedule to drag in

## Prototype Link
Local: open `01-the-bet/prototype/index.html` in a browser.
Add `#demo` to self-run against the bundled samples: `index.html#demo` (or `#demo=table`).

Shareable: enable GitHub Pages on this repo (Settings → Pages → deploy from `main`), which
publishes it at `https://mahzadfasih.github.io/my-ai-product-strategy/01-the-bet/prototype/`.
**Not yet enabled** — link goes live once Pages is turned on.

## AI Value Archetype
**Orchestrator.** ValT does not answer a question or draft content; it chains two dependent
steps into one action. Requirements document → validation rules → applied against project data
→ ranked exceptions. The PM presses one button; the system decides what to check and what to
check it against.

## The Bet in One Sentence
For project managers who today check requirement compliance by hand, ValT reads the requirements
document itself, derives the rules from it, and returns the specific project areas that violate
them — so compliance checking becomes an action you take, not a spreadsheet you maintain.

## Kill Criteria
<!-- Yours to set — this is the judgment call the prototype is meant to inform. The three things
     the build surfaced as worth measuring:

     1. Rule-derivation fidelity. On a real requirements document, what share of rules does the
        model derive correctly? A PM will not trust the output if they have to re-read the spec
        to check the rules. What hit rate is your floor?
     2. Field resolution. ValT must map "responsible discipline" in the spec to `discipline` in
        the project file. On real exports with real naming conventions, how often does that
        mapping fail? Every miss lands as "unverifiable", which is honest but useless at volume.
     3. Willingness to act. Do PMs act on the flagged areas, or file them? If the output is read
        and ignored, the AI moment is a demo, not a product.

     What evidence would make you stop? -->

---

## Notes from the build

**What the prototype does for real.** Rule derivation and validation both actually run on the
uploaded files. It parses normative statements (`must` / `shall` / `should` / `must not`) into
typed predicates — presence, allowed-value set, numeric threshold, forbidden content — resolves
each rule's attribute against the project record's field names by fuzzy match, normalises units
across mm/cm/m, and evaluates per record. Change a value in the sample JSON and the findings
change. Nothing is hardcoded.

**Three severities, and why the middle one matters.** Violated `must` → Critical. Violated
`should` → Advisory. A mandatory rule whose attribute is **absent from the project data** →
Unverifiable. That third state was the most interesting thing to come out of building it: the
honest answer is often "your project file cannot answer this requirement," which is a different
problem for a PM than a violation, and a validator that silently passes those is lying. The run
also reports rules that matched **no** records at all — a scope gap in the data, not a pass.

**What is faked.** The reasoning layer is a deterministic parser, not a model call, so the demo
runs offline with no key and no latency. Production swaps `extractRules()` for one structured
LLM call over the requirements document. This matters for the bet: the parser only catches
requirements phrased close to how the rule is written. In the sample, "Rooms must not contain
combustible cladding" catches a field reading `Combustible cladding, timber veneer` but would
miss `Combustible timber lining` — same hazard, different words. That gap between literal match
and meaning **is** the AI value; the prototype's limits mark where the model has to earn its
place.

**Validation stays deterministic on purpose.** Only rule derivation is probabilistic. Once a
rule exists it is executable, auditable, and shown to the PM with the expected value, the found
value, and the field it came from — so a PM can contest a specific rule instead of distrusting
the whole run. That split is the design bet worth testing in M4 (The Contract).
