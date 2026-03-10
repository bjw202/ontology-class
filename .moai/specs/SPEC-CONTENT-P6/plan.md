---
id: SPEC-CONTENT-P6
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Implementation Plan: SPEC-CONTENT-P6 -- Phase 6 MDX Content Generation

## Overview

This plan details the implementation approach for generating 8 complete MDX content files for Phase 6 ("Major Standard Ontologies Analysis") of the Ontology Fundamentals Learning Platform. The work is pure content authoring -- no infrastructure, components, or configuration changes.

Phase 6 is unique in that each session analyzes a real-world ontology, requiring factual accuracy and structured comparison. The implementation must balance educational clarity with technical precision.

---

## Prerequisites

- SPEC-INFRA-001 fully implemented (skeleton MDX files exist, Nextra site builds)
- `content/phase-6/` directory with 8 skeleton MDX files and `_meta.js`
- MermaidDiagram component functional and globally available
- `bun run dev` starts successfully
- Phases 1-5 content established (for cross-reference consistency)

---

## Implementation Strategy

### Approach: Grouped Content Generation

Content sessions are generated in logical groups because Phase 6 follows a "case study then synthesis" pattern:

**Group 1 -- Framing (00-introduction):**
1. `00-introduction.mdx` first (provides roadmap and framing for the case study approach)

**Group 2 -- Individual Ontology Analyses (01-05):**
Sessions 01-05 can be generated in any order since each analyzes an independent ontology. However, the recommended order follows increasing complexity:

2. `01-foaf.mdx` (simplest ontology, establishes the analysis pattern)
3. `02-dublin-core.mdx` (slightly more complex, introduces community standardization)
4. `03-schema-org.mdx` (large-scale, introduces pragmatic design philosophy)
5. `04-gene-ontology.mdx` (introduces DAG and multiple inheritance)
6. `05-snomed-ct.mdx` (most complex, life-critical domain)

**Group 3 -- Synthesis (06-07):**
7. `06-analysis.mdx` (requires all 5 ontology sessions to be complete for accurate comparison)
8. `07-exercises.mdx` last (synthesizes and tests all prior sessions)

### Content Quality Checklist (per session)

Before marking any session complete, verify:
- [ ] At least 3 "why needed?" blockquotes present
- [ ] At least 2 "connection point" callouts present (referencing Phase 5 and/or Phase 7)
- [ ] At least 1 "common misconception" section present
- [ ] Exactly 1 Mermaid diagram labeled "Session overview diagram"
- [ ] Mermaid syntax is safe (no apostrophes, no `+` in stateDiagram-v2)
- [ ] All Korean content, English terms defined on first use
- [ ] No JSX imports in MDX
- [ ] Each concept explanation is 300-500 words
- [ ] At least 1 comparison table per ontology session (01-05)
- [ ] Factual accuracy verified for ontology names, class/property names, and statistics
- [ ] YAML frontmatter with title, description, difficulty ("intermediate") fields
- [ ] Connection to Phase 5 design methodology where applicable

---

## Milestone 1: Phase Introduction (Priority High)

### Task 1.1: Generate 00-introduction.mdx

**File:** `content/phase-6/00-introduction.mdx`

**Content outline:**

1. **Title block:**
   - Frontmatter: title "Phase 6 overview: Major Standard Ontology Analysis", description about Phase 6 overview, difficulty intermediate
   - H1: "Phase 6: Major Standard Ontology Analysis"

2. **Learning objective section:**
   - State the core learning goal: "Analyze real-world ontologies and extract shared principles of good design"
   - Explain the Phase 5 connection: "Having learned METHONTOLOGY and design patterns, we now see how experts applied them"
   - Motivate case study approach: studying successful examples reveals principles that theory alone cannot teach

3. **"Why needed?" blockquotes (3+):**
   - Why studying real ontologies matters more than just knowing theory
   - Why comparing across domains reveals universal design principles
   - Why understanding different design choices (minimalist vs. comprehensive) helps learners make their own decisions

4. **Roadmap Mermaid diagram:**
   - `graph TD` showing Phase 6 session flow
   - Start with "Case Studies" grouping FOAF, Dublin Core, Schema.org, GO, SNOMED CT
   - Flow to "Comparative Analysis" then "Exercises"
   - Korean labels for each node

