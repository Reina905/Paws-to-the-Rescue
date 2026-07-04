/**
 * Adds horizontal padding to its children.
 * Use inside sections and page bodies — not as a page-level wrapper.
 * Renders a <div> (not <main>) to avoid invalid nested <main> elements.
 */
export const PaddingLayout = ({ children, className = '' }) => {
  return (
    <div className={`px-10 ${className}`}>
      {children}
    </div>
  )
}
