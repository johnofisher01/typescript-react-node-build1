export interface Article {
    id: number;
    title: string;
    summary: string | null;
    content: string;
    author: string;
    views: number;
    shares: number;
  }
  
  export interface PaginatedResponse<T> {
    success:     boolean;
    source:      string;
    total:       number;
    currentPage: number;
    totalPages:  number;
    hasNextPage: boolean;
    data:        T[];
  }
  
  const BASE = ''; // relative to /api
  
  export async function fetchArticles(opts: {
    page: number;
    limit: number;
    author?: string;
    sort?: string;
    sortDirection?: string;
  }): Promise<PaginatedResponse<Article>> {
    const { page, limit, author, sort, sortDirection } = opts;
    const params = new URLSearchParams({
      page:        String(page),
      pageSize:    String(limit),
      ...(author       ? { author }       : {}),
      ...(sort         ? { sort }         : {}),
      ...(sortDirection? { sortDirection }: {}),
    });
  
    const res = await fetch(`${BASE}/api/articles?${params}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`);
    }
    return res.json();
  }
  
  export async function fetchHighlights() {
    const res = await fetch(`${BASE}/api/articles/highlights`);
    if (!res.ok) {
      throw new Error(`Failed to fetch highlights: ${res.status}`);
    }
    return res.json();
  }
  
  export async function fetchSummary(articleId: number) {
    const res = await fetch(`${BASE}/api/articles/${articleId}/summary`);
    if (!res.ok) {
      throw new Error(`Failed to fetch summary: ${res.status}`);
    }
    return res.json();
  }