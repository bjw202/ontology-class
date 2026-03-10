---
id: SPEC-CONTENT-P6
version: "1.0.0"
status: draft
created: "2026-03-10"
updated: "2026-03-10"
author: jw
priority: high
---

# Acceptance Criteria: SPEC-CONTENT-P6 -- Phase 6 MDX Content Generation

## Overview

These acceptance criteria define the quality gates for Phase 6 content generation. Every criterion uses the Given-When-Then format. All criteria must pass for the SPEC to be considered complete.

---

## AC-001: Complete File Set

**GIVEN** the `content/phase-6/` directory,
**WHEN** all content generation tasks are complete,
**THEN** exactly 8 MDX files exist with fully written educational content (not skeleton placeholders):
- `00-introduction.mdx`
- `01-foaf.mdx`
- `02-dublin-core.mdx`
- `03-schema-org.mdx`
- `04-gene-ontology.mdx`
- `05-snomed-ct.mdx`
- `06-analysis.mdx`
- `07-exercises.mdx`

**Verification method:** `ls content/phase-6/*.mdx | wc -l` returns 8. Each file contains more than 100 lines of content (not skeleton headers only).

---

## AC-002: Korean Content with English Technical Terms

**GIVEN** any Phase 6 MDX session file,
**WHEN** the content is reviewed,
**THEN** all explanatory text is written in Korean, and every English technical term is introduced on first use with a Korean definition in parentheses.

**Verification method:** Search for key terms. Each of the following must appear with Korean definition on first use in the file where they are introduced:
- FOAF (Friend of a Friend)
- Dublin Core
- Schema.org
- JSON-LD (JavaScript Object Notation for Linked Data)
- DAG (Directed Acyclic Graph)
- SNOMED CT (Systematized Nomenclature of Medicine -- Clinical Terms)
- HL7 FHIR (Fast Healthcare Interoperability Resources)
- Post-coordination
- Rich snippet
- Evidence code

**Negative check:** No block of 3+ consecutive sentences in English (code blocks, SPARQL queries, and academic quotes excluded).

---

## AC-003: "Why Needed?" Blockquotes

**GIVEN** any Phase 6 MDX session file (00 through 07),
**WHEN** the blockquotes are counted,
**THEN** at least 3 instances of the "why needed?" blockquote pattern appear in each file.

**Verification method:** For each file, count occurrences of the "why needed?" blockquote and confirm count >= 3.

---

## AC-004: Mermaid Diagrams

**GIVEN** any Phase 6 MDX session file,
**WHEN** the Mermaid diagrams are inspected,
**THEN** exactly 1 Mermaid code block exists per file, and the section heading preceding it contains "Session overview diagram" or equivalent.

### AC-004.1: Mermaid Safe Syntax

**GIVEN** any Mermaid code block in Phase 6 content,
**WHEN** the syntax is inspected,
**THEN** the diagram contains:
- No apostrophes (`'`) in node labels
- No `+` operator (if `stateDiagram-v2`)
- Double-quoted labels `["text"]` for labels with Korean characters

### AC-004.2: Correct Diagram Types

**GIVEN** all 8 Phase 6 MDX files,
**WHEN** the Mermaid diagram types are reviewed,
**THEN** the diagram types match:

| File | Expected Diagram Type |
|------|----------------------|
| 00-introduction.mdx | `graph TD` |
| 01-foaf.mdx | `classDiagram` |
| 02-dublin-core.mdx | `graph LR` |
| 03-schema-org.mdx | `graph TD` |
| 04-gene-ontology.mdx | `graph TD` |
| 05-snomed-ct.mdx | `graph LR` |
| 06-analysis.mdx | `graph TD` |
| 07-exercises.mdx | `graph TD` |

### AC-004.3: Mermaid Render Verification

**GIVEN** the site running in development mode (`bun run dev`),
**WHEN** each Phase 6 page is loaded in a browser,
**THEN** each Mermaid diagram renders visually as a diagram (not as raw text or an error message).

---

## AC-005: No JSX Imports

**GIVEN** any Phase 6 MDX file,
**WHEN** the file is searched for import statements,
**THEN** zero `import` statements are found.

**Verification method:** Search for lines starting with `import` in all Phase 6 MDX files and confirm count is 0 for every file.

---

## AC-006: "Connection Point" References

**GIVEN** any Phase 6 MDX session file (00 through 07),
**WHEN** the callouts are counted,
**THEN** at least 2 instances of the "connection point" callout pattern appear in each file, and each references a valid phase (Phase 1 through Phase 8).

**Verification method:** Count occurrences of the "connection point" callout in each file and confirm count >= 2. Verify each referenced phase number is between 1 and 8.

