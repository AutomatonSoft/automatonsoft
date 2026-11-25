import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { landingFromSlug, landingParams, landings } from '@/lib/landings';
import { siteConfig } from '@/lib/site-config';

// Social preview (LinkedIn, WhatsApp, Telegram …) per landing, rendered once at build time – no cost at runtime.
export const size = { width: 1200, height: 630 };

export function createLandingOgImage(locale) {
  return {
    generateStaticParams: () => landingParams(locale),
    Image: async function LandingOgImage({ params }) {
      const t = landings[landingFromSlug(locale, (await params).industry)].content[locale];
      const logo = await readFile(join(process.cwd(), 'public/assets/img/logo-lockup-on-dark.png'));
      return new ImageResponse(
        (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, color: '#ffffff', backgroundColor: '#062587', backgroundImage: 'radial-gradient(60% 70% at 50% 0%, rgba(0,160,236,0.45) 0%, rgba(6,37,135,0) 70%)' }}>
            <div style={{ display: 'flex' }}>
              <img src={`data:image/png;base64,${logo.toString('base64')}`} width={293} height={64} alt={siteConfig.shortName} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 26, color: '#c7dbff' }}>{t.hero.eyebrow}</div>
              <div style={{ display: 'flex', marginTop: 18, fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{`${t.hero.titleStart} ${t.hero.titleHighlight}`}</div>
              <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: '#90c5ff' }}>{t.hero.titleEnd}</div>
            </div>
            <div style={{ display: 'flex', fontSize: 26, color: '#c7dbff' }}>{new URL(siteConfig.url).host}</div>
          </div>
        ),
        size,
      );
    },
  };
}
