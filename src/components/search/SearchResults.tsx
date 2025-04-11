import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatTime } from '@/utils/dateUtils';

type ClassResult = {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  academy: {
    id: string;
    name: string;
    city: string;
    country: string;
    logo_url: string;
  };
  category: {
    id: string;
    name: string;
    color_code: string;
  };
  instructors: {
    id: string;
    name: string;
    belt_level: string;
  }[];
};

type SearchResultsProps = {
  results: ClassResult[];
  isLoading: boolean;
};

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  const { t } = useTranslation(['common', 'search']);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bjj-blue"></div>
      </div>
    );
  }
  
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{t('search:noResultsTitle')}</h3>
        <p className="text-gray-600 mb-6">{t('search:noResultsDescription')}</p>
        <Link href="/" className="btn-primary">
          {t('search:backToHome')}
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {results.map((classItem) => (
        <div key={classItem.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                  {classItem.academy.logo_url ? (
                    <Image
                      src={classItem.academy.logo_url}
                      alt={classItem.academy.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-bjj-blue text-white text-xl font-bold">
                      {classItem.academy.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {classItem.title}
                    </h3>
                    <Link href={`/academies/${classItem.academy.id}`} className="text-bjj-blue hover:underline">
                      {classItem.academy.name}
                    </Link>
                  </div>
                  
                  <div className="mt-2 sm:mt-0">
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${classItem.category.color_code}20`, 
                        color: classItem.category.color_code 
                      }}
                    >
                      {classItem.category.name}
                    </span>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(classItem.start_time)}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}</span>
                  </div>
                  
                  <div className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{classItem.academy.city}, {classItem.academy.country}</span>
                  </div>
                </div>
                
                {classItem.instructors && classItem.instructors.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs text-gray-500">{t('search:instructors')}:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {classItem.instructors.map(instructor => (
                        <span key={instructor.id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {instructor.name} ({instructor.belt_level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 sm:mt-0 sm:ml-6 flex flex-col sm:items-end">
                <Link 
                  href={`/classes/${classItem.id}`}
                  className="btn-outline w-full sm:w-auto text-center"
                >
                  {t('search:viewDetails')}
                </Link>
                
                <button className="mt-2 flex items-center text-sm text-bjj-blue hover:text-bjj-blue-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  {t('search:saveToFavorites')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}