**Additional check for Phase 6 specifics:**
- At least one backward reference to Phase 5 (design methodology) exists across sessions 01-06
- At least one forward reference to Phase 7 (applications) exists across sessions 00, 06, 07

---

## AC-007: "Common Misconception" Sections

**GIVEN** any Phase 6 MDX session file (00 through 07),
**WHEN** the misconception sections are counted,
**THEN** at least 1 "common misconception" and "actually" pair appears in each file.

**Verification method:** Count occurrences of the "common misconception" pattern in each file and confirm count >= 1.

---

## AC-008: Session 00 -- Introduction Content

**GIVEN** the file `content/phase-6/00-introduction.mdx`,
**WHEN** the content is reviewed,
**THEN** it contains:
- Phase 6 learning objective: "Analyze real-world ontologies and extract shared principles of good design"
- Phase 5 connection statement explaining why case analysis follows methodology learning
- Brief overview of all 7 content sessions (01-07)
- The 3 competency questions as a preview list
- A `graph TD` Mermaid diagram showing Phase 6 session roadmap
- At least 3 "why needed?" blockquotes
- At least 2 "connection point" callouts (one to Phase 5, one to Phase 7)
- At least 1 "common misconception" section

---

## AC-009: Session 01 -- FOAF Analysis

**GIVEN** the file `content/phase-6/01-foaf.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- FOAF origin story (Dan Brickley and Libby Miller, early 2000s)
- Core classes: foaf:Person, foaf:Organization (at minimum)
- Core properties: foaf:name, foaf:knows, foaf:mbox (at minimum)
- The "design only what you need" minimalist principle extraction
- Namespace design discussion (http://xmlns.com/foaf/0.1/)
- A `classDiagram` Mermaid diagram showing FOAF core classes and relationships
- At least 1 comparison/summary table
- At least 300 words for the core structure analysis section

---

## AC-010: Session 02 -- Dublin Core Analysis

**GIVEN** the file `content/phase-6/02-dublin-core.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Dublin Core origin story (1995 OCLC/NCSA workshop in Dublin, Ohio)
- All 15 core elements mentioned (title, creator, subject, description, publisher, contributor, date, type, format, identifier, source, language, relation, coverage, rights)
- Three-category organization (Content, Intellectual Property, Instantiation)
- ISO 15836 standardization journey
- Community consensus as key adoption driver
- A `graph LR` Mermaid diagram showing 15 elements by category
- At least 1 comparison/summary table
- At least 300 words for the elements analysis section

---

## AC-011: Session 03 -- Schema.org Analysis

**GIVEN** the file `content/phase-6/03-schema-org.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Schema.org origin story (2011 Google, Bing, Yahoo collaboration)
- Scale: 800+ types, 1400+ properties mentioned
- JSON-LD embedding format explained with code example
- "Adoption over rigor" pragmatic design philosophy analysis
- Comparison of Schema.org simplicity vs. OWL expressiveness
- SEO practical impact discussion (rich snippets, knowledge panels)
- A `graph TD` Mermaid diagram showing Schema.org type hierarchy from Thing
- At least 1 comparison table (Schema.org vs. OWL-based ontologies)
- At least 300 words for the pragmatic design philosophy section

---

## AC-012: Session 04 -- Gene Ontology Analysis

**GIVEN** the file `content/phase-6/04-gene-ontology.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- Gene Ontology origin story (1998 Gene Ontology Consortium)
- Three root terms: Molecular Function, Biological Process, Cellular Component
- DAG (Directed Acyclic Graph) structure explanation
- Multiple inheritance with at least 1 concrete biological example (e.g., enzyme classified under multiple parents)
- Community governance and evidence codes discussion
- Scale: 45,000+ terms mentioned
- A `graph TD` Mermaid diagram showing three-root DAG structure with multiple inheritance example
- At least 1 comparison/summary table
- At least 300 words for the DAG structure section

---

## AC-013: Session 05 -- SNOMED CT / HL7 FHIR Analysis

**GIVEN** the file `content/phase-6/05-snomed-ct.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:
- SNOMED CT overview with scale: 360,000+ concepts mentioned
- Concept model: concepts, descriptions, relationships explained
- Post-coordination explained with concrete example (e.g., "fracture of left femur")
- HL7 FHIR explanation as "ontology + API" for healthcare data exchange
- FHIR Resources mentioned (Patient, Observation, Condition at minimum)
- Version control and change management in medical context
- Life-critical domain considerations
- A `graph LR` Mermaid diagram showing SNOMED CT concept model and FHIR resource mapping
- At least 1 comparison/summary table
- At least 300 words for the SNOMED CT structure section

---

## AC-014: Session 06 -- Comparative Analysis

**GIVEN** the file `content/phase-6/06-analysis.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Five-Ontology Comparison Table (MANDATORY):
A comprehensive comparison table with:
- All 5 ontologies as rows: FOAF, Dublin Core, Schema.org, Gene Ontology, SNOMED CT
- Columns including at minimum: Purpose, Scale, Expressiveness, Standard body, Adoption status
- Each cell filled with concise Korean explanations