5. **Session overview:**
   - Session 1: FOAF -- simplest social ontology (minimalist design)
   - Session 2: Dublin Core -- metadata standard (community standardization process)
   - Session 3: Schema.org -- web vocabulary (pragmatic adoption over rigor)
   - Session 4: Gene Ontology -- biological knowledge (DAG and multiple inheritance)
   - Session 5: SNOMED CT / FHIR -- medical domain (life-critical ontology design)
   - Session 6: Comparative analysis -- extracting shared design principles
   - Session 7: Exercises and competency questions

6. **Competency questions preview:**
   - List the 3 questions learners should be able to answer after Phase 6
   - Frame as a challenge: "Being able to answer these questions confidently means you are ready for Phase 7"

7. **"Common misconception" section:**
   - Misconception: "There is a single correct way to design an ontology"
   - Reality: Different domains, goals, and communities lead to radically different designs -- all can be successful

8. **"Connection point" callouts (2+):**
   - Phase 5: "You learned METHONTOLOGY, CQ, and design patterns. Now see how these principles appear in real ontologies."
   - Phase 7: "The ontologies you analyze here are the foundations of real applications you will study in Phase 7 (Knowledge Graphs, Semantic Web, LLM era)"

---

## Milestone 2: Simple Ontologies (Priority High)

### Task 2.1: Generate 01-foaf.mdx

**File:** `content/phase-6/01-foaf.mdx`

**Content outline:**

1. **Frontmatter:** title "FOAF: the simplest social ontology", description about FOAF analysis, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand FOAF purpose and core structure (Person, Organization, knows)
   - Extract the "design only what you need" minimalist principle
   - Recognize how namespace design enables extension and reuse

3. **"Why needed?" opening blockquote:**
   - Why starting with the simplest ontology: complexity is not a measure of quality

4. **Mermaid diagram -- "Session overview diagram":**
   - `classDiagram` showing FOAF core classes (Person, Organization, Agent, Document)
   - Key properties on each class
   - Relationships: Person -- knows --> Person, Person -- member --> Organization

5. **Purpose and history (200-300 words):**
   - Dan Brickley and Libby Miller, early 2000s
   - Semantic Web origin story
   - Goal: machine-readable social network data without a central database

6. **Core structure analysis (300-500 words):**
   - "Why needed?" blockquote about why class structure matters
   - foaf:Agent as parent class, foaf:Person and foaf:Organization as subclasses
   - Key properties with examples in Turtle syntax
   - foaf:knows as the core social relationship
   - Distributed nature: anyone can create FOAF profiles and link them

7. **Design principle: minimalism (300-400 words):**
   - "Why needed?" blockquote about minimalist design
   - FOAF has roughly 20 classes and 70 properties -- tiny compared to SNOMED CT
   - Yet it enabled an entire social web data ecosystem
   - Phase 5 connection: CQ-driven scope -- only model what your CQs require
   - Extensibility: other ontologies (SIOC, SKOS) extend FOAF rather than replacing it

8. **"Common misconception" section:**
   - Misconception: "FOAF is too simple to be useful in production"
   - Reality: FOAF principles underpin modern social graph APIs and linked data profiles. Simplicity is its strength.

9. **Comparison table:**
   - FOAF key characteristics: purpose, scale, expressiveness, standard body, key design principle

10. **"Connection point" callouts:**
    - Phase 5: "FOAF is an example of Phase 5 CQ-based scope -- design only what competency questions require"
    - Phase 7: "FOAF profiles are Linked Data -- Phase 7 covers how Linked Data connects distributed knowledge"

11. **Summary and next session preview**

### Task 2.2: Generate 02-dublin-core.mdx

**File:** `content/phase-6/02-dublin-core.mdx`

**Content outline:**

1. **Frontmatter:** title "Dublin Core: universal document metadata standard", description about Dublin Core analysis, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand Dublin Core 15 elements and their categorization
   - Learn how ontology becomes an international standard through community process
   - Extract the "dumb-down principle" for metadata simplification

3. **"Why needed?" opening blockquote:**
   - Why metadata standards matter: without them, digital documents are unsearchable and unclassifiable

