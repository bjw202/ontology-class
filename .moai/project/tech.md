# Technology Stack: Nextra 4.x Ontology Learning Site

## Core Technology Stack

### Frontend Framework

**Next.js 15.x**

Latest version of Next.js with App Router, Turbopack compiler, and optimized performance. Provides zero-config React framework with built-in routing, API routes, and advanced features. Next.js handles server-side rendering, static generation, and optimized asset delivery.

**Features Used:**
- App Router for file-system based routing
- Automatic code splitting and dynamic imports
- Built-in optimization for images and fonts
- Environment variable management
- Development server with Fast Refresh
- Production build optimization with Turbopack

### Documentation Framework

**Nextra 4.x**

Modern documentation framework built on Next.js providing seamless MDX integration, automatic navigation generation, built-in search, and production-ready themes.

**Key Capabilities:**
- MDX support for mixing Markdown and React components
- File-system routing with automatic sidebar generation
- Built-in full-text search with FlexSearch
- Responsive theme with light/dark mode support
- Multiple layout options (docs, blog, hybrid)
- Internationalization (i18n) support for multi-language sites
- Static export for deployment flexibility

**Version:** 4.x (latest stable)

**Configuration:**
- Content directory structure with _meta.js files
- Theme configuration via Layout component in app/layout.tsx
- Search indexing automatic during build
- SSG (Static Site Generation) by default

### Content Format

**MDX 2.x**

MDX enables writing content in Markdown with embedded React components and JavaScript expressions. Provides powerful content authoring with seamless code integration and interactive examples.

**Capabilities:**
- Markdown syntax for structure and text
- React component import and usage inline
- JavaScript expressions for dynamic content
- Frontmatter metadata (optional)
- Code syntax highlighting with Shiki
- Line numbers and highlighting for code blocks

### TypeScript

**TypeScript 5.x**

Type-safe JavaScript development with full Next.js integration. Provides:
- Type checking at build time
- IntelliSense and code completion
- Type-safe component development
- Reduced runtime errors

**Configuration:**
- Strict mode enabled
- JSX support for React
- ES2020+ target
- Path aliases (@components, @lib, etc.)

---

## Key Dependencies

### Production Dependencies

**react@19.x and react-dom@19.x**

Latest React version with improved performance, server components, and React hooks. Provides component framework and DOM rendering.

**nextra@4.x**

Documentation framework with built-in MDX support, navigation generation, and search.

**next@15.x**

Next.js framework with App Router, optimizations, and deployment support.

**mermaid@11.12.2**

Diagram rendering library supporting 21 diagram types. Enables visual explanations of ontology concepts:
- Flowcharts for decision flows and processes
- Class diagrams for ontology structures
- Sequence diagrams for interaction flows
- State diagrams for reasoning processes
- Gantt charts for project timelines
- And 16 additional diagram types

**Features:**
- Client-side rendering for interactive diagrams
- SVG output for scalability
- Dark mode support
- Accessibility features

### Development Dependencies

**@types/react@19.x, @types/node@20.x**

TypeScript type definitions for React and Node.js. Essential for type-safe development.

**typescript@5.x**

TypeScript compiler for type checking and transpilation.

**prettier@3.x**

Code formatter for consistent formatting across MDX, TypeScript, and configuration files.

**eslint@8.x**

JavaScript linter with Next.js-specific rules. Configurable for Markdown linting.

---

## Development Environment Requirements

### System Requirements

**Node.js Version:** 18.17.0 or later (20.x LTS recommended)

Node.js runs the development server, builds, and development tooling.

**Package Manager:** npm 9.x, yarn 4.x, or bun 1.x

Recommended: bun 1.x for superior speed in local development.

**Operating System:** macOS, Linux, or Windows (WSL2 recommended)

All modern operating systems supported.

### Development Tools

**Editor:** VS Code recommended with extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Markdown All in One
- MDX support extension