### Shared Design Principles:
All 4 shared design principles explicitly stated and explained:
1. Clear purpose and scope (CQ-based)
2. Community consensus and sustained maintenance
3. Namespace design for reuse and extension
4. Documentation (natural language descriptions for classes and properties)

### Design Spectrum Analysis:
At least 3 design spectra discussed:
- Minimalist (FOAF) vs. Comprehensive (SNOMED CT)
- Academic rigor (GO) vs. Practical adoption (Schema.org)
- General-purpose (Dublin Core) vs. Domain-specific (SNOMED CT)

### Diagram:
- A `graph TD` Mermaid diagram connecting 5 ontologies to shared principles

---

## AC-015: Session 07 -- Exercises and Competency Questions

**GIVEN** the file `content/phase-6/07-exercises.mdx`,
**WHEN** the content is rendered,
**THEN** it contains:

### Basic Exercises:
- Exercise 1: Schema.org domain exploration task with guidance (visit schema.org, find relevant types, compare with CQs)
- Exercise 2: FOAF visual analysis task with Protege or WebVOWL alternative

### Challenge Exercise:
- Exercise 3: Wikidata SPARQL Gene Ontology query with at least 2 sample SPARQL queries and explanations

### Competency Questions:
All 3 Phase 6 competency questions from the curriculum are present with guidance:
1. "Schema.org is not using the full expressiveness of OWL -- what is the reason?" with guidance pointing to Session 03
2. "Explain with a biological example why multiple inheritance is needed in Gene Ontology" with guidance pointing to Session 04
3. "What characteristics do successful ontologies share?" with guidance pointing to Session 06

### Self-Assessment Checklist:
At least 4 self-assessment items

### Concept Map:
A `graph TD` Mermaid diagram connecting all Phase 6 concepts

---

## AC-016: YAML Frontmatter

**GIVEN** any Phase 6 MDX file,
**WHEN** the frontmatter is inspected,
**THEN** it contains all required fields:
- `title`: Korean session title (string)
- `description`: Korean description for search (string, 50-100 characters)
- `difficulty`: "intermediate" (string)

**Verification method:** Check each file starts with `---` followed by YAML block containing title, description, and difficulty fields, closed by `---`.

---

## AC-017: Content Depth

**GIVEN** any ontology analysis session file (01 through 05),
**WHEN** the word count of each major concept section is measured,
**THEN** each major concept section contains at least 300 Korean words (measured approximately by character count / 2 for Korean or by visual inspection of paragraph density).

**Guidance:** Each section should have at least 3 substantial paragraphs with real-world examples. Sections with only 1-2 sentences fail this criterion.

---

## AC-018: Comparison Tables

**GIVEN** ontology analysis sessions (01 through 05),
**WHEN** comparison tables are counted,
**THEN** each session contains at least 1 summary/comparison table in standard Markdown table syntax.

**GIVEN** the comparative analysis session (06-analysis.mdx),
**WHEN** the comparison table is inspected,
**THEN** a comprehensive table with all 5 ontologies and at least 5 columns exists.

---

## AC-019: Narrative Arc

**GIVEN** any ontology analysis session file (01 through 05),
**WHEN** the content structure is reviewed,
**THEN** each session follows the "purpose first, structure analysis, principle extraction" arc:
1. The ontology's purpose and problem context is described FIRST
2. Core structure is analyzed with concrete examples
3. Design principles are extracted as takeaways
4. Connection to the learner's practical work is established

**Verification method:** For each session, confirm that the purpose/context section appears before the structure analysis section, which appears before the principle extraction section.

---

## AC-020: Build Success

**GIVEN** all 8 Phase 6 MDX files are generated,
**WHEN** `bun run build` (or `npm run build`) is executed,
**THEN** the build completes with:
- Zero MDX parsing errors
- Zero Mermaid syntax errors
- Zero TypeScript errors
- All Phase 6 pages accessible in the built output

---

## AC-021: Navigation Integrity

**GIVEN** the site running in development mode,
**WHEN** the Phase 6 sidebar navigation is used,
**THEN** all 8 session links in the sidebar correctly navigate to the corresponding content page, and each page displays the full educational content (not skeleton placeholders).

---

## AC-022: Factual Accuracy