4. **Mermaid diagram -- "Session overview diagram":**
   - `graph LR` showing Dublin Core 15 elements organized in 3 categories
   - Content elements (title, subject, description, source, language, relation, coverage)
   - Intellectual Property elements (creator, publisher, contributor, rights)
   - Instantiation elements (date, type, format, identifier)

5. **Purpose and history (200-300 words):**
   - 1995 OCLC/NCSA workshop origin
   - Why 15 elements and not 50 or 5
   - The goal: minimally sufficient metadata for any digital resource

6. **15 elements analysis (300-500 words):**
   - "Why needed?" blockquote about each category
   - Concrete examples for each element (Korean library system, Korean digital archive)
   - The "dumb-down principle": any element can be simplified to a text string
   - Why this flexibility is both a strength and a limitation

7. **Standardization journey (300-400 words):**
   - "Why needed?" blockquote about why process matters
   - DCMI community process: workshops, working groups, public comment, voting
   - ISO 15836 adoption
   - Key insight: technical quality alone does not create adoption -- community consensus does
   - Phase 5 connection: METHONTOLOGY includes a "socialization" step for exactly this reason

8. **RDF integration (200-300 words):**
   - Dublin Core as RDF vocabulary
   - Two namespaces: elements/1.1/ and dcterms/
   - How Dublin Core influenced DCAT, FOAF, and other vocabularies

9. **"Common misconception" section:**
   - Misconception: "Dublin Core is outdated and replaced by Schema.org"
   - Reality: Dublin Core and Schema.org serve different purposes. Dublin Core is still the ISO standard for library and archive metadata.

10. **Comparison table:**
    - Dublin Core characteristics: purpose, 15 elements summary, expressiveness, ISO status, adoption

11. **"Connection point" callouts:**
    - Phase 4: "Dublin Core uses RDF namespaces that you learned in Phase 4 -- dc:title is a URI-based property"
    - Phase 5: "The community consensus process mirrors the social validation step in METHONTOLOGY design methodology"

12. **Summary and next session preview**

---

## Milestone 3: Large-Scale Ontologies (Priority High)

### Task 3.1: Generate 03-schema-org.mdx

**File:** `content/phase-6/03-schema-org.mdx`

**Content outline:**

1. **Frontmatter:** title "Schema.org: pragmatic web structure vocabulary", description about Schema.org analysis, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand Schema.org scale, structure, and JSON-LD embedding
   - Analyze the "adoption over rigor" pragmatic design philosophy
   - Compare Schema.org simplicity with OWL expressiveness

3. **"Why needed?" opening blockquote:**
   - Why Schema.org matters: it is the most widely deployed structured data vocabulary on the web

4. **Mermaid diagram -- "Session overview diagram":**
   - `graph TD` showing Schema.org hierarchy from Thing -> major subtypes (CreativeWork, Event, Organization, Person, Place, Product)
   - Each subtype with 2-3 example properties

5. **Purpose and history (200-300 words):**
   - 2011 Google, Bing, Yahoo collaboration (Yandex later joined)
   - Why search engines needed structured data
   - Growth from initial 100 types to 800+ types

6. **Scale and structure (300-500 words):**
   - 800+ types, 1400+ properties
   - Thing as root type
   - JSON-LD embedding with concrete HTML code example
   - "Why needed?" blockquote about why JSON-LD was chosen over RDF/XML

7. **Pragmatic design philosophy (300-500 words):**
   - "Why needed?" blockquote about the adoption vs. rigor tradeoff
   - No formal OWL axioms or DL reasoning
   - Simple type hierarchy with property ranges
   - The "Webmaster test": if an average web developer cannot use it, it fails
   - Concrete comparison: how the same concept (a book) would be modeled in Schema.org vs. OWL
   - What Schema.org sacrifices (reasoning, formal consistency checking) and what it gains (massive adoption)

8. **SEO and practical impact (200-300 words):**
   - Google rich snippets and knowledge panels
   - Voice assistant integration
   - Korean search context: Naver, Daum, and structured data adoption

9. **"Common misconception" section:**
   - Misconception: "Schema.org is an ontology just like OWL-based ontologies"
   - Reality: Schema.org intentionally avoids formal ontology features. It is closer to a structured vocabulary than a formal ontology.

