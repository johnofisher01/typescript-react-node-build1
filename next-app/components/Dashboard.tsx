'use client';

import React, { useState, useEffect } from 'react';
import Highlights from './Highlights';
import FilterSortBar from './FilterSortBar';
import ArticleList from './ArticleList';
import Pagination from './Pagination';
import SummaryModal from './SummaryModal';
import {
  fetchArticles,
  fetchHighlights,
  fetchSummary,
  Article,
  PaginatedResponse,
} from '../services/api';

const ITEMS_PER_PAGE = 9;

type HighlightsType = {
  mostViewed: Article | null;
  mostShared: Article | null;
};

type FiltersType = {
  author: string;
  sort: string;
  sortDirection: 'asc' | 'desc' | '';
};

const Dashboard: React.FC = () => {
  const [articles, setArticles]       = useState<Article[]>([]);
  const [totalRows, setTotalRows]     = useState<number>(0);
  const [highlights, setHighlights]   = useState<HighlightsType>({ mostViewed: null, mostShared: null });
  const [filters, setFilters]         = useState<FiltersType>({ author: '', sort: '', sortDirection: 'desc' });
  const [page, setPage]               = useState<number>(1);
  const [summary, setSummary]         = useState<string | null>(null);
  const [modalOpen, setModalOpen]     = useState<boolean>(false);
  const [loading, setLoading]         = useState<boolean>(false);
  const [error, setError]             = useState<string>();

  // Fetch Articles (paginated envelope)
  useEffect(() => {
    setLoading(true);
    setError(undefined);

    fetchArticles({
      page,
      limit: ITEMS_PER_PAGE,
      author:       filters.author,
      sort:         filters.sort,
      sortDirection: filters.sortDirection,
    })
      .then((res: PaginatedResponse<Article>) => {
        setArticles(res.data);
        setTotalRows(res.total);
      })
      .catch((err) => {
        console.error('fetchArticles error:', err);
        setArticles([]);
        setTotalRows(0);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, filters]);

  // Fetch Highlights
  useEffect(() => {
    fetchHighlights()
      .then((res) =>
        setHighlights({
          mostViewed: res.mostViewed || null,
          mostShared: res.mostShared || null,
        })
      )
      .catch(() => {
        setHighlights({ mostViewed: null, mostShared: null });
      });
  }, [filters.author]);

  const handleSummarize = async (id: number) => {
    try {
      const data = await fetchSummary(id);
      setSummary(data);
      setModalOpen(true);
    } catch (err) {
      console.error('fetchSummary error:', err);
    }
  };

  const handleSetFilters = (newFilters: FiltersType) => {
    setPage(1);
    setFilters(newFilters);
  };

  return (
    <div className="bg-gradient-to-br from-brandLightTeal to-brandTeal text-white min-h-screen flex flex-col items-center">
      {/* Hero Section omitted for brevity */}

      <main className="container mx-auto px-4 py-6">
        <Highlights mostViewed={highlights.mostViewed} mostShared={highlights.mostShared} />

        <FilterSortBar filters={filters} setFilters={handleSetFilters} />

        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <p>Loading articles…</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <ArticleList articles={articles} onSummarize={handleSummarize} />
          )}
        </div>

        {totalRows > ITEMS_PER_PAGE && (
          <Pagination
            total={totalRows}
            page={page}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={(p) => setPage(p)}
          />
        )}

        <SummaryModal open={modalOpen} onClose={() => setModalOpen(false)} summary={summary} />
      </main>
    </div>
  );
};

export default Dashboard;