# Site Architecture Overview: Nextra 4.x Ontology Learning Platform

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    User's Browser (Client)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js Frontend Application (React 19)                 │  │
│  │  ├─ Navigation & Sidebar (Nextra)                        │  │
│  │  ├─ MDX Content Renderer                                 │  │
│  │  ├─ Search Interface (FlexSearch)                        │  │
│  │  ├─ Mermaid Diagram Renderer                             │  │
│  │  └─ Interactive Components (Exercises, Cards)            │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS
┌────────────────────────────────────────────────────────────────┐
│                   Deployment Platform                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Static Site (HTML, CSS, JS)                             │  │
│  │  ├─ Pre-rendered Pages (SSG)                             │  │
│  │  ├─ Search Index (JSON)                                  │  │
│  │  ├─ Assets (Images, SVG, Fonts)                          │  │
│  │  └─ Service Worker (Optional, for PWA)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Deployment Options:                                            │
│  • Vercel (Recommended) - Git-integrated, automatic deploys    │
│  • GitHub Pages - Free, simple, community-friendly             │
│  • Netlify - Flexible CI/CD, CDN, analytics                    │
│  • Self-hosted - Docker, nginx, cloud storage                  │
└────────────────────────────────────────────────────────────────┘
```

---

## Content Organization Strategy

### Information Hierarchy

```
Site Root (/)
│
├── Home Page (index.mdx)
│   └── Overview, learning path, quick start
│
├── Phase 1-8 (content/phase-X/)
│   ├── Introduction (00-introduction.mdx)
│   ├── Core Concepts (01-*.mdx through 05-*.mdx)
│   │   ├── Concept explanation with "왜 필요한가?" (Why?)
│   │   ├── Real-world examples and analogies
│   │   ├── 흔한 오해 (Common Misconceptions)
│   │   └── Mermaid diagrams
│   └── Exercises (06-exercises.mdx or 07-exercises.mdx)
│       ├── 기본 실습 (Basic Practice)
│       ├── 도전 실습 (Challenge Practice)
│       └── Competency Questions
│
├── Reference (content/reference/)
│   ├── Glossary (glossary.mdx)
│   │   └── All technical terms with Korean explanations
│   ├── FAQ (faq.mdx)
│   │   └── Common questions indexed by phase
│   ├── Misconceptions Compilation (misconceptions.mdx)
│   │   └── Aggregated from all phases
│   ├── Resources (resources.mdx)
│   │   └── External links, tools, software
│   └── Bibliography (bibliography.mdx)
│       └── Academic papers and references
│
└── About (content/about/)
    ├── About This Site (index.mdx)
    ├── Curriculum Philosophy (curriculum.mdx)
    └── Contributors (contributors.mdx)
```

### Navigation Principles

**Progressive Disclosure:**
- Each phase builds on previous understanding
- Advanced topics deferred to Phase 8
- Cross-references guide revisiting earlier concepts
- Glossary provides just-in-time term clarification

**Multiple Entry Points:**
- Beginners start at Phase 1
- Experienced users jump to Phase 7 (Applications)
- Professionals use Reference section
- Search enables direct concept access

**Contextual Navigation:**
- Breadcrumbs show phase/concept hierarchy
- "Next Phase" and "Previous Phase" links
- "Related Concepts" in sidebar
- "See also" within content

---

## Component Architecture

### Layout Hierarchy

```
App Root (app/layout.tsx)
├── Nextra Layout Component
│   ├── Navigation Bar
│   │   ├── Logo/Home Link
│   │   ├── Search Bar
│   │   ├── Theme Toggle (Light/Dark)
│   │   └── Mobile Menu
│   │
│   ├── Sidebar
│   │   ├── Phase Sections (1-8)
│   │   ├── Reference Section
│   │   └── About Section
│   │
│   ├── Main Content Area
│   │   └── Rendered MDX Page
│   │
│   └── Footer
│       ├── Site Info
│       ├── External Links
│       └── Copyright/License
│
└── Client-Side Components
    ├── Search Results Modal
    ├── Theme Provider
    └── Analytics (if enabled)
