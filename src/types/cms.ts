export interface ServiceItem {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  details: string[];
  selectKey: string;
}

export interface ProductItem {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  details: string[];
}

export interface PartnerItem {
  id: number;
  slug: string;
  name: string;
  type: string;
  description: string;
  details: string[];
  logoKey: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ReviewItem {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  rating: number;
  avatarInitials: string;
}

export interface ContactLeadPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_key: string;
  message: string;
  website?: string;
}

export interface ApiRow {
  id: number;
  slug?: string;
  title?: string;
  tagline?: string;
  image_path?: string;
  description?: string;
  details?: string[];
  select_key?: string;
  name?: string;
  type?: string;
  logo_key?: string;
  role?: string;
  bio?: string;
  quote?: string;
  author_name?: string;
  author_role?: string;
  rating?: number;
  avatar_initials?: string;
}

function mapService(row: ApiRow): ServiceItem {
  return {
    id: row.id,
    slug: row.slug ?? '',
    title: row.title ?? '',
    tagline: row.tagline ?? '',
    image: row.image_path ?? '',
    description: row.description ?? '',
    details: row.details ?? [],
    selectKey: row.select_key ?? '',
  };
}

function mapProduct(row: ApiRow): ProductItem {
  return {
    id: row.id,
    slug: row.slug ?? '',
    title: row.title ?? '',
    tagline: row.tagline ?? '',
    image: row.image_path ?? '',
    description: row.description ?? '',
    details: row.details ?? [],
  };
}

function mapPartner(row: ApiRow): PartnerItem {
  return {
    id: row.id,
    slug: row.slug ?? '',
    name: row.name ?? '',
    type: row.type ?? '',
    description: row.description ?? '',
    details: row.details ?? [],
    logoKey: row.logo_key ?? 'generic',
  };
}

function mapTeamMember(row: ApiRow): TeamMember {
  return {
    id: row.id,
    name: row.name ?? '',
    role: row.role ?? '',
    image: row.image_path ?? '',
    bio: row.bio ?? '',
  };
}

function mapReview(row: ApiRow): ReviewItem {
  return {
    id: row.id,
    quote: row.quote ?? '',
    authorName: row.author_name ?? '',
    authorRole: row.author_role ?? '',
    rating: row.rating ?? 5,
    avatarInitials: row.avatar_initials ?? '',
  };
}

export function mapServices(rows: ApiRow[]): ServiceItem[] {
  return rows.map(mapService);
}

export function mapProducts(rows: ApiRow[]): ProductItem[] {
  return rows.map(mapProduct);
}

export function mapPartners(rows: ApiRow[]): PartnerItem[] {
  return rows.map(mapPartner);
}

export function mapTeam(rows: ApiRow[]): TeamMember[] {
  return rows.map(mapTeamMember);
}

export function mapReviews(rows: ApiRow[]): ReviewItem[] {
  return rows.map(mapReview);
}
