import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Mock data for academy details
const MOCK_ACADEMIES = [
  {
    id: 1,
    name: 'Alliance Jiu-Jitsu',
    location: 'São Paulo, Brazil',
    image: '/images/placeholder-academy-1.jpg',
    description: 'Alliance Jiu-Jitsu is one of the most successful Brazilian Jiu-Jitsu teams in the history of the sport. Founded in 1993 by Romero "Jacaré" Cavalcanti, Alexandre Paiva, and Fabio Gurgel, Alliance has produced numerous world champions and has affiliate academies worldwide.',
    classes: 42,
    rating: 4.8,
    reviews: 124,
    instructors: [
      { name: 'Fabio Gurgel', rank: 'Black Belt 6th Degree', image: '/images/placeholder-instructor-1.jpg' },
      { name: 'Michael Langhi', rank: 'Black Belt 4th Degree', image: '/images/placeholder-instructor-2.jpg' },
      { name: 'Cobrinha', rank: 'Black Belt 4th Degree', image: '/images/placeholder-instructor-3.jpg' }
    ],
    schedule: [
      { day: 'Monday', classes: [
        { time: '06:00 - 07:30', title: 'Fundamentals', instructor: 'Fabio Gurgel' },
        { time: '12:00 - 13:30', title: 'Advanced', instructor: 'Michael Langhi' },
        { time: '18:00 - 19:30', title: 'No-Gi', instructor: 'Cobrinha' }
      ]},
      { day: 'Tuesday', classes: [
        { time: '06:00 - 07:30', title: 'Advanced', instructor: 'Michael Langhi' },
        { time: '12:00 - 13:30', title: 'Fundamentals', instructor: 'Fabio Gurgel' },
        { time: '18:00 - 19:30', title: 'Competition Training', instructor: 'Cobrinha' }
      ]},
      { day: 'Wednesday', classes: [
        { time: '06:00 - 07:30', title: 'No-Gi', instructor: 'Cobrinha' },
        { time: '12:00 - 13:30', title: 'Advanced', instructor: 'Michael Langhi' },
        { time: '18:00 - 19:30', title: 'Fundamentals', instructor: 'Fabio Gurgel' }
      ]}
    ],
    contact: {
      website: 'https://www.alliancebjj.com',
      email: 'info@alliancebjj.com',
      phone: '+55 11 1234-5678',
      address: 'Rua Augusta, 1234, São Paulo, Brazil'
    }
  }
];

export default function AcademyDetail({ academy }: { academy: typeof MOCK_ACADEMIES[0] }) {
  const { t } = useTranslation(['common', 'academies']);
  const [activeTab, setActiveTab] = useState('about');
  
  if (!academy) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">{t('academies:notFound')}</p>
              <Link href="/academies" className="btn-primary mt-4">
                {t('academies:backToAcademies')}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>{academy.name} - {t('app.name')}</title>
        <meta name="description" content={academy.description.substring(0, 160)} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            {/* Academy Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative h-64 bg-bjj-blue/20 flex items-center justify-center">
                <span className="text-white font-bold">{t('academies:imagePlaceholder')}</span>
                {/* Uncomment when you have actual images */}
                {/* <Image 
                  src={academy.image} 
                  alt={academy.name} 
                  fill 
                  className="object-cover" 
                /> */}
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{academy.name}</h1>
                    <p className="text-gray-600 mb-4">{academy.location}</p>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
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
                  
                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <a href={`tel:${academy.contact.phone}`} className="btn-outline">
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {t('academies:contactButton')}
                    </a>
                    <a href={academy.contact.website} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <svg className="w-5 h-5 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      {t('academies:websiteButton')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'about' 
                        ? 'border-bjj-blue text-bjj-blue' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('about')}
                  >
                    {t('academies:details.about')}
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'schedule' 
                        ? 'border-bjj-blue text-bjj-blue' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    {t('academies:details.schedule')}
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'instructors' 
                        ? 'border-bjj-blue text-bjj-blue' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('instructors')}
                  >
                    {t('academies:details.instructors')}
                  </button>
                  <button
                    className={`py-4 px-6 font-medium text-sm border-b-2 ${
                      activeTab === 'contact' 
                        ? 'border-bjj-blue text-bjj-blue' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('contact')}
                  >
                    {t('academies:details.contact')}
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {/* About Tab */}
                {activeTab === 'about' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">{t('academies:details.about')}</h2>
                    <p className="text-gray-700 mb-6">{academy.description}</p>
                    
                    {/* Map placeholder */}
                    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                      <p className="text-gray-600">{t('academies:mapPlaceholder')}</p>
                    </div>
                  </div>
                )}
                
                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">{t('academies:details.schedule')}</h2>
                    
                    <div className="space-y-6">
                      {academy.schedule.map((day, index) => (
                        <div key={index}>
                          <h3 className="font-bold text-lg mb-3">{day.day}</h3>
                          <div className="space-y-3">
                            {day.classes.map((cls, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-md">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                  <div>
                                    <h4 className="font-bold">{cls.title}</h4>
                                    <p className="text-gray-600">{t('academies:instructor')}: {cls.instructor}</p>
                                  </div>
                                  <div className="mt-2 md:mt-0">
                                    <span className="font-mono text-bjj-blue">{cls.time}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Instructors Tab */}
                {activeTab === 'instructors' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">{t('academies:details.instructors')}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {academy.instructors.map((instructor, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-md flex items-center">
                          <div className="w-16 h-16 bg-bjj-blue/20 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white text-xs">Photo</span>
                            {/* Uncomment when you have actual images */}
                            {/* <Image 
                              src={instructor.image} 
                              alt={instructor.name} 
                              width={64}
                              height={64}
                              className="rounded-full object-cover" 
                            /> */}
                          </div>
                          <div>
                            <h3 className="font-bold">{instructor.name}</h3>
                            <p className="text-gray-600 text-sm">{instructor.rank}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">{t('academies:details.contact')}</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-gray-700">{t('academies:details.website')}</h3>
                        <a href={academy.contact.website} target="_blank" rel="noopener noreferrer" className="text-bjj-blue hover:underline">
                          {academy.contact.website}
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-700">{t('academies:details.email')}</h3>
                        <a href={`mailto:${academy.contact.email}`} className="text-bjj-blue hover:underline">
                          {academy.contact.email}
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-700">{t('academies:details.phone')}</h3>
                        <a href={`tel:${academy.contact.phone}`} className="text-bjj-blue hover:underline">
                          {academy.contact.phone}
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-gray-700">{t('academies:details.address')}</h3>
                        <p>{academy.contact.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  // In a real app, you would fetch academies from an API or database
  const paths = MOCK_ACADEMIES.flatMap(academy => 
    locales!.map(locale => ({
      params: { id: academy.id.toString() },
      locale
    }))
  );
  
  return {
    paths,
    fallback: 'blocking', // Show a loading state
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // In a real app, you would fetch academy details from an API or database
  const academy = MOCK_ACADEMIES.find(a => a.id.toString() === params?.id);
  
  if (!academy) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'academies'])),
      academy,
    },
    revalidate: 60, // Regenerate page every 60 seconds if data changes
  };
};