**Browser:** Modern browser with DevTools (Chrome, Firefox, Safari, or Edge)

**Terminal:** bash, zsh, or PowerShell with Git installed

### Local Development Setup

Standard Node.js development workflow:

**Installation:** Clone repository, run `npm install` (or `bun install`), configure environment variables in `.env.local`

**Development Server:** Run `npm run dev` to start server on `http://localhost:3000` with Fast Refresh enabled

**Building:** Run `npm run build` to create production-optimized build

**Type Checking:** Run `npm run type-check` (if configured) for TypeScript validation

**Linting:** Run `npm run lint` for code quality checks

**Formatting:** Run `npm run format` for automatic code formatting

---

## Nextra 4.x Specific Configuration

### App Router Integration

Nextra 4.x uses Next.js App Router (not Pages Router):

**Root Layout (app/layout.tsx):**
- Imports Layout component from nextra/layouts
- Configures site-wide metadata and providers
- Sets up navigation structure
- Handles theme and dark mode

**Catch-all Route (app/[...slug]/page.tsx):**
- Renders MDX content from content/ directory
- Handles dynamic routing for all documentation pages
- Integrates with Nextra's routing system

### Content Directory Structure

**Root-level _meta.js:**
- Defines main navigation sections
- Controls sidebar section order
- Defines section titles and labels

**Phase-level _meta.js:**
- Defines subsection order within each phase
- Maps file names to display titles
- Controls phase table of contents

**Content Files (*.mdx):**
- Markdown content with optional JSX components
- Optional frontmatter metadata
- Images and diagrams referenced from public/ directory

### Navigation and Sidebar

**Automatic Generation:**
- Sidebar auto-generated from _meta.js files
- Breadcrumb navigation automatic
- Table of contents generated from headings

**Configuration Options:**
- Collapse/expand behavior
- Sidebar position (left default)
- Navigation depth

### Built-in Search

**FlexSearch Integration:**
- Full-text search index built during build
- Client-side search (no server required)
- Configurable search debounce

**Search Features:**
- Fuzzy matching for typo tolerance
- Page title and content indexing
- Category filtering (optional)

### Code Highlighting

**Shiki Integration:**
- Automatic syntax highlighting for code blocks
- Support for 100+ languages
- Theme colors matching site theme
- Line numbers and highlighting support

**Configuration:**
- Default language (TypeScript)
- Custom theme or built-in themes
- Line wrapping behavior

---

## Build and Deployment

### Build Process

**Development Build:**
- Fast rebuild with Next.js Fast Refresh
- Source maps for debugging
- No optimization
- File watching enabled

**Production Build:**
- Full optimization and minification
- Tree-shaking for dead code removal
- Code splitting for optimal loading
- Static export option for pure static sites

**Build Time:** Typically 30-60 seconds for full rebuild

**Build Output Size:** 5-10 MB (includes all assets)

### Static Export (SSG)

Nextra supports static site generation:

**Configuration:** Set `output: "export"` in next.config.mjs to enable static export

**Output Directory:** `out/` folder contains complete static HTML/CSS/JS

**Deployment:** Copy contents to CDN or static hosting (GitHub Pages, Vercel, etc.)

**Advantages:**
- No server required
- Maximum performance
- Enhanced security
- Simple deployment

### Deployment Options

**Vercel (Recommended):**
- Zero-configuration deployment from GitHub
- Automatic builds on push
- Built-in CDN and performance monitoring
- Environment variables support
- Automatic HTTPS and domain management

**GitHub Pages:**
- Free static hosting on github.com
- Deploy from gh-pages branch
- Custom domain support
- Automatic HTTPS

**Netlify:**
- Flexible CI/CD integration
- Form handling support
- Analytics built-in
- Custom headers and redirects

**Self-Hosted:**
- Deploy static export to any web server
- Nginx, Apache, or cloud storage (AWS S3)
- Full control over infrastructure
- Docker containerization option

---

