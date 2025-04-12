import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

// 地域データ
const REGIONS = [
  {
    id: 'honolulu',
    name: 'Honolulu',
    country: 'USA',
    image: '/images/regions/honolulu.jpg',
    academyCount: 25,
    classCount: 264
  },
  {
    id: 'tokyo',
    name: '東京',
    country: '日本',
    image: '/images/regions/tokyo.jpg',
    academyCount: 26,
    classCount: 382
  }
];

export default function Search() {
  const { t } = useTranslation(['common', 'search']);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>{`${t('search:title')} | ${t('common:site_name')}`}</title>
        <meta name="description" content={t('search:description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">{t('search:title')}</h1>
            
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{t('search:selectRegion')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REGIONS.map((region) => (
                  <Link 
                    href={`/${region.id}`} 
                    key={region.id}
                    className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      {region.image ? (
                        <img 
                          src={region.image} 
                          alt={region.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-bjj-blue-light">
                          <span className="text-white text-xl font-bold">{region.name}</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white text-xl font-bold">{region.name}</h3>
                        <p className="text-white/90">{region.country}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{t('search:academies')}: {region.academyCount}</span>
                        <span>{t('search:classes')}: {region.classCount}</span>
                      </div>
                      <button className="w-full py-2 bg-bjj-blue text-white rounded-md hover:bg-bjj-blue-dark transition-colors">
                        {t('search:viewSchedules')}
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">{t('search:aboutThisService')}</h2>
              <p className="text-gray-600 mb-4">
                {t('search:serviceDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-bjj-blue-light/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-bjj-blue mb-2">{t('search:feature1Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('search:feature1Description')}</p>
                </div>
                <div className="bg-bjj-blue-light/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-bjj-blue mb-2">{t('search:feature2Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('search:feature2Description')}</p>
                </div>
                <div className="bg-bjj-blue-light/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-bjj-blue mb-2">{t('search:feature3Title')}</h3>
                  <p className="text-gray-600 text-sm">{t('search:feature3Description')}</p>
                </div>
              </div>
            </div>
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