import PartnerLogo from './PartnerLogo.tsx';
import type { PartnerItem } from '../types/cms.ts';

interface HomePartnersMarqueeProps {
  partners: PartnerItem[];
}

export default function HomePartnersMarquee({ partners }: HomePartnersMarqueeProps) {
  if (partners.length === 0) {
    return null;
  }

  const track = [...partners, ...partners];

  return (
    <div className="premium-partners-marquee-container reveal-fade-up">
      <div className="premium-partners-marquee-track">
        {track.map((partner, index) => (
          <div key={`${partner.slug}-${index}`} className="premium-partner-card">
            <PartnerLogo logoKey={partner.logoKey} />
            <p>{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
