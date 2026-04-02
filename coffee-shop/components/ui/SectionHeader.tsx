interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} ${className}`}>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-dark leading-tight">
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-14 bg-accent rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 font-body text-text-dark/65 text-base md:text-lg leading-relaxed max-w-xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
