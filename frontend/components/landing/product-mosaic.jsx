import { getDictionary, projectHref } from '@/lib/i18n';
import { cn } from '@/lib/utils';

// Full-width collage of our products: one large UI fragment per tile, every tile links to its project page.
// From md up: two tall phones left and right, five tiles between them. Below md: two columns in the order of the
// order-* classes; below sm only the two phones share a row, the others take the full width to stay readable.
const phone = 'top-12 left-1/2 w-[64%] max-w-[260px] -translate-x-1/2 drop-shadow-[0_20px_28px_rgba(10,15,36,0.35)] md:top-1/2 md:w-[76%] md:-translate-y-1/2';
const card = 'rounded-xl md:rounded-2xl shadow-[0_24px_48px_rgba(10,15,36,0.35)]';
const pillClass = 'rounded-full px-3 py-1.5 text-sm leading-none font-extrabold';

const tiles = [
  { slug: 'hubnity', name: 'Hubnity', file: 'hubnity-phone', size: [640, 1344], tile: 'order-1 h-72 bg-[#1d4ed8] md:col-span-5 md:row-span-2', art: phone },
  { slug: 'jv-mobel-online-shop', name: 'JV Möbel', size: [1252, 551], tile: 'order-3 col-span-2 h-48 bg-[#b23a2b] sm:col-span-1 sm:h-64 md:col-span-7', art: cn(card, 'top-14 left-1/2 w-[88%] max-w-[300px] -translate-x-1/2 sm:top-20 sm:max-w-[560px]'), inDevelopment: true },
  { slug: 'aftercool', name: 'Aftercool', file: 'aftercool-cards', size: [800, 646], tile: 'order-4 col-span-2 h-64 bg-[#0fa89a] [container-type:size] sm:col-span-1 md:col-span-7', art: cn(card, 'top-14 left-1/2 w-[min(84cqw,calc((100cqh-5rem)*1.238))] -translate-x-1/2 md:top-16') },
  { slug: 'benim-depom', name: 'Benim Depom', file: 'benim-depom-phone', size: [640, 1344], tile: 'order-2 h-72 bg-[#f28a24] md:col-span-5 md:row-span-2', art: phone },
  { slug: 'cashbook', name: 'Cashbook', file: 'cashbook-reports', size: [1030, 494], tile: 'order-5 col-span-2 h-52 bg-[#f6c453] [container-type:size] sm:h-72 md:col-span-10', art: cn(card, 'top-4 left-1/2 w-[min(92cqw,calc((100cqh-4.5rem)*2.085))] -translate-x-1/2 md:top-6'), bottom: true },
  { slug: 'roader', name: 'Roader', size: [1004, 340], tile: 'order-6 col-span-2 h-48 bg-[#0b120d] md:col-span-4', art: cn(card, 'top-[12%] left-[6%] w-[135%] max-w-[520px] -rotate-6 border border-white/15 sm:top-[18%] sm:w-[85%] sm:max-w-none md:top-[26%] md:left-[8%] md:w-[210%]'), bottom: true },
];

export default function ProductMosaic({ locale }) {
  const { nav, portfolio } = getDictionary(locale);
  return (
    <section aria-label={nav.portfolio} className="mt-18">
      <ul className="grid grid-cols-2 gap-1.5 md:h-[clamp(460px,46vw,780px)] md:grid-cols-[repeat(24,minmax(0,1fr))] md:grid-rows-2 md:gap-2.5">
        {tiles.map((item) => (
          <li key={item.slug} className={cn('relative overflow-hidden md:order-none md:h-auto', item.tile)}>
            <a href={projectHref(locale, item.slug)} className="group absolute inset-0 block">
              <img src={`/assets/img/mosaic/${item.file || item.slug}.webp`} alt="" width={item.size[0]} height={item.size[1]} decoding="async"
                className={cn('absolute h-auto transition-[scale] duration-300 group-hover:scale-[1.04] motion-reduce:transition-none', item.art)} />
              <span className={cn('absolute right-3 left-3 flex flex-wrap gap-1.5', item.bottom ? 'bottom-3' : 'top-3')}>
                <span className={cn(pillClass, 'bg-ink text-white')}>{item.name}</span>
                {item.inDevelopment && <span className={cn(pillClass, 'bg-card text-ink')}>{portfolio.inDevelopment}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
