/* ValT — validation engine
   ----------------------------------------------------------------------------
   Three pure stages, no DOM:
     1. extractRules(requirementsText) -> rules[]
     2. parseProject(projectText)      -> records[]
     3. validate(rules, records)       -> findings[]
   Loaded by index.html (the app) and test.html (the headless check).
   ========================================================================== */
"use strict";

/* ============================================================================
   Sample data — embedded so the demo runs from file:// with no fetch
   ========================================================================== */

const SAMPLE_REQ_NAME = "northbridge-requirements.md";
const SAMPLE_REQ = `# Northbridge Terminal Fit-Out — Project Requirements
Rev C · Issued 2026-06-14

## 1. Egress and circulation
- All corridors must have a minimum clear width of 1500 mm.
- All doors must have a minimum clear width of 900 mm.
- Every door must be assigned a fire rating.
- Corridors should have a maximum length of 30 m.

## 2. Fire and life safety
- All shafts must have a fire rating of one of the following: FR60, FR90, FR120.
- Rooms must not contain combustible cladding.

## 3. Envelope and comfort
- All windows must have a maximum u-value of 1.6.
- Rooms should have a minimum ceiling height of 2700 mm.

## 4. Data completeness
- Every element must have a cost code.
- Every element must be assigned a responsible discipline.
- Every element must have a revision status of one of the following: Issued, Approved.
- All equipment must have a manufacturer.

## 5. Plant and acoustics
- All equipment must have a maximum noise level of 45 dB.
- All ductwork must have an insulation class.
`;

