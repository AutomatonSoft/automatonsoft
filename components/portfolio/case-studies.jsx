import { href } from '@/lib/i18n';
import ButtonLink from '@/components/sections/button-link';
import SectionHead from '@/components/sections/section-head';
import Switcher from '@/components/sections/switcher';
import CaseStudy from '@/components/portfolio/case-study';

export default function CaseStudies({ locale, content }) {
  const { items, deliveredLabel, similar } = content;
  return (
    <>
      <SectionHead eyebrow={content.eyebrow} title={content.title} text={content.text} />
      <Switcher label={content.switchLabel} tabs={items.map((item) => item.brand)}>
        {items.map((study) => (
          <CaseStudy key={study.id} study={study} deliveredLabel={deliveredLabel}
            similarCta={<ButtonLink href={href(locale, 'contact')} variant={study.url ? 'outline-dark' : 'primary'} arrow={!study.url}>{similar}</ButtonLink>} />
        ))}
      </Switcher>
    </>
  );
}
