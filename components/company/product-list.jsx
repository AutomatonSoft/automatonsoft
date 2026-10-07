import { ArrowUpRight } from 'lucide-react';
import { Icon } from '@/components/sections/icons';
import { categoryIcons } from '@/lib/portfolio';

export default function ProductList({ products, portfolioHref }) {
  return (
    <ul className="product-list">
      {products.items.map((product) => (
        <li key={product.name}>
          <a href={`${portfolioHref}#${product.category}`} aria-label={`${product.name} – ${products.link}`}>
            <Icon name={categoryIcons[product.category]} />
            <span><b>{product.name}</b><small>{product.tag}</small></span>
            <ArrowUpRight className="product-arrow" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
