import { Plus } from 'lucide-react';
import JsonLd from '@/components/layout/json-ld';

// Native <details> keeps the accordion accessible without JS; FAQPage data makes answers eligible for rich results.
export default function FaqList({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
  return (
    <div className="faq-list">
      {items.map(({ q, a }) => (
        <details key={q} className="faq-entry">
          <summary>{q}<Plus aria-hidden="true" /></summary>
          <p>{a}</p>
        </details>
      ))}
      <JsonLd data={schema} />
    </div>
  );
}
