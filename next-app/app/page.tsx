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
      .then((res) => res.json())
      .then((data) => {
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
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Articles</h1>

      {loading ? (
        <p className="text-gray-600">Loading articles...</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li
              key={article.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <p className="text-lg font-semibold">{article.title}</p>
              <p className="text-sm text-gray-600 mb-2">by {article.author}</p>
              <button
                onClick={() => summarize(article.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Summarize
              </button>
            </li>
          ))}
        </ul>
      )}

      {summary && (
        <div className="mt-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded">
          <h2 className="text-2xl font-bold mb-2 text-blue-800">Summary</h2>
          <p className="text-gray-800">{summary}</p>
        </div>
      )}
    </div>
  );
}
