type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// The primary CTA. Rendered as a link because every CTA on this page navigates.
// Visual rules live in `.btn` (globals.css) so all CTAs stay identical.
export default function Button({ href, children, className = "" }: ButtonProps) {
  return (
    <a href={href} className={`btn ${className}`}>
      {children}
    </a>
  );
}