## Content Authoring Guidelines

### Markdown Basics

**Standard Markdown syntax supported:**
- Headings: `#` through `######`
- Emphasis: `*italic*`, `**bold**`, `***bold italic***`
- Lists: unordered with `-` or `*`, ordered with `1.`
- Links: `[text](url)`
- Images: `![alt](path)`
- Code: inline with backticks, blocks with triple backticks

**GFM Extensions:**
- Tables with `|` syntax
- Strikethrough with `~~text~~`
- Task lists with `- [ ]` and `- [x]`
- Footnotes with `[^1]` syntax

### MDX Component Usage

**React Components:**
- Import at top: `import { Exercise } from '@/components/Exercise'`
- Use in content: `<Exercise difficulty="basic">Content here</Exercise>`

**No JSX Imports Required:**
- Callouts use blockquote syntax: `> **Note:** This is important`
- Alerts use blockquote with emoji or icon

**Custom Components Available:**
- `<Exercise>` for practice exercises
- `<ConceptCard>` for visual concept summaries
- `<CompetencyQuestion>` for self-assessment
- `<MermaidDiagram>` for diagram rendering

### Mermaid Diagram Syntax

**Diagrams embedded as code blocks:**
```
​```mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C{Decision}
    C -->|Yes| D[End]
    C -->|No| B
​```
```

**Important Constraints:**
- No apostrophes in node labels (use single or double quotes)
- No `+` operators in stateDiagram-v2 transitions
- Use `-->` for standard transitions
- Use `|text|` for conditional labels

**Supported Diagram Types:**
- flowchart (most common for ontology processes)
- sequenceDiagram (API and interaction flows)
- classDiagram (ontology structures)
- stateDiagram-v2 (reasoning states)
- graph (general purpose)
- timeline, gantt, mindmap (for planning)

### Code Block Formatting

**Language Identifiers:**
- TypeScript: ````typescript`
- Python: ````python`
- SPARQL: ````sparql` (or ````sql`)
- XML/RDF: ````xml`
- JSON/JSON-LD: ````json`
- Turtle: ````turtle` (or ````sparql`)

**Features:**
- Syntax highlighting automatic
- Line numbers optional with `{1,2,3}`
- Highlight specific lines with `{2-4}`
- Title lines with `// title: "Example"`

### Image Optimization

**Image Formats:**
- PNG for diagrams and screenshots
- WebP for photographs (with PNG fallback)
- SVG for icons and diagrams

**Optimization:**
- Compress images before adding
- Use descriptive alt text for accessibility
- Reference from public/images/ directory
- Organize by phase in subdirectories

### Search Optimization

**Frontmatter Metadata (Optional):**
```mdx
---
title: "Ontology Building Blocks"
description: "Learn about classes, instances, properties, and axioms"
keyword: ["ontology", "class", "instance", "property"]
---
```

**Content Indexing:**
- Headings indexed automatically
- First paragraph important for snippets
- Keywords in frontmatter improve ranking

---

## Performance Optimizations

### Image Handling

**Next.js Image Component:**
- Automatic format conversion (WebP for modern browsers)
- Responsive image sizes
- Lazy loading by default
- Built-in optimization

### Code Splitting

**Automatic by Next.js:**
- Each page gets own bundle
- Shared code extracted to common bundle
- Component-level code splitting possible

### Caching Strategy

**Browser Cache:**
- Static assets cached with fingerprints
- Long cache duration (1 year)
- Automatic cache busting on changes

**CDN Cache (Vercel):**
- ISR (Incremental Static Regeneration) for dynamic content
- 60-second cache default
- Manual revalidation available

---

## Environment Variables

### Required Variables

