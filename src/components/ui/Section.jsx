export default function Section({ className = '', children, ...props }) {
  return (
    <section className={`py-6 sm:py-10 ${className}`.trim()} {...props}>
      {children}
    </section>
  )
}
