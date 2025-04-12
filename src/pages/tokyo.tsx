import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HonoluluSearchFilters from '@/components/search/HonoluluSearchFilters';
import TokyoSearchResults from '@/components/search/TokyoSearchResults';
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
        const response = await fetch(`/api/tokyo?${params.toString()}`);
        
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
        <title>{`${t('search:tokyo_title')} | ${t('common:site_name')}`}</title>
        <meta name="description" content={t('search:tokyo_description')} />
      </Head>
      
      <Header />
      
      <div className="bg-gradient-to-b from-bjj-blue-dark to-bjj-blue py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            {t('search:tokyo_title')}
          </h1>
          <p className="text-white text-center text-lg mb-8 max-w-2xl mx-auto">
            {t('search:tokyo_description')}
          </p>
          
          <div className="max-w-5xl mx-auto">
            <HonoluluSearchFilters 
              onFilterChange={handleFilterChange} 
              onViewModeChange={handleViewModeChange}
              currentViewMode={viewMode}
            />
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-bjj-blue mb-4"></div>
            <p className="text-gray-600">{t('common:loading')}</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {viewMode === 'list' ? (
              <TokyoSearchResults 
                academies={data?.academies || []} 
              />
            ) : (
              <HonoluluMapView 
                academies={data?.academies || []} 
              />
            )}
          </div>
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