const SAMPLE_PRJ_NAME = "northbridge-elements.json";
const SAMPLE_PRJ = JSON.stringify({ elements: [
 {id:"COR-101",category:"Corridor",area:"Level 01 — East Concourse",discipline:"Architecture",costCode:"A-2100",revisionStatus:"Issued",clearWidth_mm:1800,length_m:24,fireRating:"FR60"},
 {id:"COR-102",category:"Corridor",area:"Level 01 — East Concourse",discipline:"Architecture",costCode:"A-2100",revisionStatus:"Issued",clearWidth_mm:1420,length_m:31,fireRating:"FR60"},
 {id:"COR-103",category:"Corridor",area:"Level 01 — West Concourse",discipline:"Architecture",costCode:"",revisionStatus:"In progress",clearWidth_mm:1500,length_m:38,fireRating:"FR60"},
 {id:"DR-2201",category:"Door",area:"Level 01 — East Concourse",discipline:"Architecture",costCode:"A-2340",revisionStatus:"Approved",clearWidth_mm:950,fireRating:"FR60"},
 {id:"DR-2202",category:"Door",area:"Level 01 — East Concourse",discipline:"Architecture",costCode:"A-2340",revisionStatus:"Approved",clearWidth_mm:860,fireRating:"FR60"},
 {id:"DR-2203",category:"Door",area:"Level 01 — West Concourse",discipline:"Architecture",costCode:"A-2340",revisionStatus:"Issued",clearWidth_mm:900,fireRating:""},
 {id:"DR-2204",category:"Door",area:"Level 02 — Retail",discipline:"Architecture",costCode:"A-2341",revisionStatus:"Draft",clearWidth_mm:820,fireRating:"TBD"},
 {id:"DR-2205",category:"Door",area:"Level 02 — Retail",discipline:"",costCode:"A-2341",revisionStatus:"Issued",clearWidth_mm:1000,fireRating:"FR30"},
 {id:"DR-2206",category:"Door",area:"Level 01 — West Concourse",discipline:"Architecture",costCode:"A-2342",revisionStatus:"Issued",fireRating:"FR60"},
 {id:"SH-301",category:"Shaft",area:"Level 01 — West Concourse",discipline:"Structure",costCode:"S-1120",revisionStatus:"Issued",fireRating:"FR90"},
 {id:"SH-302",category:"Shaft",area:"Level 02 — Retail",discipline:"Structure",costCode:"S-1120",revisionStatus:"Issued",fireRating:"FR30"},
 {id:"SH-303",category:"Shaft",area:"Basement — Plant",discipline:"Structure",costCode:"S-1121",revisionStatus:"Approved",fireRating:"FR120"},
 {id:"RM-4101",category:"Room",area:"Level 01 — East Concourse",discipline:"Architecture",costCode:"A-3010",revisionStatus:"Issued",ceilingHeight_mm:3200,claddingSpec:"Mineral fibre panel, non-combustible"},
 {id:"RM-4102",category:"Room",area:"Level 02 — Retail",discipline:"Architecture",costCode:"A-3010",revisionStatus:"Issued",ceilingHeight_mm:2450,claddingSpec:"ACM combustible cladding, Class D"},
 {id:"RM-4103",category:"Room",area:"Level 02 — Retail",discipline:"Architecture",costCode:"A-3011",revisionStatus:"Approved",ceilingHeight_mm:2800,claddingSpec:"Plasterboard, non-combustible"},
 {id:"RM-4104",category:"Room",area:"Basement — Plant",discipline:"Architecture",costCode:"A-3012",revisionStatus:"Issued",ceilingHeight_mm:2600,claddingSpec:"Combustible cladding, timber veneer"},
 {id:"WD-5201",category:"Window",area:"Level 01 — East Concourse",discipline:"Facade",costCode:"F-4100",revisionStatus:"Issued",uValue:1.4},
 {id:"WD-5202",category:"Window",area:"Level 01 — West Concourse",discipline:"Facade",costCode:"F-4100",revisionStatus:"Issued",uValue:1.9},
 {id:"WD-5203",category:"Window",area:"Level 02 — Retail",discipline:"Facade",costCode:"F-4101",revisionStatus:"Draft",uValue:2.3},
 {id:"WD-5204",category:"Window",area:"Roof",discipline:"Facade",costCode:"F-4102",revisionStatus:"Issued",uValue:1.1},
 {id:"EQ-6001",category:"Equipment",area:"Basement — Plant",discipline:"MEP",costCode:"M-5200",revisionStatus:"Issued",manufacturer:"Aeroflow",noiseLevel_dB:42},
 {id:"EQ-6002",category:"Equipment",area:"Basement — Plant",discipline:"MEP",costCode:"M-5200",revisionStatus:"Issued",manufacturer:"Aeroflow",noiseLevel_dB:58},
 {id:"EQ-6003",category:"Equipment",area:"Basement — Plant",discipline:"MEP",costCode:"M-5201",revisionStatus:"In progress",manufacturer:"",noiseLevel_dB:47},
 {id:"EQ-6004",category:"Equipment",area:"Roof",discipline:"MEP",costCode:"M-5202",revisionStatus:"Issued",manufacturer:"Thermex",noiseLevel_dB:44},
 {id:"EQ-6005",category:"Equipment",area:"Roof",discipline:"MEP",costCode:"M-5202",revisionStatus:"Issued",manufacturer:"Thermex",noiseLevel_dB:43},
 {id:"EQ-6006",category:"Equipment",area:"Level 02 — Retail",discipline:"",costCode:"M-5203",revisionStatus:"Issued",manufacturer:"Thermex",noiseLevel_dB:39},
 {id:"EQ-6007",category:"Equipment",area:"Level 02 — Retail",discipline:"MEP",costCode:"M-5203",revisionStatus:"Issued",manufacturer:"Aeroflow"}
]}, null, 1);

/* ============================================================================
   1. Requirements  ->  rules      (the swap point for a structured LLM call)
   ========================================================================== */

const STOP = new Set(["a","an","the","of","its","their","be","been","have","has","had","with",
  "for","to","is","are","and","or","any","all","every","each","minimum","maximum","min","max",
  "at","least","most","no","not","more","less","than","valid","defined","assigned","specified",
  "value","provided","documented","own","that","which","as","in","on","by","up","exceed",
  "exceeding","equal","exactly","following","one"]);

function normAttr(raw) {
  if (!raw) return "";
  const toks = raw.toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .split(/\s+/)
    .filter(t => t && !STOP.has(t));
  return toks.slice(0, 3).join(" ");
}

const MAX_RE   = /\b(?:maximum|max\.?|at most|no more than|not more than|not exceed(?:ing)?|less than or equal to|up to|under)\b/i;
const MIN_RE   = /\b(?:minimum|min\.?|at least|no less than|not less than|greater than or equal to|over)\b/i;
const EXACT_RE = /\b(?:exactly|equal to)\b/i;
const NUM_RE   = /(-?\d[\d,]*(?:\.\d+)?)\s*([A-Za-z%°]{0,6})/;

