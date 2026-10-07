// siteStyles: the public stylesheet; the dashboard opts out because it is styled with Tailwind only.
export default function RootDocument({ lang, className, siteStyles = true, children }) {
  return (
    <html lang={lang} className={className}>
      {siteStyles && <head><link rel="stylesheet" href="/assets/css/style.css" /></head>}
      <body>{children}</body>
    </html>
  );
}
