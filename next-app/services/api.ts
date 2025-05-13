const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL; 

export async function fetchArticles(page = 1, pageSize = 10) {
  const res = await fetch(`${API_BASE}/articles?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function fetchHighlights() {
  const res = await fetch(`${API_BASE}/highlights`);
  if (!res.ok) throw new Error('Failed to fetch highlights');
  return res.json();
}

export async function fetchSummary(articleId: string) {
  const res = await fetch(`${API_BASE}/articles/${articleId}/summary`);
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}
