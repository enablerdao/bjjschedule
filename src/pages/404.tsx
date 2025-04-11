import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Custom404() {
  const { t } = useTranslation('common');
  
  return (
    <>
      <Head>
        <title>{t('notFound.title')} - {t('app.name')}</title>
        <meta name="description" content={t('notFound.description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 flex items-center justify-center py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-lg mx-auto">
              <h1 className="text-6xl font-bold text-bjj-blue mb-4">404</h1>
              <h2 className="text-2xl font-bold mb-4">{t('notFound.title')}</h2>
              <p className="text-gray-600 mb-8">{t('notFound.message')}</p>
              
              <div className="space-y-4">
                <Link href="/" className="btn-primary block">
                  {t('notFound.homeButton')}
                </Link>
                <Link href="/search" className="btn-outline block">
                  {t('notFound.searchButton')}
                </Link>
              </div>
            </div>
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
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};