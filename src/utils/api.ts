export const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api';

export async function fetchJson(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
