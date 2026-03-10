# Project Structure: Nextra 4.x Ontology Learning Site

## Directory Architecture

```
ontology-class/
├── app/                              # Next.js 15 App Router (Nextra 4.x)
│   ├── layout.tsx                    # Root layout with Nextra Layout component
│   ├── page.tsx                      # Home page (/)
│   └── [...slug]/
│       └── page.tsx                  # Catch-all for documentation pages
│
├── content/                          # Content directory (Nextra 4.x structure)
│   ├── _meta.js                      # Root navigation metadata
│   ├── index.mdx                     # Home page content
│   │
│   ├── phase-1/                      # Phase 1: Why do we need ontologies?
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx       # Introduction to Phase 1
│   │   ├── 01-motivation.mdx         # Motivation and problem statement
│   │   ├── 02-interoperability.mdx   # Interoperability problems
│   │   ├── 03-gruber-definition.mdx  # Gruber definition of ontology
│   │   ├── 04-benefits.mdx           # Benefits and value proposition
│   │   └── 05-exercises.mdx          # Exercises for Phase 1
│   │
│   ├── phase-2/                      # Phase 2: Ontology Building Blocks
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-classes.mdx            # Classes and concepts
│   │   ├── 02-instances.mdx          # Instances and individuals
│   │   ├── 03-properties.mdx         # Properties and relationships
│   │   ├── 04-axioms.mdx             # Axioms and constraints
│   │   ├── 05-hierarchy.mdx          # Class hierarchy and inheritance
│   │   └── 06-exercises.mdx
│   │
│   ├── phase-3/                      # Phase 3: Logical Foundations
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-description-logic.mdx  # Introduction to Description Logic
│   │   ├── 02-owa-cwa.mdx            # Open World vs Closed World Assumptions
│   │   ├── 03-reasoning-types.mdx    # Inference and reasoning types
│   │   ├── 04-reasoners.mdx          # Reasoner tools and engines
│   │   ├── 05-complexity.mdx         # Computational complexity
│   │   └── 06-exercises.mdx
│   │
│   ├── phase-4/                      # Phase 4: Standards & Language Ecosystem
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-rdf.mdx                # RDF (Resource Description Framework)
│   │   ├── 02-rdfs.mdx               # RDFS (RDF Schema)
│   │   ├── 03-owl.mdx                # OWL (Web Ontology Language)
│   │   ├── 04-sparql.mdx             # SPARQL query language
│   │   ├── 05-serialization.mdx      # Serialization formats (XML, Turtle, JSON-LD)
│   │   ├── 06-tools-software.mdx     # Tools and software (Protégé, etc)
│   │   └── 07-exercises.mdx
│   │
│   ├── phase-5/                      # Phase 5: Ontology Design Methodology
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-methontology.mdx       # METHONTOLOGY framework
│   │   ├── 02-competency-questions.mdx  # Competency questions technique
│   │   ├── 03-top-down-design.mdx    # Top-down design approach
│   │   ├── 04-bottom-up-design.mdx   # Bottom-up design approach
│   │   ├── 05-anti-patterns.mdx      # Anti-patterns to avoid
│   │   ├── 06-quality-criteria.mdx   # Quality criteria and evaluation
│   │   └── 07-exercises.mdx
│   │
│   ├── phase-6/                      # Phase 6: Major Standard Ontologies
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-foaf.mdx               # FOAF (Friend of a Friend)
│   │   ├── 02-dublin-core.mdx        # Dublin Core Metadata
│   │   ├── 03-schema-org.mdx         # Schema.org ontology
│   │   ├── 04-gene-ontology.mdx      # Gene Ontology (GO)
│   │   ├── 05-snomed-ct.mdx          # SNOMED CT medical ontology
│   │   ├── 06-analysis.mdx           # Comparative analysis
│   │   └── 07-exercises.mdx
│   │
│   ├── phase-7/                      # Phase 7: Real-World Applications
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-semantic-web.mdx       # Semantic Web applications
│   │   ├── 02-knowledge-graphs.mdx   # Knowledge Graphs (Google, DBpedia)
│   │   ├── 03-search-recommendation.mdx  # Search and recommendation systems
│   │   ├── 04-nlp-ontology.mdx       # NLP combined with ontologies
│   │   ├── 05-llm-graph-rag.mdx      # LLM era: Graph RAG and neo4j
│   │   ├── 06-manufacturing.mdx      # Manufacturing and Industry 4.0 applications
│   │   └── 07-exercises.mdx
│   │
│   ├── phase-8/                      # Phase 8: Limits & Alternatives
│   │   ├── _meta.js
│   │   ├── 00-introduction.mdx
│   │   ├── 01-cost-reality.mdx       # The reality of ontology costs
│   │   ├── 02-mapping-problems.mdx   # Mapping and integration problems
│   │   ├── 03-vector-embeddings.mdx  # Vector embeddings as alternative
│   │   ├── 04-comparison.mdx         # Ontology vs embeddings comparison
│   │   ├── 05-decision-tree.mdx      # Decision tree: when to use ontology
│   │   ├── 06-when-not-to-use.mdx    # When NOT to use ontologies
│   │   └── 07-exercises.mdx
│   │
│   ├── reference/                    # Reference section
│   │   ├── _meta.js
│   │   ├── glossary.mdx              # Complete glossary of terms (English with Korean)
│   │   ├── faq.mdx                   # Frequently Asked Questions
│   │   ├── misconceptions.mdx        # Common misconceptions compilation
│   │   ├── resources.mdx             # External resources and links
│   │   └── bibliography.mdx          # Academic references and papers
│   │
│   └── about/                        # About section
│       ├── _meta.js
│       ├── index.mdx                 # About this site
│       ├── curriculum.mdx            # Curriculum design philosophy
│       └── contributors.mdx          # Contributors and acknowledgments
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── phase-1/
│   │   ├── phase-2/
│   │   ├── ... (one per phase)
│   │   └── diagrams/                 # Generated Mermaid diagram SVG
│   │
│   ├── icons/                        # Custom icons for UI elements
│   │   ├── ontology.svg
│   │   ├── graph.svg
│   │   └── knowledge.svg
│   │
│   └── fonts/                        # Custom fonts (if needed)
│       └── noto-sans-kr.woff2        # Korean font (optional, CDN recommended)
│
├── .nextra/                          # Nextra configuration (Nextra 4.x)
│   └── config.json                   # Nextra-specific configuration
│
├── components/                       # React components for MDX
│   ├── Callout.tsx                   # Custom callout component
│   ├── CodeBlock.tsx                 # Custom code block component
│   ├── Exercise.tsx                  # Exercise template component
│   ├── MermaidDiagram.tsx            # Mermaid diagram wrapper
│   ├── ConceptCard.tsx               # Concept card for visual learning
│   ├── ProgressIndicator.tsx         # Phase progress indicator
│   └── CompetencyQuestion.tsx        # Self-assessment component
│
├── lib/                              # Utility functions
│   ├── utils.ts                      # General utilities
│   ├── mdx-utils.ts                  # MDX processing utilities
│   └── search.ts                     # Search index management
│
├── styles/                           # Global styles
│   ├── globals.css                   # Global styles
│   ├── variables.css                 # CSS variables for theming
│   └── components.css                # Component-specific styles
│
├── next.config.mjs                   # Next.js 15 configuration with Nextra
├── tailwind.config.ts                # Tailwind CSS configuration (optional)
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # NPM dependencies
├── package-lock.json                 # Dependency lock file
│
├── .env.local                        # Environment variables (local)
├── .env.example                      # Environment variables template
│
├── .gitignore                        # Git ignore rules
├── README.md                         # Project README
└── LICENSE                           # MIT License
```

