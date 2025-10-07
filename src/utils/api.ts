// Arquivo: src/utils/api.ts

// Usaremos o endereço de loopback do emulador Android (10.0.2.2) para acessar o localhost do PC.
// A porta é 5000, que é onde seu backend Express está rodando.
export const BASE_API_URL = 'http://10.0.2.2:5000/api';

// Exportamos a função fetchJson para ser usada nos componentes
export async function fetchJson(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE_API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}