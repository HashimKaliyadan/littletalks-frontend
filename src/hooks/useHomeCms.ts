import { useEffect, useState } from 'react';
import { getPartners, getProducts, getReviews, getServices } from '../api/client.ts';
import type { PartnerItem, ProductItem, ReviewItem, ServiceItem } from '../types/cms.ts';

export function useHomeCms() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getServices(), getProducts(), getPartners(), getReviews()])
      .then(([s, p, pt, r]) => {
        if (!cancelled) {
          setServices(s);
          setProducts(p);
          setPartners(pt);
          setReviews(r);
        }
      })
      .catch(() => {
        /* keep empty — home shows static fallbacks where needed */
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => { cancelled = true; };
  }, []);

  return { services, products, partners, reviews, loaded };
}
