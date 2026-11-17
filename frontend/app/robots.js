import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/'] },
    sitemap: new URL('/sitemap.xml', siteConfig.url).href,
  };
}