```

### MDX Component Library

**Structural Components:**
- `<Exercise>` - Practice exercises with difficulty levels
- `<ConceptCard>` - Visual concept summaries with icons
- `<CompetencyQuestion>` - Self-assessment questions
- `<Timeline>` - Chronological content (e.g., ontology history)

**Content Components:**
- `<Callout>` - Alert boxes (info, warning, success, error)
- `<CodeBlock>` - Syntax-highlighted code examples
- `<MermaidDiagram>` - Rendered diagrams with fallback text
- `<ImageWithCaption>` - Responsive images with descriptions

**Interactive Components:**
- `<Tabs>` - Tab-based content organization (e.g., different RDF serializations)
- `<Accordion>` - Collapsible sections (e.g., exercise solutions)
- `<Table>` - Data tables with sorting (e.g., ontology comparison)

**Navigation Components:**
- `<PrevNext>` - Navigation between pages
- `<RelatedPages>` - Suggest related content
- `<Breadcrumb>` - Show current location

---

## Data Flow Architecture

### Content Rendering Pipeline

```
MDX Source Files (content/phase-X/*.mdx)
       ↓
   Nextra Parser
       ↓
   MDX Compilation
       ↓
   Component Import Resolution
       ↓
   Mermaid Diagram Processing
       ↓
   Code Syntax Highlighting (Shiki)
       ↓
   Static HTML Generation (Next.js SSG)
       ↓
   Optimized Output (HTML + CSS + JS)
       ↓
   Deployed to CDN/Static Host
```

### Search Index Pipeline

```
MDX Content Files
       ↓
   Extract Headings & Text
       ↓
   Index Page Metadata
       ↓
   Build Search Index (FlexSearch)
       ↓
   Generate search.json
       ↓
   Deployed with Site Assets
       ↓
   Client-side Search (Browser)
```

### Asset Processing Pipeline

```
Raw Assets (public/images/)
       ↓
   Image Optimization
   ├─ Format conversion (WebP)
   ├─ Responsive sizes
   └─ Compression
       ↓
   Next.js Image Component
       ↓
   Optimized Delivery
   ├─ Lazy loading
   ├─ Responsive srcset
   └─ Automatic format selection
```

---

## Content Organization Strategy Details

### Phase Structure Design

**Pattern: Concept Scaffolding**

Each phase follows five-stage learning design:

1. **Motivation** (왜 필요한가?) - "Why do we care about this concept?"
   - Connect to previous phase knowledge
   - Show practical importance
   - Address common "why bother?" questions

2. **Conceptual Understanding** - Core explanation
   - Define the concept clearly
   - Use analogies and metaphors
   - Provide multiple perspectives

3. **Practical Examples** - Real-world application
   - Concrete examples from Korean industries
   - Code examples for applicable concepts
   - Visual Mermaid diagrams

4. **Common Pitfalls** (흔한 오해) - Address misconceptions
   - Directly counter wrong assumptions
   - Explain why mistakes are common
   - Provide correct mental models

5. **Practical Application** - Exercises and assessment
   - 기본 실습 (basic practice) for confidence building
   - 도전 실습 (challenge practice) for deepening
   - Competency questions for self-assessment

### Cross-Phase Linking Strategy

**Backward References:**
- When introducing new concept, reference where foundation was established
- Example: Phase 3 reasoning concepts link back to Phase 2 properties
- Enables review without re-reading entire phase

**Forward References:**
- Signal where concept will be applied
- Example: Phase 2 classes link ahead to Phase 7 manufacturing applications
- Gives learners "why we're learning this" context

**Glossary Integration:**
- Every technical term highlighted as glossary link
- Clicking reveals Korean explanation and phase where term introduced
- Progressive term complexity: Phase 1 terms simplest, Phase 8 most complex

### Accessibility and Inclusivity

**Language Accessibility:**
- All content in Korean (user's conversation language)
- English technical terms always paired with Korean explanation
- No unexplained jargon used
- Glossary provides single source of term definitions

**Cognitive Accessibility:**
- Short paragraphs (2-3 sentences typical)
- Scannable headings (descriptive, not clever)
- Bullet points for lists
- Visual diagrams accompanying text
- No flashing content

**Motor Accessibility:**
- Keyboard navigation fully supported
- Link targets large (44x44 px minimum)
- No hover-only interactions
- Mobile-friendly touch targets (48x48 px)

**Visual Accessibility:**
- Color not sole information indicator
- Alt text for all diagrams and images
- High contrast ratios (WCAG AA compliant)
- Responsive design for all zoom levels
- Mermaid diagrams have text descriptions

---

## Navigation Design Principles

### Sidebar Navigation

**Phase Organization:**
- 8 main phase sections clearly labeled
- Subsections within each phase shown on hover/expand
- Current page highlighted
- Collapse/expand behavior saves user preference

**Quick Navigation:**
- Search bar at top of sidebar
- Breadcrumb shows current location
- "Table of Contents" link to main site map
- Back-to-top button in footer

### Page Navigation

**Within-Page Navigation:**
- Heading-based table of contents in right sidebar
- Smooth scroll to any heading
- Section jump links in reference pages

**Between-Phase Navigation:**
- "Next Phase" button at bottom of last page of each phase
- "Previous Phase" link at top of phase introduction
- "Start Here" link to Phase 1 from later phases
- Random "Explore" link to serendipitous discovery

### Search Navigation

**Search Functionality:**
- Accessible from any page via header search box
- Results show title, phase, snippet of content
- Instant search (no page reload)
- Fuzzy matching for typos
- Category filtering (phase, concept type)

---

## MDX Content Pipeline

### File Structure for Content Modules

**Each Phase Directory Contains:**
- `_meta.js` - Navigation structure and page ordering
- `00-introduction.mdx` - Phase overview and learning objectives
- `01-*.mdx` through `05-*.mdx` - Concept explanations
- `06-exercises.mdx` or `07-exercises.mdx` - Practice exercises

**Standard Frontmatter (Optional):**
```yaml
---
title: "Page Title"
description: "Brief description for search/metadata"
difficulty: "beginner" | "intermediate" | "advanced"
keywords: ["ontology", "concept1", "concept2"]
---
```

### Content Authoring Patterns

**Concept Page Pattern:**

1. Opening paragraph states what you'll learn
2. "왜 필요한가?" section explains importance
3. Definition and core explanation
4. Real-world example with details
5. Mermaid diagram visualizing concept
6. 흔한 오해 (Common Misconceptions) section
7. Related concepts mentioned
8. Practice exercise or competency question

**Example Pattern for Phase 2 (Classes):**

1. "In this section, you'll learn about classes in ontologies"
2. "왜 필요한가?" - "Without classes, we can't organize knowledge"
3. Definition - "A class represents a category of similar individuals"
4. Example - "In a manufacturing ontology, 기계 (Machine) is a class"
5. Diagram - Class hierarchy visualization
6. 흔한 오해 - "Classes are not the same as programming classes"
7. Related - Links to Properties, Instances concepts
8. Exercise - "Create 5 classes for your own domain"

### Mermaid Diagram Strategy

**When to Use Diagrams:**
- Visual clarification of hierarchies (class diagrams)
- Process flows and reasoning steps (flowcharts)
- Interaction sequences (sequence diagrams)
- State transitions (state diagrams)
- Timelines and history (timeline/gantt)

**Diagram Per Concept:**
- One major diagram per concept when possible
- Multiple smaller diagrams for complex topics
- Always include text description alongside diagram
- Provide text alternative for screen readers

**Diagram Accessibility:**
- Clear, contrasting colors
- Shapes and colors both used for meaning
- Text labels in both English and Korean
- Alt text describes diagram purpose and structure

---

## Metadata and SEO Strategy

### Page Metadata

**Title Tags:**
- Format: "Concept Name | Phase X | Ontology Learning"
- Example: "Classes and Concepts | Phase 2 | Ontology Learning"

**Meta Descriptions:**
- 150-160 characters describing page content
- Include key concepts and phase context
- Encourage click-through from search results

**Canonical URLs:**
- Set on all pages to prevent duplicate content issues
- Standard: `https://ontology-learn.kr/phase-X/concept-name`

**Open Graph Tags:**
- og:title - Page title for social sharing
- og:description - Rich preview description
- og:image - Preview image (ontology diagram)
- og:type - Always "article" for content pages

### Search Indexing

**Nextra's FlexSearch:**
- Indexes page titles and headings (highest priority)
- Indexes first paragraph of content (medium priority)
- Ignores code blocks and metadata (lowest priority)
- Builds search index during static build

**Search Optimization:**
- Descriptive headings (not cute/clever)
- Keyword-rich first paragraph
- Strategic use of bold/emphasis for important terms
- Link anchors in table of contents

---

## Performance Optimization Architecture

### Static Generation Strategy

**Pre-rendered Pages:**
- All pages pre-rendered to static HTML at build time
- No server-side processing needed at runtime
- CDN edge caching for lightning-fast delivery
- Build time: ~30-60 seconds for entire site

**Search Index:**
- Search index generated during build
- Deployed as `search.json` with site assets
- Client-side searching in user's browser
- No API calls, instant results

### Asset Optimization

**Image Optimization:**
- Automatic WebP conversion with PNG fallback
- Responsive sizing for different devices
- Lazy loading for below-fold images
- SVG for diagrams (perfect scaling)

**Code Splitting:**
- Each phase is separate chunk (lazy loaded)
- Reference section separate chunk
- Shared components extracted
- Only critical CSS inline

**Caching Strategy:**
- Static assets cached indefinitely (1 year)
- HTML pages cached based on deployment
- Mermaid diagrams cached in browser
- Service worker optional for offline access

---

## Deployment and Hosting Architecture

### Build and Deploy Pipeline

```
Git Push (to main/develop)
     ↓
GitHub Webhook
     ↓
Vercel/CI System Triggered
     ↓
Environment Setup (Node.js 18+)
     ↓
npm install (deps)
     ↓
next build (SSG process)
     ↓
Output to .next/ and out/ directories
     ↓
Type checking (tsc check)
     ↓
Lint checking (eslint)
     ↓
Artifact upload to CDN
     ↓
Automatic deployment to production
     ↓
Status notification (email/Slack)
```

### Deployment Target: Vercel

**Advantages:**
- Zero-configuration deployment from GitHub
- Automatic branch deployments for PR preview
- Global edge network for instant delivery
- Automatic SSL/TLS certificates
- Analytics and monitoring built-in
- Rollback capability

**Deployment Settings:**
- Build Command: `npm run build`
- Output Directory: `.next` (for SSG export)
- Node.js Version: 18.17.0 or later
- Environment Variables: Set in Vercel dashboard

### Alternative Deployment: GitHub Pages

**Setup:**
- Repository must be public (unless GitHub Pro)
- Enable GitHub Pages in repository settings
- Set build output to gh-pages branch
- Configure custom domain (optional)

**Process:**
- GitHub Actions workflow triggers on push
- Runs `npm run build` and static export
- Pushes output to gh-pages branch
- GitHub Pages serves content

---

## Maintenance and Scalability

### Content Scalability

**Current Capacity:**
- 8 phases × 5-7 pages per phase = 50-56 pages
- ~2,000-3,000 words per page
- Total: 100,000-150,000 words
- Build size: 5-10 MB

**Future Expansion:**
- Can easily add new phases or sections
- Same architecture supports 500+ pages
- Search scales automatically
- Navigation structure remains clear up to 100 pages

### Maintenance Workflows

**Content Updates:**
- Edit `.mdx` files directly
- Push to GitHub
- Vercel auto-deploys within 30 seconds
- Rollback available if needed

**Glossary Updates:**
- Edit `reference/glossary.mdx`
- Add new terms in alphabetical order
- Include Korean translation and phase reference
- Auto-indexed by search system

**Diagram Updates:**
- Edit Mermaid syntax in code blocks
- Preview in mermaid.live if complex
- Commit to repository
- Auto-rendered on next deployment

### Analytics and Feedback

**User Analytics (if enabled):**
- Track most-visited phases
- Monitor exercise completion rates
- Identify search queries and results
- Analyze user flow through site

**Feedback Collection:**
- Simple feedback form (optional)
- Links to GitHub issues for suggestions
- Community forum for discussions

---

## Content Quality Assurance

### Pre-Publication Checklist

**Content Quality:**
- [ ] Mermaid diagrams syntax valid
- [ ] All links working (internal and external)
- [ ] Code examples tested if applicable
- [ ] Korean language reviewed for clarity
- [ ] Glossary terms added for new vocabulary

**Technical Quality:**
- [ ] TypeScript compilation passes (zero errors)
- [ ] ESLint checks pass (zero warnings)
- [ ] Markdown formatting consistent
- [ ] Images optimized and alt text present
- [ ] Mobile responsive preview successful

**Accessibility Quality:**
- [ ] Headings follow hierarchy (no skipped levels)
- [ ] Color contrast ratios WCAG AA compliant
- [ ] Screen reader testing (keyboard navigation)
- [ ] Form inputs properly labeled
- [ ] Mermaid diagrams have text descriptions

**SEO Quality:**
- [ ] Page title descriptive and unique
- [ ] Meta description accurate (150-160 chars)
- [ ] First paragraph keyword-rich
- [ ] Internal links to related content
- [ ] Open Graph tags set correctly

---

## Version

**Version:** 1.0 (Initial Architecture Overview)
**Last Updated:** 2026-03-10
**Architecture Style:** Static Site Generation (SSG)
**Framework:** Nextra 4.x + Next.js 15
**Scalability:** Supports 100-500+ pages easily