10. **Comparison table:**
    - Schema.org vs. OWL-based ontologies: expressiveness, adoption rate, complexity, reasoning capability, target audience

11. **"Connection point" callouts:**
    - Phase 3: "Phase 3 covered OWL expressiveness levels. Schema.org shows what happens when you choose the simplest level"
    - Phase 7: "Schema.org is the foundation for search engine knowledge graphs you will study in Phase 7"

12. **Summary and next session preview**

### Task 3.2: Generate 04-gene-ontology.mdx

**File:** `content/phase-6/04-gene-ontology.mdx`

**Content outline:**

1. **Frontmatter:** title "Gene Ontology: biological knowledge standardization", description about Gene Ontology analysis, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand Gene Ontology three-root DAG structure
   - Analyze why multiple inheritance is essential for biological classification
   - Learn from GO governance model for large-scale ontology management

3. **"Why needed?" opening blockquote:**
   - Why biology needed a shared vocabulary: thousands of research groups annotating genes in different ways

4. **Mermaid diagram -- "Session overview diagram":**
   - `graph TD` showing three root terms (Molecular Function, Biological Process, Cellular Component)
   - Each with 2-3 example subterms
   - One subterm shown with multiple parents (demonstrating DAG)

5. **Purpose and history (200-300 words):**
   - 1998 Gene Ontology Consortium founding
   - Three model organism databases collaborating
   - Growth to the most cited ontology in biology

6. **Three-root DAG structure (300-500 words):**
   - "Why needed?" blockquote about why trees fail for biology
   - Molecular Function: what a gene product does (e.g., "kinase activity")
   - Biological Process: the larger pathway (e.g., "cell division")
   - Cellular Component: where it acts (e.g., "nucleus")
   - DAG explanation: directed edges, no cycles, multiple parents allowed
   - Phase 2 connection: simple tree hierarchy vs. DAG

7. **Multiple inheritance in practice (300-400 words):**
   - "Why needed?" blockquote about classification challenges
   - Concrete example: an enzyme that is both a "transferase activity" and a "membrane-bound protein"
   - Why forcing single parent classification loses information
   - How GO handles this: a term can have multiple is_a parents
   - Comparison with Phase 2 subclass hierarchy concepts

8. **Community governance (200-300 words):**
   - 45,000+ terms and growing
   - Evidence codes: IDA (Inferred from Direct Assay), IEA (Inferred from Electronic Annotation), etc.
   - Term request and review process
   - Version control and release management

9. **"Common misconception" section:**
   - Misconception: "Multiple inheritance in ontologies always causes problems (like in OOP)"
   - Reality: Unlike programming, ontological multiple inheritance is semantically natural. An enzyme IS both a protein and a catalyst.

10. **Comparison table:**
    - Gene Ontology characteristics: purpose, scale, structure type (DAG), governance, evidence system

11. **"Connection point" callouts:**
    - Phase 2: "You learned class hierarchies in Phase 2 with simple tree structures. GO shows why real domains need DAGs"
    - Phase 5: "GO term creation process follows the iterative design methodology you learned in Phase 5"

12. **Summary and next session preview**

### Task 3.3: Generate 05-snomed-ct.mdx

**File:** `content/phase-6/05-snomed-ct.mdx`

**Content outline:**

1. **Frontmatter:** title "SNOMED CT and HL7 FHIR: life-critical medical ontology", description about SNOMED CT and FHIR analysis, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Understand SNOMED CT scale, concept model, and post-coordination
   - Understand HL7 FHIR as "ontology + API" for healthcare data exchange
   - Analyze why version control and change management are critical in medical ontologies

3. **"Why needed?" opening blockquote:**
   - Why healthcare demands the most rigorous ontology: a wrong code can mean a wrong diagnosis

4. **Mermaid diagram -- "Session overview diagram":**
   - `graph LR` showing SNOMED CT concept model (Concept -> Descriptions -> Relationships)
   - FHIR Resources (Patient, Observation, Condition) connecting to SNOMED CT codes

