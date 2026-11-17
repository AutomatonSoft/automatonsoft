import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// style.css keeps its name, so a content hash makes browsers fetch it again after every change.
const styleHash = createHash('sha1').update(readFileSync(join(process.cwd(), 'public/assets/css/style.css'))).digest('hex').slice(0, 10);

// siteStyles: the public stylesheet; the dashboard opts out because it is styled with Tailwind only.
export default function RootDocument({ lang, className, siteStyles = true, children }) {
  return (
    <html lang={lang} className={className}>
      {siteStyles && <head><link rel="stylesheet" href={`/assets/css/style.css?v=${styleHash}`} /></head>}
      <body>{children}</body>
    </html>
  );
}
