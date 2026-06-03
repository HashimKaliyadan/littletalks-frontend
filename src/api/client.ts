import { API_BASE } from './config.ts';
import {
  mapPartners,
  mapProducts,
  mapReviews,
  mapServices,
  mapTeam,
  type ApiRow,
  type ContactLeadPayload,
  type PartnerItem,
  type ProductItem,
  type ReviewItem,
  type ServiceItem,
  type TeamMember,
} from '../types/cms.ts';

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`);
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.ok || json.data === undefined) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return json.data;
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.ok) {
    throw new Error(json.error ?? `Request failed (${res.status})`);
  }
  return json.data as T;
}

export async function getServices(): Promise<ServiceItem[]> {
  const data = await apiGet<ApiRow[]>('services.php');
  return mapServices(data);
}

export async function getProducts(): Promise<ProductItem[]> {
  const data = await apiGet<ApiRow[]>('products.php');
  return mapProducts(data);
}

export async function getPartners(): Promise<PartnerItem[]> {
  const data = await apiGet<ApiRow[]>('partners.php');
  return mapPartners(data);
}

export async function getTeam(): Promise<TeamMember[]> {
  const data = await apiGet<ApiRow[]>('team.php');
  return mapTeam(data);
}

export async function getReviews(): Promise<ReviewItem[]> {
  const data = await apiGet<ApiRow[]>('reviews.php');
  return mapReviews(data);
}

export async function submitContactLead(payload: ContactLeadPayload): Promise<{ id: number; message: string }> {
  return apiPost('contact.php', payload);
}