5. **SNOMED CT structure and scale (300-500 words):**
   - "Why needed?" blockquote about why 360,000+ concepts are necessary
   - Concept model: concepts (unique IDs), descriptions (human-readable terms in multiple languages), relationships (is-a, finding-site, causative-agent)
   - Post-coordination: combining concepts (e.g., "fracture" + "left" + "femur")
   - Concrete example showing concept composition

6. **HL7 FHIR integration (300-400 words):**
   - "Why needed?" blockquote about data exchange challenges in healthcare
   - FHIR Resources as structured data containers
   - How FHIR binds clinical fields to SNOMED CT value sets
   - Example: Patient resource with a Condition coded in SNOMED CT
   - Phase 1 connection: the EMR interoperability problem is exactly what FHIR solves

7. **Version control and change management (200-300 words):**
   - Biannual international releases
   - Why terms cannot simply be deleted (existing patient records reference them)
   - Deprecation process: "inactive" status with replacement mapping
   - Phase 5 connection: maintenance and evolution step in METHONTOLOGY

8. **Life-critical domain considerations (200-300 words):**
   - "Why needed?" blockquote about consequences of errors
   - Regulatory requirements and certification
   - Korean healthcare context: Korean SNOMED CT extension, Korean hospital adoption
   - The comprehensiveness vs. complexity tradeoff

9. **"Common misconception" section:**
   - Misconception: "FHIR replaces SNOMED CT"
   - Reality: FHIR is a data exchange framework; SNOMED CT provides the clinical vocabulary. They work together, not as alternatives.

10. **Comparison table:**
    - SNOMED CT/FHIR characteristics: purpose, scale, relationship types, governance, version management

11. **"Connection point" callouts:**
    - Phase 1: "The EMR interoperability problem from Phase 1 -- SNOMED CT and FHIR are the industry solution"
    - Phase 8: "Not every domain needs SNOMED-level rigor. Phase 8 discusses when simpler approaches suffice"

12. **Summary and next session preview**

---

## Milestone 4: Synthesis and Exercises (Priority High)

### Task 4.1: Generate 06-analysis.mdx

**File:** `content/phase-6/06-analysis.mdx`

**Content outline:**

1. **Frontmatter:** title "Shared Design Principle Extraction and Comparative Analysis", description about comparative analysis of 5 ontologies, difficulty intermediate

2. **Learning objectives (3 bullets):**
   - Compare 5 major ontologies across multiple dimensions
   - Extract shared design principles that transcend domains
   - Apply extracted principles to evaluate ontology design choices

3. **"Why needed?" opening blockquote:**
   - Why synthesis matters: individual examples teach facts, comparison teaches principles

4. **Mermaid diagram -- "Session overview diagram":**
   - `graph TD` showing 5 ontologies as leaf nodes connecting to central "Shared Principles" node
   - Each ontology with a brief label of its key characteristic
   - Principles branching out: Purpose, Community, Namespace, Documentation

5. **Five-ontology comparison table (mandatory):**
   - Comprehensive table with all 5 ontologies
   - All required columns from S-007
   - Each cell filled with concise Korean descriptions

6. **Shared design principle 1: Clear purpose and scope (200-300 words):**
   - "Why needed?" blockquote
   - How each ontology defines its scope (CQ-based for some, use-case-based for others)
   - FOAF: social relationships only. GO: gene functions only. Schema.org: web search optimization.
   - Phase 5 connection: competency questions as scope boundary

7. **Shared design principle 2: Community consensus (200-300 words):**
   - "Why needed?" blockquote
   - Every analyzed ontology has a governance structure
   - Dublin Core: ISO process. Schema.org: multi-company collaboration. GO: consortium.
   - Gruber definition connection: the "shared" component from Phase 1

8. **Shared design principle 3: Namespace design for reuse (200-300 words):**
   - "Why needed?" blockquote
   - URI-based identifiers enable cross-ontology referencing
   - FOAF: http://xmlns.com/foaf/0.1/
   - Dublin Core: http://purl.org/dc/terms/
   - Phase 4 connection: RDF namespace mechanism

9. **Shared design principle 4: Documentation (200-300 words):**
   - Every class and property has human-readable labels and definitions
   - rdfs:label, rdfs:comment as documentation mechanism
   - GO evidence codes as a documentation innovation
   - Why undocumented ontologies fail: no one can use what they cannot understand

