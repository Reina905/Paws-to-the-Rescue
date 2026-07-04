/**
 * Reusable centered section header: eyebrow label (optional), title, divider, subtitle.
 * @param {string} label - Small uppercase label above the title (optional)
 * @param {string} title
 * @param {string} subtitle
 * @param {string} [className] - Extra classes for the wrapper
 */
export const SectionHeader = ({ label, title, subtitle, className = "" }) => (
  <div className={`text-center ${className}`}>
    {label && (
      <span className="text-primary font-semibold uppercase tracking-[3px] text-sm">
        {label}
      </span>
    )}
    <h2 className={`font-bold text-gray-900 ${label ? "mt-4 text-5xl" : "text-4xl"}`}>
      {title}
    </h2>
    <div className="w-24 h-1 bg-primary rounded-full mx-auto my-5" />
    {subtitle && (
      <p className="text-gray-600 max-w-2xl mx-auto leading-8">{subtitle}</p>
    )}
  </div>
)
