import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HonoluluSearchFilters from '@/components/search/HonoluluSearchFilters';
import HonoluluSearchResults from '@/components/search/HonoluluSearchResults';
import HonoluluMapView from '@/components/search/HonoluluMapView';

type Academy = {
  name: string;
  website: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  logo_url: string;
  social_media: Record<string, string>;
  location: {
    latitude: number;
    longitude: number;
  };
  classes: Class[];
};

type Class = {
  academy: string;
  name: string;
  description: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
  class_type: string;
  instructor: string;
};

type HonoluluData = {
  academies: Academy[];
};

export default function HonoluluPage() {
  const { t } = useTranslation(['common', 'search']);
  const [data, setData] = useState<HonoluluData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    academy_name: '',
    class_type: '',
    day_of_week: '',
  });
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // フィルターパラメータを構築
        const params = new URLSearchParams();
        if (filters.academy_name) params.append('academy_name', filters.academy_name);
        if (filters.class_type) params.append('class_type', filters.class_type);
        if (filters.day_of_week) params.append('day_of_week', filters.day_of_week);
        
        // APIからデータを取得
        const response = await fetch(`/api/honolulu?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
  };

  return (
    <>
      <Head>
        <title>{`${t('search:honolulu_title')} | ${t('common:site_name')}`}</title>
        <meta name="description" content={t('search:honolulu_description')} />
      </Head>
      
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-bjj-black mb-6">
          {t('search:honolulu_title')}
        </h1>
        
        <div className="mb-8">
          <HonoluluSearchFilters 
            onFilterChange={handleFilterChange} 
            onViewModeChange={handleViewModeChange}
            currentViewMode={viewMode}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bjj-blue"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              <HonoluluSearchResults 
                academies={data?.academies || []} 
              />
            ) : (
              <HonoluluMapView 
                academies={data?.academies || []} 
              />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'search'])),
    },
  };
};