10. **Design spectrum analysis (300-400 words):**
    - Spectrum 1: Minimalist (FOAF) <-> Comprehensive (SNOMED CT)
    - Spectrum 2: Academic rigor (GO) <-> Practical adoption (Schema.org)
    - Spectrum 3: General-purpose (Dublin Core) <-> Domain-specific (SNOMED CT)
    - Key insight: position on each spectrum is determined by purpose, not by quality

11. **"Common misconception" section:**
    - Misconception: "More expressive ontologies are always better"
    - Reality: Schema.org is less expressive than FOAF in OWL terms, yet it is the most widely adopted. Expressiveness must match purpose.

12. **"Connection point" callouts:**
    - Phase 5: "The 4 shared principles map directly to METHONTOLOGY steps: scoping (CQ), socialization, naming, documentation"
    - Phase 7: "These design principles will help you evaluate ontology choices in real applications (Phase 7)"

13. **Summary**

### Task 4.2: Generate 07-exercises.mdx

**File:** `content/phase-6/07-exercises.mdx`

**Content outline:**

1. **Frontmatter:** title "Phase 6 Comprehensive Exercises", description about comprehensive exercises for Phase 6, difficulty intermediate

2. **Phase 6 concept map Mermaid diagram:**
   - `graph TD` connecting all Phase 6 concepts
   - 5 ontologies -> shared principles -> design spectrum -> design decisions
   - Korean labels throughout

3. **Phase 6 recap (200-300 words):**
   - Brief summary of sessions 01-06
   - Emphasize the narrative arc: individual cases -> shared principles -> design judgment

4. **Basic exercises:**

   **Exercise 1:** Schema.org Domain Exploration
   - Task: Visit schema.org website and find 3+ types related to your own domain
   - Compare with Phase 5 competency questions: which CQs are answered by Schema.org? Which are not?
   - Document findings in a table: CQ | Schema.org Type | Covered? | Missing?
   - Guidance: Use schema.org full hierarchy page for navigation
   - Hint: If manufacturing, look at schema.org/Product, schema.org/Offer, schema.org/Organization

   **Exercise 2:** FOAF Visual Analysis in Protege
   - Task: Download FOAF ontology file (xmlns.com/foaf/spec/) and open in Protege
   - Identify: all classes, key object properties, key datatype properties
   - Compare your observation with the session 01 class diagram
   - Alternative: Use WebVOWL online viewer (vowl.visualdataweb.org/webvowl.html) if Protege not installed
   - Document: What surprised you about the actual structure vs. what the text described?

5. **Challenge exercise:**

   **Exercise 3:** Wikidata SPARQL Gene Ontology Exploration
   - Task: Use Wikidata Query Service (query.wikidata.org) to explore GO terms
   - Provided query 1: Find all Wikidata items with Gene Ontology IDs
   - Provided query 2: Find biological process terms related to a specific gene
   - Challenge: Modify query to find molecular function terms for human genes
   - Phase 4 connection: apply SPARQL knowledge from Phase 4 in a real endpoint
   - Include 2-3 example SPARQL queries with line-by-line explanation

6. **Competency questions with guidance:**
   - Question 1: "Schema.org is not using the full expressiveness of OWL -- what is the reason?" with guidance pointing to Session 03 pragmatic design philosophy
   - Question 2: "Explain with a biological example why multiple inheritance is needed in Gene Ontology" with guidance pointing to Session 04 DAG structure
   - Question 3: "What characteristics do successful ontologies share?" with guidance pointing to Session 06 four principles

7. **Self-assessment checklist (4+ items):**
   - "I can explain the purpose and design philosophy of at least 3 major ontologies"
   - "I can identify shared design principles across successful ontologies"
   - "I can evaluate an ontology design choice (e.g., simple hierarchy vs. full OWL) based on context"
   - "I can use Schema.org to find relevant types for my domain"
   - "I can explain why multiple inheritance is needed in certain domains"

8. **"Connection point" callouts:**
   - Phase 7: "Now you know how major ontologies are designed. Phase 7 shows how they are applied in real systems (Knowledge Graphs, LLM era, manufacturing)"
   - Phase 5: "Exercises 1 and 2 are practical extensions of Phase 5 design methodology -- analyzing existing ontologies is the first step of ontology reuse"