**GIVEN** all ontology analysis sessions (01-05),
**WHEN** the factual claims are reviewed,
**THEN**:
- FOAF class/property names match the actual FOAF vocabulary specification
- Dublin Core lists exactly 15 elements matching the actual Dublin Core Metadata Element Set
- Schema.org scale claims (800+ types, 1400+ properties) are consistent with publicly available data
- Gene Ontology three root terms (Molecular Function, Biological Process, Cellular Component) match the actual GO structure
- SNOMED CT scale claims (360,000+ concepts) are consistent with publicly available data
- HL7 FHIR Resource names match the actual FHIR specification
- No fabricated ontology structures, statistics, or examples appear

---

## AC-023: Phase 5 Cross-References

**GIVEN** all Phase 6 sessions,
**WHEN** Phase 5 references are reviewed,
**THEN** at least 3 sessions contain explicit references to Phase 5 concepts (METHONTOLOGY, competency questions, design patterns, quality criteria, or anti-patterns), and these references accurately reflect Phase 5 content as defined in the curriculum.

---

## AC-024: Phase 7 Forward References

**GIVEN** Phase 6 sessions (at minimum: 00-introduction, 06-analysis, 07-exercises),
**WHEN** Phase 7 references are reviewed,
**THEN** at least 2 sessions contain forward references to Phase 7 topics (Semantic Web, Knowledge Graphs, LLM era, manufacturing applications), and these references accurately reflect Phase 7 content as defined in the curriculum.

---

## AC-025: SPARQL Exercise Validity

**GIVEN** the file `content/phase-6/07-exercises.mdx`,
**WHEN** the SPARQL queries in Exercise 3 are inspected,
**THEN**:
- At least 2 SPARQL queries are provided with syntax highlighting
- Each query has line-by-line Korean explanation
- Queries use stable Wikidata properties (e.g., P686 for Gene Ontology ID)
- A note is included that Wikidata is a live database and results may vary

---

## Quality Gate Summary

| ID | Criterion | Priority | Verification |
|----|-----------|----------|-------------|
| AC-001 | 8 complete MDX files | MUST | File count + line count |
| AC-002 | Korean content, English terms defined | MUST | Manual review |
| AC-003 | 3+ "why needed?" per file | MUST | Pattern count |
| AC-004 | 1 Mermaid diagram per file, safe syntax, correct types | MUST | Pattern check + render test |
| AC-005 | Zero JSX imports | MUST | Pattern check |
| AC-006 | 2+ "connection point" per file | MUST | Pattern count |
| AC-007 | 1+ "common misconception" per file | MUST | Pattern count |
| AC-008 | Session 00 required content | MUST | Manual review |
| AC-009 | Session 01 FOAF required content | MUST | Manual review |
| AC-010 | Session 02 Dublin Core required content | MUST | Manual review |
| AC-011 | Session 03 Schema.org required content | MUST | Manual review |
| AC-012 | Session 04 Gene Ontology required content | MUST | Manual review |
| AC-013 | Session 05 SNOMED CT/FHIR required content | MUST | Manual review |
| AC-014 | Session 06 comparative analysis required content | MUST | Manual review |
| AC-015 | Session 07 exercises and questions | MUST | Manual review |
| AC-016 | YAML frontmatter complete (difficulty: intermediate) | MUST | YAML validation |
| AC-017 | 300+ words per concept section | SHOULD | Approximate count |
| AC-018 | Comparison tables present (1 per ontology session + 1 comprehensive) | MUST | Table count |
| AC-019 | Purpose-structure-principle narrative arc | SHOULD | Structural review |
| AC-020 | Build success (zero errors) | MUST | Build command |
| AC-021 | Navigation integrity | MUST | Browser navigation test |
| AC-022 | Factual accuracy of ontology descriptions | MUST | Fact verification |
| AC-023 | Phase 5 cross-references accurate | MUST | Reference check |
| AC-024 | Phase 7 forward references present | MUST | Reference check |
| AC-025 | SPARQL exercise queries valid | SHOULD | Query syntax review |

---

## Definition of Done

Phase 6 content generation is DONE when:

1. All 25 acceptance criteria above are verified (MUST criteria pass, SHOULD criteria are best-effort)
2. `bun run build` completes with zero errors
3. All 8 Phase 6 pages render correctly in a browser with:
   - Full Korean educational content (not skeleton placeholders)
   - Mermaid diagrams rendering as visual diagrams (including classDiagram)
   - Comparison tables rendering with proper column alignment
   - No console errors related to MDX parsing
4. The 3 Phase 6 competency questions from the curriculum appear in `07-exercises.mdx` with guidance
5. The five-ontology comparison table in `06-analysis.mdx` is complete with all 5 ontologies and all required columns
6. Content follows the narrative arc established in `my-docs/edu-content.md`
7. Phase 5 design methodology concepts are referenced at least 3 times across Phase 6 content
8. Phase 7 application topics are referenced at least 2 times across Phase 6 content
