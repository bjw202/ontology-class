interface ConceptCardProps {
  title: string
  description: string
  icon?: string
  variant?: 'default' | 'highlight' | 'warning'
}

export function ConceptCard({ title, description, icon, variant = 'default' }: ConceptCardProps) {
  return (
    <div className={`concept-card concept-card--${variant}`}>
      <div className="concept-card__header">
        {icon && <span className="concept-card__icon">{icon}</span>}
        <strong className="concept-card__title">{title}</strong>
      </div>
      <p className="concept-card__body">{description}</p>
    </div>
  )
}
