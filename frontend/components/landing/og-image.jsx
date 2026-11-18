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
      const logo = await readFile(join(process.cwd(), 'public/assets/img/logo-icon.png'));
      return new ImageResponse(
        (
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, color: '#f2fbfb', backgroundColor: '#07141c', backgroundImage: 'radial-gradient(60% 70% at 50% 0%, rgba(53,208,198,0.35) 0%, rgba(7,20,28,0) 70%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 600 }}>
              <img src={`data:image/png;base64,${logo.toString('base64')}`} width={56} height={56} style={{ borderRadius: 14 }} alt="" />
              {siteConfig.shortName}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 26, color: '#9db4be' }}>{t.hero.eyebrow}</div>
              <div style={{ display: 'flex', marginTop: 18, fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{`${t.hero.titleStart} ${t.hero.titleHighlight}`}</div>
              <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: '#35d0c6' }}>{t.hero.titleEnd}</div>
            </div>
            <div style={{ display: 'flex', fontSize: 26, color: '#9db4be' }}>{new URL(siteConfig.url).host}</div>
          </div>
        ),
        size,
      );
    },
  };
}