**NEXT_PUBLIC_SITE_URL** - Site domain for SEO (e.g., https://ontology-learn.kr)

**NEXT_PUBLIC_MERMAID_THEME** - Mermaid diagram theme (default, forest, dark)

### Optional Variables

**NEXT_PUBLIC_GA_ID** - Google Analytics ID for tracking (optional)

**NEXT_PUBLIC_SEARCH_ENABLED** - Enable/disable search feature (default: true)

### Configuration

Variables set in `.env.local` for local development, and in Vercel/deployment dashboard for production.

---

## Quality Assurance

### Linting and Type Checking

**ESLint Configuration:**
- Next.js recommended rules
- React best practices
- TypeScript support
- Custom rules for Markdown linting

**TypeScript Checking:**
- Full type safety enabled
- Strict mode for maximum safety
- No `any` type allowed without explanation

### Build Verification

**Pre-deployment Checks:**
- TypeScript compilation must pass (zero errors)
- ESLint must pass all checks
- Mermaid diagrams must be valid syntax
- All external links must be valid

### Testing Strategy

**Manual Testing:**
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing (320px-2560px widths)
- Dark/light mode verification
- Search functionality validation

**Automated Testing (Optional):**
- Lighthouse score >90
- Link validation
- Mobile Friendly Test
- Schema validation

---

## Version Control

### Git Workflow

**Branching Strategy:**
- `main` branch for production-ready content
- `develop` branch for ongoing work
- Feature branches for new phases or major content

**Commit Message Format:**
```
feat: Add Phase X content
fix: Correct terminology in glossary
docs: Update README with new guidelines
style: Format code blocks
refactor: Reorganize Phase structure
```

**Large Files:**
- Use Git LFS for images >5 MB
- Avoid binary files in main repository
- Store diagrams as source (generate SVG during build)

---

## Maintenance and Updates

### Content Updates

**Regular Tasks:**
- Quarterly review of technical accuracy
- Monthly glossary expansion
- Weekly external link validation
- Annual curriculum review against latest research

### Dependency Updates

**Npm/Node Updates:**
- Monthly security updates
- Quarterly feature updates
- Annual major version upgrades

**Nextra/Next.js Updates:**
- Follow latest releases
- Test thoroughly before upgrading major versions
- Update documentation for breaking changes

### Analytics and Monitoring

**Metrics Tracked (if enabled):**
- Page views and unique visitors
- Time on page for each phase
- Exercise completion rates
- Search queries and results
- User flow analysis

---

## Security Considerations

### Content Security

**No User Input:**
- Static site with no forms or user-generated content
- No backend database required
- XSS vulnerabilities eliminated
- CSRF not applicable

**Dependencies:**
- Regular security audits via npm audit
- Automatic dependabot updates recommended
- No vulnerable packages allowed in production

### Deployment Security

**HTTPS:**
- Automatic via Vercel or GitHub Pages
- TLS 1.2+ enforced
- Certificate renewal automatic

**Content Integrity:**
- Git history provides version tracking
- Deployment logs for audit trail
- Code review required before main branch

---

## Documentation

### Project Documentation

**README.md:** Installation, development, and deployment instructions

**CONTRIBUTING.md:** Guidelines for content contributors

**STYLE.md:** Writing style guide for consistent voice and tone

### Technical Documentation

**Architecture Notes:** Documented in `.moai/project/` directory

**Component Library:** JSDoc comments in React components

**Configuration:** Inline comments in config files

---

## Support and Resources

### Official Documentation

- Next.js: https://nextjs.org/docs
- Nextra: https://nextra.site
- React: https://react.dev
- MDX: https://mdxjs.com
- Mermaid: https://mermaid.js.org
- TypeScript: https://www.typescriptlang.org/docs

### Community Resources

- Next.js Discord: https://discord.gg/nextjs
- React Discord: https://discord.gg/react
- Stack Overflow tags: next.js, nextra, react, mermaid

---

## Version

**Version:** 1.0 (Initial Technology Stack)
**Last Updated:** 2026-03-10
**Nextra Version:** 4.x
**Next.js Version:** 15.x
**Node.js Version:** 18.17.0+
