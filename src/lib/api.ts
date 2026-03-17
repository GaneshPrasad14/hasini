// Central API base URL — reads from .env.local in dev, empty in production (Nginx proxies /api/)
export const API_BASE = (import.meta.env.VITE_API_URL as string) || '';

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export function imgUrl(src: string): string {
  if (!src) return '';
  if (src.startsWith('http')) return src;
  return `${API_BASE}${src}`;
}
