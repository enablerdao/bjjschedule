import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for search results
const MOCK_CLASSES = [
  {
    id: 1,
    title: 'Fundamentals Class',
    academy: 'Alliance Jiu-Jitsu',
    location: 'São Paulo, Brazil',
    instructor: 'Fabio Gurgel',
    date: '2025-04-12',
    startTime: '18:00',
    endTime: '19:30',
    type: 'fundamentals',
  },
  {
    id: 2,
    title: 'Advanced Class',
    academy: 'Gracie Barra',
    location: 'Rio de Janeiro, Brazil',
    instructor: 'Roger Gracie',
    date: '2025-04-12',
    startTime: '19:00',
    endTime: '20:30',
    type: 'advanced',
  },
  {
    id: 3,
    title: 'No-Gi Training',
    academy: 'ATOS Jiu-Jitsu',
    location: 'San Diego, USA',
    instructor: 'Andre Galvao',
    date: '2025-04-12',
    startTime: '20:00',
    endTime: '21:30',
    type: 'nogi',
  },
  {
    id: 4,
    title: 'Kids Class',
    academy: 'Carpe Diem',
    location: 'Tokyo, Japan',
    instructor: 'Yuki Nakai',
    date: '2025-04-12',
    startTime: '16:00',
    endTime: '17:00',
    type: 'kids',
  },
  {
    id: 5,
    title: 'Competition Training',
    academy: 'Checkmat',
    location: 'Los Angeles, USA',
    instructor: 'Lucas Leite',
    date: '2025-04-12',
    startTime: '18:30',
    endTime: '20:00',
    type: 'competition',
  },
];

export default function Search() {
  const { t } = useTranslation(['common', 'search']);
  const router = useRouter();
  const { location, date, type } = router.query;
  
  const [searchResults, setSearchResults] = useState(MOCK_CLASSES);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'map', or 'calendar'
  
  // Filter classes based on search params
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      let filteredClasses = [...MOCK_CLASSES];
      
      if (location) {
        const locationStr = String(location).toLowerCase();
        filteredClasses = filteredClasses.filter(
          cls => cls.location.toLowerCase().includes(locationStr) || 
                 cls.academy.toLowerCase().includes(locationStr)
        );
      }
      
      if (date) {
        filteredClasses = filteredClasses.filter(cls => cls.date === date);
      }
      
      if (type) {
        filteredClasses = filteredClasses.filter(cls => cls.type === type);
      }
      
      setSearchResults(filteredClasses);
      setLoading(false);
    }, 500);
  }, [location, date, type]);
  
  return (
    <>
      <Head>
        <title>{`${t('search:title')} - ${t('app.name')}`}</title>
        <meta name="description" content={t('search:description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">{t('search:title')}</h1>
            
            {/* Search Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('search:filters.location')}
                  </label>
                  <input
                    type="text"
                    id="location-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                    placeholder={t('search:filters.locationPlaceholder')}
                    defaultValue={location || ''}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(router.query as Record<string, string>);
                      if (e.target.value) {
                        newParams.set('location', e.target.value);
                      } else {
                        newParams.delete('location');
                      }
                      router.push(`/search?${newParams.toString()}`);
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('search:filters.date')}
                  </label>
                  <input
                    type="date"
                    id="date-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                    defaultValue={date || ''}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(router.query as Record<string, string>);
                      if (e.target.value) {
                        newParams.set('date', e.target.value);
                      } else {
                        newParams.delete('date');
                      }
                      router.push(`/search?${newParams.toString()}`);
                    }}
                  />
                </div>
                
                <div>
                  <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('search:filters.classType')}
                  </label>
                  <select
                    id="type-filter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                    defaultValue={type || ''}
                    onChange={(e) => {
                      const newParams = new URLSearchParams(router.query as Record<string, string>);
                      if (e.target.value) {
                        newParams.set('type', e.target.value);
                      } else {
                        newParams.delete('type');
                      }
                      router.push(`/search?${newParams.toString()}`);
                    }}
                  >
                    <option value="">{t('search:filters.allTypes')}</option>
                    <option value="fundamentals">{t('search:classTypes.fundamentals')}</option>
                    <option value="advanced">{t('search:classTypes.advanced')}</option>
                    <option value="nogi">{t('search:classTypes.nogi')}</option>
                    <option value="kids">{t('search:classTypes.kids')}</option>
                    <option value="competition">{t('search:classTypes.competition')}</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <button
                    className="w-full btn-primary"
                    onClick={() => {
                      // Refresh search with current params
                      router.push(router.asPath);
                    }}
                  >
                    {t('search:filters.applyButton')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* View Mode Selector */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {searchResults.length === 0 
                  ? t('search:noResults') 
                  : t('search:resultsCount', { count: searchResults.length })}
              </p>
              
              <div className="flex space-x-2 bg-white rounded-md shadow-sm p-1">
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-bjj-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setViewMode('list')}
                >
                  {t('search:viewModes.list')}
                </button>
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'map' ? 'bg-bjj-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setViewMode('map')}
                >
                  {t('search:viewModes.map')}
                </button>
                <button
                  className={`px-3 py-1 rounded ${viewMode === 'calendar' ? 'bg-bjj-blue text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  onClick={() => setViewMode('calendar')}
                >
                  {t('search:viewModes.calendar')}
                </button>
              </div>
            </div>
            
            {/* Search Results */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-bjj-blue border-t-transparent"></div>
                <p className="mt-2 text-gray-600">{t('search:loading')}</p>
              </div>
            ) : (
              <>
                {viewMode === 'list' && (
                  <div className="space-y-4">
                    {searchResults.length === 0 ? (
                      <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-600">{t('search:noResultsMessage')}</p>
                      </div>
                    ) : (
                      searchResults.map((cls) => (
                        <div key={cls.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div>
                              <h3 className="font-bold text-lg">{cls.title}</h3>
                              <p className="text-bjj-blue font-medium">{cls.academy}</p>
                              <p className="text-gray-600">{cls.location}</p>
                              <p className="text-gray-600">
                                {t('search:instructor')}: {cls.instructor}
                              </p>
                            </div>
                            <div className="mt-4 md:mt-0 md:text-right">
                              <p className="text-gray-600">{cls.date}</p>
                              <p className="font-mono text-bjj-black">
                                {cls.startTime} - {cls.endTime}
                              </p>
                              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                                {t(`search:classTypes.${cls.type}`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                
                {viewMode === 'map' && (
                  <div className="bg-white rounded-lg shadow-md p-4 h-[500px] flex items-center justify-center">
                    <p className="text-gray-600">{t('search:mapViewPlaceholder')}</p>
                  </div>
                )}
                
                {viewMode === 'calendar' && (
                  <div className="bg-white rounded-lg shadow-md p-4 h-[500px] flex items-center justify-center">
                    <p className="text-gray-600">{t('search:calendarViewPlaceholder')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'search'])),
    },
  };
};