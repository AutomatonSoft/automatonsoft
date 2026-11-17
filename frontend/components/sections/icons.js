import { Bug, Car, ChartColumn, CodeXml, Database, Factory, Handshake, Hotel, KeyRound, Landmark, MapPin, Monitor, Package, PenTool, ServerCog, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Target, UserPlus, Users, UsersRound, Workflow } from 'lucide-react';

// Dictionaries reference icons by name so content stays serialisable and free of component imports.
export const icons = { Bug, Car, ChartColumn, CodeXml, Database, Factory, Handshake, Hotel, KeyRound, Landmark, MapPin, Monitor, Package, PenTool, ServerCog, ShieldCheck, ShoppingCart, Smartphone, Sparkles, Target, UserPlus, Users, UsersRound, Workflow };

export function Icon({ name, ...props }) {
  const Component = icons[name];
  return Component ? <Component aria-hidden="true" strokeWidth={1.75} {...props} /> : null;
}
