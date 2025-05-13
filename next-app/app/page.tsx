'use client';

import { useEffect, useState } from 'react';

type Article = {
  id: number;
  title: string;
  author: string;
};

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data?.data || []);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const summarize = async (id: number) => {
    const res = await fetch(`/api/articles/${id}/summarize`, {
      method: 'POST',
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Articles</h1>

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} style={{ marginBottom: '1rem' }}>
              <strong>{article.title}</strong> by {article.author}
              <br />
              <button onClick={() => summarize(article.id)}>Summarize</button>
            </li>
          ))}
        </ul>
      )}

      {summary && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