---

## Content Organization Details

### Phase Structure

Each phase (1-8) follows consistent structure:

**_meta.js Structure:**
- Exports object with numbered entries for subsections
- Each subsection maps to MDX file
- "exercises" or similar link appears last in each phase

**Example _meta.js for Phase 1:**
```
export default {
  "00-introduction": "Phase 1: Introduction",
  "01-motivation": "Motivation and Problem",
  "02-interoperability": "Interoperability Issues",
  "03-gruber-definition": "Gruber's Definition",
  "04-benefits": "Benefits Overview",
  "05-exercises": "Exercises"
}
```

### MDX File Conventions

**File Naming:**
- Numeric prefix (00, 01, 02...) for ordering
- Kebab-case for readability
- One topic per file

**Front Matter (optional but recommended):**
- Title: Display name
- Description: Brief summary for search
- Difficulty: beginner, intermediate, advanced

### Navigation Flow

Root level (_meta.js) structure:
- Welcome/Home section
- Phase 1-8 sections
- Reference section (Glossary, FAQ, etc)
- About section

### Cross-Reference System

**Internal References:**
- Phase-to-phase links using relative paths
- "See also" sections at bottom of pages
- Glossary links for technical terms

**External References:**
- Bibliography with academic papers
- Resource links section
- Tool and software links

