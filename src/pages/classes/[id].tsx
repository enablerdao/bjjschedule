import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { formatDate, formatTime } from '@/utils/dateUtils';

// Mock data for class details
const MOCK_CLASS = {
  id: '1',
  title: 'Fundamentals Class',
  description: 'This class focuses on the fundamental techniques of Brazilian Jiu-Jitsu. It is suitable for beginners and those looking to refine their basic skills. The class covers positions, submissions, escapes, and basic principles of BJJ.',
  date: '2025-04-15',
  startTime: '2025-04-15T18:00:00Z',
  endTime: '2025-04-15T19:30:00Z',
  recurring: true,
  recurrencePattern: 'weekly',
  recurrenceDays: ['Monday', 'Wednesday', 'Friday'],
  category: {
    id: '1',
    name: 'Fundamentals',
    color: '#1E40AF',
  },
  academy: {
    id: '1',
    name: 'Alliance Jiu-Jitsu',
    logo: '/images/academies/alliance.jpg',
    address: 'Rua Oscar Freire, 2250',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brazil',
    postalCode: '05409-011',
    latitude: -23.5558,
    longitude: -46.6568,
  },
  instructor: {
    id: '1',
    name: 'Fabio Gurgel',
    belt: 'Black Belt',
    degree: '4th Degree',
    photo: '/images/instructors/fabio-gurgel.jpg',
  },
  requirements: [
    'No experience required',
    'BJJ Gi (kimono) required',
    'Bring water and a towel',
  ],
  maxAttendees: 30,
  currentAttendees: 12,
  price: {
    amount: 0,
    currency: 'USD',
    included: 'Included in membership',
  },
};

export default function ClassDetail() {
  const { t } = useTranslation(['common', 'class']);
  const router = useRouter();
  const { id } = router.query;
  
  // In a real app, we would fetch the class data based on the ID
  const classData = MOCK_CLASS;
  
  if (!classData) {
    return (
      <>
        <Head>
          <title>{`${t('class:notFound')} - ${t('app.name')}`}</title>
        </Head>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">{t('class:notFound')}</h1>
              <p className="text-gray-600 mb-6">{t('class:notFoundMessage')}</p>
              <button 
                className="btn-primary"
                onClick={() => router.push('/search')}
              >
                {t('class:findOtherClasses')}
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }
  
  return (
    <>
      <Head>
        <title>{`${classData.title} - ${classData.academy.name} - ${t('app.name')}`}</title>
        <meta name="description" content={classData.description.substring(0, 160)} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="text-gray-500 hover:text-bjj-blue">
                    {t('common:nav.home')}
                  </Link>
                </li>
                <li className="text-gray-500">
                  <svg className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <Link href="/search" className="text-gray-500 hover:text-bjj-blue">
                    {t('common:nav.search')}
                  </Link>
                </li>
                <li className="text-gray-500">
                  <svg className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li>
                  <Link href={`/academies/${classData.academy.id}`} className="text-gray-500 hover:text-bjj-blue">
                    {classData.academy.name}
                  </Link>
                </li>
                <li className="text-gray-500">
                  <svg className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-bjj-blue font-medium">
                  {classData.title}
                </li>
              </ol>
            </nav>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Class Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {/* Class Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">{classData.title}</h1>
                        <Link href={`/academies/${classData.academy.id}`} className="text-bjj-blue hover:underline">
                          {classData.academy.name}
                        </Link>
                        <div className="mt-2">
                          <span 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            style={{ 
                              backgroundColor: `${classData.category.color}20`, 
                              color: classData.category.color 
                            }}
                          >
                            {classData.category.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">
                          {t('class:instructor')}
                        </div>
                        <div className="flex items-center justify-end">
                          <div className="mr-2">
                            <div className="font-medium">{classData.instructor.name}</div>
                            <div className="text-sm text-gray-500">{classData.instructor.belt}</div>
                          </div>
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                            {classData.instructor.photo ? (
                              <Image
                                src={classData.instructor.photo}
                                alt={classData.instructor.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center bg-bjj-blue text-white">
                                {classData.instructor.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Class Time */}
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-bold mb-4">{t('class:schedule')}</h2>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                      <div className="mb-4 md:mb-0">
                        <div className="text-sm text-gray-500 mb-1">{t('class:nextClass')}</div>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-bjj-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">{formatDate(classData.startTime)}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <svg className="h-5 w-5 text-bjj-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{formatTime(classData.startTime)} - {formatTime(classData.endTime)}</span>
                        </div>
                      </div>
                      
                      {classData.recurring && (
                        <div>
                          <div className="text-sm text-gray-500 mb-1">{t('class:recurringSchedule')}</div>
                          <div className="flex items-center">
                            <svg className="h-5 w-5 text-bjj-blue mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="font-medium">
                              {t(`class:recurrencePatterns.${classData.recurrencePattern}`)}
                            </span>
                          </div>
                          <div className="flex flex-wrap mt-1">
                            {classData.recurrenceDays.map((day, index) => (
                              <span 
                                key={index}
                                className="mr-2 mb-1 px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full"
                              >
                                {day}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Class Description */}
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-bold mb-4">{t('class:about')}</h2>
                    <p className="text-gray-600">{classData.description}</p>
                  </div>
                  
                  {/* Class Requirements */}
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">{t('class:requirements')}</h2>
                    <ul className="space-y-2">
                      {classData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-5 w-5 text-bjj-green mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div>
                {/* Action Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-1">{t('class:price')}</div>
                    {classData.price.amount === 0 ? (
                      <div className="font-medium">{classData.price.included}</div>
                    ) : (
                      <div className="font-medium">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: classData.price.currency,
                        }).format(classData.price.amount)}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">{t('class:availability')}</div>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {classData.currentAttendees} / {classData.maxAttendees} {t('class:spots')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {classData.maxAttendees - classData.currentAttendees} {t('class:spotsLeft')}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-bjj-blue h-2 rounded-full" 
                        style={{ width: `${(classData.currentAttendees / classData.maxAttendees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button className="w-full btn-primary">
                      {t('class:bookNow')}
                    </button>
                    <button className="w-full btn-outline">
                      {t('class:addToCalendar')}
                    </button>
                    <button className="w-full flex items-center justify-center text-gray-600 hover:text-bjj-blue">
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      {t('class:saveToFavorites')}
                    </button>
                  </div>
                </div>
                
                {/* Academy Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-lg font-bold mb-4">{t('class:location')}</h2>
                    
                    <div className="flex items-center mb-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-200 mr-4">
                        {classData.academy.logo ? (
                          <Image
                            src={classData.academy.logo}
                            alt={classData.academy.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-bjj-blue text-white">
                            {classData.academy.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{classData.academy.name}</h3>
                        <p className="text-sm text-gray-500">
                          {classData.academy.city}, {classData.academy.country}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-gray-600 text-sm">
                      <p>{classData.academy.address}</p>
                      <p>{classData.academy.city}, {classData.academy.state} {classData.academy.postalCode}</p>
                      <p>{classData.academy.country}</p>
                    </div>
                  </div>
                  
                  {/* Map */}
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">{t('class:mapPlaceholder')}</p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <Link 
                      href={`/academies/${classData.academy.id}`}
                      className="w-full btn-outline text-center block"
                    >
                      {t('class:viewAcademy')}
                    </Link>
                  </div>
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
      ...(await serverSideTranslations(locale || 'en', ['common', 'class'])),
    },
  };
};