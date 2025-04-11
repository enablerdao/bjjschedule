import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function About() {
  const { t } = useTranslation(['common', 'about']);
  
  return (
    <>
      <Head>
        <title>{t('about:title')} - {t('app.name')}</title>
        <meta name="description" content={t('about:description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-6">{t('about:title')}</h1>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">{t('about:mission.title')}</h2>
                <p className="text-gray-700 mb-4">{t('about:mission.description')}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {(t('about:mission.values', { returnObjects: true }) as any[]).map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-bjj-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {index === 0 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          )}
                          {index === 1 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          )}
                          {index === 2 && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          )}
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">{t('about:story.title')}</h2>
                <p className="text-gray-700 mb-4">{t('about:story.description')}</p>
                
                <div className="mt-8 space-y-8">
                  {(t('about:story.timeline', { returnObjects: true }) as any[]).map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex flex-col items-center mr-4">
                        <div className="bg-bjj-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        {index < (t('about:story.timeline', { returnObjects: true }) as any[]).length - 1 && (
                          <div className="h-full w-0.5 bg-bjj-blue/30 my-2"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{t('about:team.title')}</h2>
                <p className="text-gray-700 mb-6">{t('about:team.description')}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(t('about:team.members', { returnObjects: true }) as any[]).map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-bjj-blue/20 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white">{t('about:team.photoPlaceholder')}</span>
                      </div>
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-bjj-blue">{member.role}</p>
                      <p className="text-gray-600 mt-2">{member.bio}</p>
                    </div>
                  ))}
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'about'])),
    },
  };
};