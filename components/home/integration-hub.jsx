import { siteConfig } from '@/lib/site-config';
import { Icon } from '@/components/sections/icons';

// Six systems on a hexagon (the brand shape) around the client's platform; positions in % of the square stage.
const RADIUS = 38;
const positions = Array.from({ length: 6 }, (_, index) => {
  const angle = ((index * 60 - 90) * Math.PI) / 180;
  return { x: +(50 + RADIUS * Math.cos(angle)).toFixed(2), y: +(50 + RADIUS * Math.sin(angle)).toFixed(2) };
});
const hexagon = positions.map(({ x, y }) => `${x},${y}`).join(' ');

export default function IntegrationHub({ hub }) {
  return (
    <figure className="hub" role="img" aria-label={hub.label}>
      <div className="hub-stage">
        <svg className="hub-lines" viewBox="0 0 100 100" aria-hidden="true">
          <polygon className="hub-hexagon" points={hexagon} />
          {positions.map(({ x, y }, index) => (
            <g key={index}>
              <line className="hub-line" x1="50" y1="50" x2={x} y2={y} />
              <line className="hub-flow" x1="50" y1="50" x2={x} y2={y} style={{ animationDelay: `${index * -0.45}s` }} />
            </g>
          ))}
        </svg>
        <div className="hub-center">
          <img src={siteConfig.icon} alt="" />
          <span>{hub.center}</span>
        </div>
        {hub.nodes.map((node, index) => (
          <div key={node.label} className="hub-node" style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}>
            <Icon name={node.icon} />
            <span>{node.label}</span>
          </div>
        ))}
      </div>
      <figcaption className="hub-caption">{hub.caption}</figcaption>
    </figure>
  );
}