function extractRules(text) {
  const rules = [];
  let section = "";
  let n = 0;

  text.split(/\r?\n/).forEach((line, i) => {
    let s = line.trim();
    if (!s) return;
    if (/^#{1,6}\s/.test(s)) { section = s.replace(/^#+\s*/, "").trim(); return; }
    s = s.replace(/^[-*•—]\s*/, "").replace(/^\d+[.)]\s*/, "").trim();
    if (!s) return;

    s.split(/(?<=\.)\s+(?=[A-Z“"(])/).forEach(sentence => {
      const r = parseStatement(sentence.trim(), i + 1, section);
      if (r) { r.id = "R" + String(++n).padStart(2, "0"); rules.push(r); }
    });
  });
  return rules;
}

function parseStatement(s, lineNo, section) {
  if (!s || s.length < 12) return null;

  let m, mode, severity;
  if ((m = /\b(must not|shall not|may not|cannot|must never)\b/i.exec(s)))      { mode = "forbid";  severity = "critical"; }
  else if ((m = /\bshould not\b/i.exec(s)))                                     { mode = "forbid";  severity = "warning";  }
  else if ((m = /\b(must|shall|is required to|are required to)\b/i.exec(s)))    { mode = "require"; severity = "critical"; }
  else if ((m = /\b(should|is recommended to|are recommended to)\b/i.exec(s)))  { mode = "require"; severity = "warning";  }
  else return null;

  const subjRaw = s.slice(0, m.index);
  const pred    = s.slice(m.index + m[0].length).trim().replace(/\.$/, "");
  if (!pred) return null;

  const subject = subjRaw.toLowerCase()
    .replace(/[^a-z0-9\s\-]/g, " ")
    .split(/\s+/)
    .filter(t => t && !["all","every","each","any","the","a","an","no","and","or"].includes(t))
    .map(t => (t.length > 3 && t.endsWith("s") && !t.endsWith("ss")) ? t.slice(0, -1) : t);

  const base = { text: s.replace(/\s+/g, " "), lineNo, section, severity, subject };
  let mm;

  /* --- allowed values (enum) --- */
  if ((mm = /\b(?:one of(?: the following)?|limited to|either)\s*:?\s*(.+)$/i.exec(pred))) {
    const values = mm[1].split(/\s*(?:,|;|\/|\bor\b|\band\b)\s*/i)
      .map(v => v.replace(/[.\s]+$/, "").trim()).filter(Boolean);
    if (values.length) {
      return { ...base, op: "in", values,
               attr: normAttr(stripLead(pred.slice(0, mm.index))) };
    }
  }

  /* --- numeric threshold --- */
  for (const [re, op] of [[MAX_RE, "<="], [MIN_RE, ">="], [EXACT_RE, "=="]]) {
    const km = re.exec(pred);
    if (!km) continue;
    const tail = pred.slice(km.index + km[0].length);
    const nm = NUM_RE.exec(tail);
    if (!nm) continue;

    /* The attribute sits on either side of the threshold keyword:
         "…a clear width of at least 1500 mm"   -> before
         "…a minimum clear width of 1500 mm"    -> after            */
    const before = normAttr(stripLead(pred.slice(0, km.index)));
    const after  = normAttr(stripLead(tail.slice(0, nm.index)));

    return { ...base, op,
             num: parseFloat(nm[1].replace(/,/g, "")),
             unit: (nm[2] || "").toLowerCase() || null,
             attr: before || after };
  }

  /* --- forbidden content --- */
  if (mode === "forbid") {
    const fm = /\b(?:be|use|contain|include|specify|feature)\s+(.+)$/i.exec(pred);
    const phrase = (fm ? fm[1] : pred).replace(/^(?:any|a|an|the)\s+/i, "").trim();
    return { ...base, op: "absent", phrase };
  }

  /* --- explicit state --- */
  if ((mm = /\bbe\s+(approved|signed|complete|completed|reviewed|verified|issued|released|closed)\b/i.exec(pred))) {
    return { ...base, op: "in", values: [mm[1]], attr: "status" };
  }

  /* --- presence --- */
  if ((mm = /\b(?:have|include|contain|specify|provide|carry|define|be assigned)\s+(.+)$/i.exec(pred))) {
    const a = normAttr(mm[1]);
    if (a) return { ...base, op: "present", attr: a };
  }

  return null;
}

function stripLead(t) {
  return t.replace(/^\s*(?:have|include|contain|specify|provide|carry|define|be assigned|be|a|an|the)\s+/i, "").trim();
}

function ruleLogic(r) {
  const a = r.attr ? `"${r.attr}"` : "any field";
  if (r.op === "present") return `${a} is present and non-empty`;
  if (r.op === "in")      return `${a} ∈ { ${r.values.join(", ")} }`;
  if (r.op === "absent")  return `no field contains "${r.phrase}"`;
  return `${a} ${r.op} ${r.num}${r.unit ? " " + r.unit : ""}`;
}

/* ============================================================================
   2. Project file  ->  records
   ========================================================================== */

function parseProject(text) {
  const t = (text || "").trim();
  if (!t) throw new Error("The project file is empty.");

  if (/^[[{]/.test(t)) {
    let data;
    try { data = JSON.parse(t); }
    catch (e) { throw new Error("Could not parse JSON: " + e.message); }
    let arr = Array.isArray(data) ? data : null;
    if (!arr) {
      for (const k of ["elements","items","records","rows","data","tasks","objects","assets"]) {
        if (Array.isArray(data[k])) { arr = data[k]; break; }
      }
      if (!arr) arr = Object.values(data).find(Array.isArray) || null;
    }
    if (!arr) throw new Error("No array of records found in the JSON.");
    const recs = arr.filter(o => o && typeof o === "object" && !Array.isArray(o));
    if (!recs.length) throw new Error("The JSON contains no record objects.");
    return recs;
  }

  const rows = parseCSV(t);
  if (rows.length < 2) throw new Error("Expected a header row plus at least one data row.");
  const head = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.some(c => c.trim() !== ""))
    .map(r => Object.fromEntries(head.map((h, i) => [h || "col" + i, (r[i] ?? "").trim()])));
}

function parseCSV(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i+1] === '"') { cell += '"'; i++; } else q = false; }
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

