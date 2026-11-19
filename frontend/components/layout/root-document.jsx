// The <html> and <body> of every root layout. Styles come from app/globals.css (Tailwind), imported by each layout.
export default function RootDocument({ lang, className, children }) {
  return (
    <html lang={lang} className={className}>
      <body>{children}</body>
    </html>
  );
}