---

## Configuration Files

### next.config.mjs

Configures Next.js 15 with Nextra 4.x support:
- Enables App Router
- Configures Turbopack for fast builds
- Sets up MDX and Mermaid support
- Configures output (standalone or node-compatible)
- Adds environment-specific redirects

### package.json Structure

```json
{
  "name": "ontology-learning-site",
  "version": "1.0.0",
  "description": "Comprehensive ontology learning platform for Korean beginners",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "validate": "npm run lint && npm run build"
  },
  "dependencies": {
    "next": "^15.x",
    "nextra": "^4.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "mermaid": "^11.12.2"
  },
  "devDependencies": {
    "@types/react": "^19.x",
    "@types/node": "^20.x",
    "typescript": "^5.x",
    "prettier": "^3.x",
    "eslint": "^8.x"
  }
}
```

### TypeScript Configuration

Standard `tsconfig.json` with:
- ES2020 target
- Strict mode enabled
- JSX support for React 19
- Path aliases for @components, @lib, etc.

---

## Asset Organization

### Images Directory

- `public/images/phase-1/` through `public/images/phase-8/`
- Subdirectories for concepts and examples
- PNG or WebP format for web optimization
- Naming convention: `concept-name.png`

### Diagrams Directory

- Mermaid diagrams rendered and saved as SVG
- Automatic generation from diagram source
- One diagram per concept typically
- Fallback alt-text descriptions

### Component Library

Custom React components for enhanced learning:

**Callout Component:**
- Types: info, warning, success, error
- Used in MDX with blockquote syntax >

**Exercise Component:**
- Basic (기본 실습) vs Challenge (도전 실습)
- Includes solution toggle
- Progress tracking optional

**ConceptCard Component:**
- Visual summary of concepts
- Used for quick reference
- Supports icons and gradients

---

## Build Outputs

### Static Export

When building for Vercel or GitHub Pages:
- All pages pre-rendered to static HTML
- Search index generated as JSON
- Assets optimized for web delivery
- Output size: ~50-100 MB uncompressed

### Development Build

When running locally:
- Hot Module Replacement (HMR) enabled
- Development-optimized build
- Source maps included

---

## File Sizing and Performance

### Content Metrics

- Total markdown/MDX files: ~50 files
- Average page size: 2,000-3,000 words
- Total content: ~100,000-150,000 words
- Estimated build size: 5-10 MB

### Performance Targets

- Homepage load: <1.5 seconds
- Phase page load: <2 seconds
- Mobile-optimized: <3 seconds on 4G
- Lighthouse score: >90

---

## Deployment Structure

### Vercel Deployment

- Git integration with automatic deploys
- Environment variables for API keys
- Caching strategy optimized
- CDN distribution worldwide

### GitHub Pages Alternative

- Static export to `out/` directory
- GitHub Actions workflow for builds
- Custom domain support
- No database required

---

## Version

**Version:** 1.0 (Initial Architecture)
**Last Updated:** 2026-03-10
**Compatibility:** Nextra 4.x, Next.js 15, Node.js 18+