9. **"Common misconception" section:**
   - Misconception: "Analyzing existing ontologies is only for academic purposes"
   - Reality: Every professional ontology project starts by surveying existing ontologies for reuse. This exercise IS professional practice.

---

## Build Verification

After all 8 files are generated:

1. Run `bun run build` (or `npm run build`) -- zero errors expected
2. Run `bun run dev` and navigate to each Phase 6 page -- all content renders
3. Verify all Mermaid diagrams render without syntax errors (especially `classDiagram` in session 01)
4. Verify no MDX parsing errors in browser console
5. Verify sidebar navigation shows all 8 Phase 6 sessions with Korean labels
6. Verify all comparison tables render correctly (check column alignment and cell content)
7. Verify SPARQL code blocks in session 07 render with syntax highlighting

---

## Risk Assessment

### Risk 1: Mermaid classDiagram Syntax Errors

**Probability:** Medium
**Impact:** Diagram shows error message instead of class diagram
**Mitigation:** `classDiagram` is a less commonly used Mermaid type in this project (Phase 1 used graph and sequenceDiagram). Verify safe syntax patterns for class notation. Avoid Mermaid classDiagram features that may not be supported in Mermaid 11.12.2 (e.g., generic types). Use simple class notation with string-typed attributes.

### Risk 2: Factual Inaccuracy in Ontology Descriptions

**Probability:** Low-Medium
**Impact:** Educational credibility undermined if ontology structures or statistics are wrong
**Mitigation:** All ontology descriptions are based on publicly documented specifications. Key facts to verify:
- FOAF has ~20 classes and ~70 properties (check xmlns.com/foaf/spec/)
- Dublin Core has exactly 15 elements (check dublincore.org)
- Schema.org has 800+ types (check schema.org/docs/full.html)
- Gene Ontology has 45,000+ terms (check geneontology.org)
- SNOMED CT has 360,000+ concepts (check snomed.org)

### Risk 3: Comparison Table Column Width

**Probability:** Medium
**Impact:** Wide tables may overflow on mobile or narrow viewports
**Mitigation:** Keep table cells concise (1-2 sentences max). Use abbreviations where clear. The Nextra theme handles table overflow with horizontal scrolling, but shorter content improves readability.

### Risk 4: SPARQL Query Validity

**Probability:** Medium
**Impact:** Exercise 3 queries may fail on Wikidata endpoint if property/entity IDs change
**Mitigation:** Use stable Wikidata properties (P686 for GO ID, P31 for instance-of). Include a note that Wikidata is a live database and results may change. Provide expected output description rather than exact expected results.

### Risk 5: Phase 5 Cross-Reference Accuracy

**Probability:** Low
**Impact:** References to Phase 5 concepts that do not exist or use wrong terminology
**Mitigation:** Phase 6 references Phase 5 concepts: METHONTOLOGY, competency questions, design patterns, anti-patterns, quality criteria. These are all defined in the Phase 5 curriculum section of edu-content.md and the project structure document.

---

## Technical Approach

### Content Generation Method

The implementation agent receives this plan and generates MDX content by:

1. **Reading** the current skeleton file for each session
2. **Writing** the complete MDX content following the outline in this plan
3. **Verifying** each file against the quality checklist
4. **Building** the site to confirm zero errors

### No New Dependencies

This SPEC requires no new npm packages, no configuration changes, and no component modifications. It is pure content replacement within existing MDX files.

### File-by-File Execution

Each file is generated independently and can be verified independently, with the exception of `06-analysis.mdx` which should be generated after sessions 01-05 to ensure comparison table accuracy.

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| SPEC-INFRA-001 | Must be completed first | Required |
| SPEC-CONTENT-P1 through SPEC-CONTENT-P5 | Should be completed for cross-reference accuracy | Recommended |
| `content/phase-6/_meta.js` | Must exist with correct entries | Required (from SPEC-INFRA-001) |
| MermaidDiagram component | Must be functional | Required (from SPEC-INFRA-001) |
| Curriculum document (`my-docs/edu-content.md`) | Content source | Reference |
