import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
import { Exercise } from './components/Exercise'
import { MermaidDiagram } from './components/MermaidDiagram'
import { ConceptCard } from './components/ConceptCard'
import { CompetencyQuestion } from './components/CompetencyQuestion'

const themeComponents = getThemeComponents()

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...themeComponents,
    Exercise,
    MermaidDiagram,
    ConceptCard,
    CompetencyQuestion,
    ...components,
  }
}