/* ============================================================================
   3. Validation
   ========================================================================== */

const GENERIC = new Set(["element","item","component","object","entity","record","asset",
  "deliverable","project","entry","row"]);
const ID_KEYS   = ["id","elementid","element_id","uniqueid","guid","tag","code","mark","name","title"];
const AREA_KEYS = ["area","zone","level","floor","location","room","space","sector","phase",
                   "package","section","building","system","discipline"];
const CAT_KEYS  = ["category","type","elementtype","class","family","kind","subcategory","discipline"];
const EMPTY     = new Set(["","-","–","n/a","na","tbd","tba","none","null","undefined","?","unknown"]);
const LEN = { mm: 1, cm: 10, m: 1000, km: 1e6 };

const nk = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const isEmpty = v => v === null || v === undefined || EMPTY.has(String(v).trim().toLowerCase());

function pick(rec, keys) {
  for (const want of keys) {
    for (const k of Object.keys(rec)) {
      if (nk(k) === want && !isEmpty(rec[k])) return String(rec[k]);
    }
  }
  return null;
}

const idOf   = (r, i) => pick(r, ID_KEYS)   || "Record " + (i + 1);
const areaOf = r      => pick(r, AREA_KEYS) || pick(r, CAT_KEYS) || "Unassigned";
const catOf  = r      => pick(r, CAT_KEYS)  || "";

function matchesSubject(rule, rec) {
  const toks = rule.subject.filter(t => t.length > 2);
  if (!toks.length || toks.some(t => GENERIC.has(t))) return true;
  const hay = nk(Object.keys(rec)
    .filter(k => CAT_KEYS.includes(nk(k)) || ID_KEYS.includes(nk(k)))
    .map(k => rec[k]).join(" "));
  return toks.some(t => hay.includes(nk(t)));
}

