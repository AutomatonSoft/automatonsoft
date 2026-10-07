import RootDocument from '@/components/layout/root-document';
import ButtonLink from '@/components/sections/button-link';

export const metadata = { title: '404 | AutomatonSoft GmbH', robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <main className="page-hero" style={{ minHeight: '100vh' }}>
        <div className="hex-pattern" />
        <div className="container">
          <h1>404</h1>
          <p>Diese Seite existiert nicht. · This page does not exist.</p>
          <div className="hero-actions"><ButtonLink href="/">Zur Startseite</ButtonLink><ButtonLink href="/en" variant="outline">Go to homepage</ButtonLink></div>
        </div>
      </main>
    </RootDocument>
  );
}
