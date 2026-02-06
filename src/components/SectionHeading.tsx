
// src/components/SectionHeading.tsx

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      {/* Op mobiel (xs) stacken; vanaf sm (≥640px) naast elkaar */}
      <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-2 sm:gap-6 items-start sm:items-end">
        <div>
          {eyebrow && (
            <p className="uppercase tracking-wider text-xs text-neutral-500 mb-1">{eyebrow}</p>
          )}
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">{title}</h2>
        </div>

        {subtitle && (
<p className="text-neutral-600 sm:justify-self-end sm:text-right sm:leading-snug [text-wrap:balance] sm:w-full">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