/* fuzzy attribute -> field-name resolution */
function resolveKey(rec, attr) {
  if (!attr) return null;
  const target = nk(attr);
  const toks = attr.split(/[\s-]+/).map(nk).filter(t => t.length > 2);
  let best = null, bestScore = 0;

  for (const k of Object.keys(rec)) {
    const n = nk(k);
    let sc = 0;
    if (n === target) sc = 100;
    else if (n.startsWith(target)) sc = 90 - Math.min(20, n.length - target.length);
    else if (n.includes(target)) sc = 80 - Math.min(20, n.length - target.length);
    else if (target.includes(n) && n.length >= 4) sc = 60;
    else {
      const hits = toks.filter(t => n.includes(t)).length;
      if (hits) sc = 25 * hits + (hits === toks.length ? 10 : 0);
    }
    if (sc > bestScore) { bestScore = sc; best = k; }
  }
  return bestScore >= 25 ? best : null;
}

function toNumber(v) {
  if (typeof v === "number") return { n: v, unit: null };
  const m = /(-?\d[\d,]*(?:\.\d+)?)\s*([A-Za-z%°]{0,6})/.exec(String(v));
  return m ? { n: parseFloat(m[1].replace(/,/g, "")), unit: (m[2] || "").toLowerCase() || null } : null;
}

function unitFromKey(key) {
  const m = /[_\s-]([a-z%°]{1,4})$/i.exec(key);
  return m ? m[1].toLowerCase() : null;
}

function validate(rules, records) {
  const findings = [];

  for (const rule of rules) {
    const matched = records
      .map((r, i) => ({ rec: r, i }))
      .filter(x => matchesSubject(rule, x.rec));

    rule.scope = matched.length;
    rule.unmatched = matched.length === 0;
    if (!matched.length) continue;

    for (const { rec, i } of matched) {
      const f = evaluate(rule, rec);
      if (f) findings.push({
        ...f,
        rule,
        area: areaOf(rec),
        element: idOf(rec, i),
        category: catOf(rec)
      });
    }
  }
  return findings;
}

function evaluate(rule, rec) {
  /* forbidden phrase: scan every text field */
  if (rule.op === "absent") {
    const needle = nk(rule.phrase);
    if (!needle) return null;
    for (const [k, v] of Object.entries(rec)) {
      if (typeof v !== "string" || !v) continue;
      if (nk(v).includes(needle)) {
        return { severity: rule.severity, field: k, actual: v,
                 expected: `must not contain "${rule.phrase}"` };
      }
    }
    return null;
  }

  const key = resolveKey(rec, rule.attr);

  /* attribute absent -> unverifiable. Only surfaced for mandatory rules. */
  if (!key) {
    if (rule.severity !== "critical") return null;
    return { severity: "serious", field: rule.attr, actual: "— not in project data —",
             expected: ruleLogic(rule), unverifiable: true };
  }

  const raw = rec[key];

  if (rule.op === "present") {
    return isEmpty(raw)
      ? { severity: rule.severity, field: key, actual: fmtEmpty(raw), expected: "a value" }
      : null;
  }

  if (rule.op === "in") {
    if (isEmpty(raw)) {
      return { severity: rule.severity, field: key, actual: fmtEmpty(raw),
               expected: rule.values.join(" | ") };
    }
    const got = nk(raw);
    return rule.values.some(v => nk(v) === got) ? null
      : { severity: rule.severity, field: key, actual: String(raw),
          expected: rule.values.join(" | ") };
  }

  /* numeric */
  if (isEmpty(raw)) {
    return { severity: rule.severity, field: key, actual: fmtEmpty(raw),
             expected: `${rule.op} ${rule.num}${rule.unit ? " " + rule.unit : ""}` };
  }
  const got = toNumber(raw);
  if (!got) {
    return { severity: "serious", field: key, actual: String(raw),
             expected: `a number ${rule.op} ${rule.num}${rule.unit ? " " + rule.unit : ""}`,
             unverifiable: true };
  }

  /* unit normalisation (length family only) */
  let a = got.n, b = rule.num;
  const au = got.unit || unitFromKey(key), bu = rule.unit;
  if (au && bu && au !== bu && LEN[au] && LEN[bu]) { a *= LEN[au]; b *= LEN[bu]; }

  const ok = rule.op === ">=" ? a >= b : rule.op === "<=" ? a <= b : a === b;
  if (ok) return null;

  const disp = au ? `${got.n} ${au}` : String(got.n);
  return { severity: rule.severity, field: key, actual: disp,
           expected: `${rule.op} ${rule.num}${rule.unit ? " " + rule.unit : ""}` };
}

const fmtEmpty = v => (v === "" || v === null || v === undefined) ? "— empty —" : String(v);
