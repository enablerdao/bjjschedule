import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for academies
const MOCK_ACADEMIES = [
  {
    id: 1,
    name: 'Alliance Jiu-Jitsu',
    location: 'São Paulo, Brazil',
    image: '/images/placeholder-academy-1.jpg',
    classes: 42,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Gracie Barra',
    location: 'Rio de Janeiro, Brazil',
    image: '/images/placeholder-academy-2.jpg',
    classes: 38,
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 3,
    name: 'ATOS Jiu-Jitsu',
    location: 'San Diego, USA',
    image: '/images/placeholder-academy-3.jpg',
    classes: 35,
    rating: 4.9,
    reviews: 87,
  },
  {
    id: 4,
    name: 'Carpe Diem',
    location: 'Tokyo, Japan',
    image: '/images/placeholder-academy-4.jpg',
    classes: 28,
    rating: 4.6,
    reviews: 65,
  },
  {
    id: 5,
    name: 'Checkmat',
    location: 'Los Angeles, USA',
    image: '/images/placeholder-academy-5.jpg',
    classes: 32,
    rating: 4.7,
    reviews: 76,
  },
  {
    id: 6,
    name: 'Art of Jiu Jitsu',
    location: 'Costa Mesa, USA',
    image: '/images/placeholder-academy-6.jpg',
    classes: 30,
    rating: 4.8,
    reviews: 82,
  },
  {
    id: 7,
    name: 'Ribeiro Jiu-Jitsu',
    location: 'San Diego, USA',
    image: '/images/placeholder-academy-7.jpg',
    classes: 25,
    rating: 4.5,
    reviews: 58,
  },
  {
    id: 8,
    name: 'Renzo Gracie Academy',
    location: 'New York, USA',
    image: '/images/placeholder-academy-8.jpg',
    classes: 45,
    rating: 4.8,
    reviews: 132,
  }
];

export default function Academies() {
  const { t } = useTranslation(['common', 'academies']);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter academies based on search term
  const filteredAcademies = MOCK_ACADEMIES.filter(academy => 
    academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    academy.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Head>
        <title>{t('academies:title')} - {t('app.name')}</title>
        <meta name="description" content={t('academies:description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">{t('academies:title')}</h1>
              
              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue pl-10"
                    placeholder={t('academies:searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <Link href="/academies/register" className="btn-primary">
                  {t('academies:registerButton')}
                </Link>
              </div>
            </div>
            
            {/* Academies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAcademies.map((academy) => (
                <Link 
                  key={academy.id} 
                  href={`/academies/${academy.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <div className="absolute inset-0 bg-bjj-blue/20 flex items-center justify-center">
                      <span className="text-white font-bold">{t('academies:imagePlaceholder')}</span>
                    </div>
                    {/* Uncomment when you have actual images */}
                    {/* <Image 
                      src={academy.image} 
                      alt={academy.name} 
                      fill 
                      className="object-cover" 
                    /> */}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{academy.name}</h3>
                    <p className="text-gray-600 mb-2">{academy.location}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-700">{academy.rating}</span>
                        <span className="ml-1 text-gray-500">({academy.reviews})</span>
                      </div>
                      
                      <span className="text-sm text-bjj-blue">
                        {t('academies:classesCount', { count: academy.classes })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {filteredAcademies.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center mt-8">
                <p className="text-gray-600">{t('academies:noResults')}</p>
              </div>
            )}
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'academies'])),
    },
  };
};