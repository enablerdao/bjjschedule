import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { formatTime } from '@/utils/dateUtils';

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

type HonoluluSearchResultsProps = {
  academies: Academy[];
};

export default function HonoluluSearchResults({ academies }: HonoluluSearchResultsProps) {
  const { t } = useTranslation(['common', 'search']);
  
  // 曜日の順序を定義
  const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // クラスタイプに応じたバッジの色を取得
  const getClassTypeBadgeColor = (classType: string) => {
    switch (classType) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      case 'kids':
        return 'bg-yellow-100 text-yellow-800';
      case 'kids_advanced':
        return 'bg-orange-100 text-orange-800';
      case 'women':
        return 'bg-pink-100 text-pink-800';
      case 'open_mat':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (academies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">{t('search:noResults')}</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* アカデミー情報 */}
      <div className="space-y-6">
        {academies.map((academy, index) => {
          // アカデミーごとにクラスを曜日でグループ化
          const classesByDay = academy.classes.reduce((acc, cls) => {
            if (!acc[cls.day_of_week]) {
              acc[cls.day_of_week] = [];
            }
            acc[cls.day_of_week].push(cls);
            return acc;
          }, {} as Record<string, Class[]>);
          
          // 曜日を順序に従ってソート
          const sortedDays = Object.keys(classesByDay).sort(
            (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
          );
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                  <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    <Image 
                      src={academy.logo_url || '/images/logos/default-logo.svg'} 
                      alt={`${academy.name} logo`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/logos/default-logo.svg';
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-bjj-black">{academy.name}</h2>
                    <p className="text-gray-600">{academy.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-bjj-blue-dark uppercase tracking-wider mb-3">
                      {t('common:contact_info')}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700 flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{academy.address}</span>
                      </p>
                      {academy.phone && (
                        <p className="text-gray-700 flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{academy.phone}</span>
                        </p>
                      )}
                      {academy.email && (
                        <p className="text-gray-700 flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>{academy.email}</span>
                        </p>
                      )}
                      {academy.website && (
                        <a 
                          href={academy.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bjj-blue hover:underline flex items-start"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <span className="break-all">{academy.website.replace(/^https?:\/\//, '')}</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {academy.social_media && Object.keys(academy.social_media).length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-bjj-blue-dark uppercase tracking-wider mb-3">
                        {t('common:social_media')}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(academy.social_media).map(([platform, url]) => {
                          const icon = platform === 'facebook' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                            </svg>
                          ) : platform === 'instagram' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          ) : platform === 'twitter' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          ) : platform === 'yelp' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.94-.8-1.664-1.76l1.984-6.892c.276-.96 1.65-.96 1.924 0l2.75 6.892c.276.96-.04 1.76-1 2.327zm-.84 1.732c.276-.962 1.65-.962 1.924 0l2.75 6.892c.276.96-.04 1.76-1 2.327l-4.995 1.433c-.96.276-1.94-.8-1.664-1.76l1.984-6.892zm-8.654.384c.552-.552 1.434-.552 1.986 0l5.586 5.586c.552.552.552 1.434 0 1.986l-3.488 3.488c-.552.552-1.434.552-1.986 0l-5.586-5.586c-.552-.552-.552-1.434 0-1.986l3.488-3.488zm-1.848-7.334l4.995 1.433c.96.276.96 1.65 0 1.924l-6.892 2.75c-.96.276-1.76-.04-2.327-1l-1.433-4.995c-.276-.96.8-1.94 1.76-1.664l6.892 1.984zm-4.457 13.548l1.433-4.995c.276-.96 1.65-.96 1.924 0l2.75 6.892c.276.96-.04 1.76-1 2.327l-4.995 1.433c-.96.276-1.94-.8-1.664-1.76l1.552-3.897z"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          );
                          
                          return (
                            <a 
                              key={platform}
                              href={url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center px-3 py-2 bg-white rounded-md shadow-sm text-bjj-blue hover:bg-bjj-blue hover:text-white transition-colors"
                            >
                              {icon}
                              <span className="ml-2">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* クラススケジュール */}
              {academy.classes.length > 0 ? (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-xl font-semibold text-bjj-black mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('common:class_schedule')}
                  </h3>
                  
                  <div className="space-y-8">
                    {sortedDays.map(day => (
                      <div key={day} className="bg-white rounded-lg shadow-sm">
                        <h4 className="text-md font-medium bg-bjj-blue text-white px-4 py-2 rounded-t-lg">
                          {t(`search:daysOfWeek.${day.toLowerCase()}`)}
                        </h4>
                        
                        <div className="p-2">
                          {/* デスクトップ表示用テーブル */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('common:time')}
                                  </th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('common:class')}
                                  </th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('common:instructor')}
                                  </th>
                                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('common:type')}
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {classesByDay[day]
                                  .sort((a, b) => {
                                    if (a.start_time && b.start_time) {
                                      return a.start_time.localeCompare(b.start_time);
                                    }
                                    return 0;
                                  })
                                  .map((cls, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {formatTime(cls.start_time)} - {formatTime(cls.end_time)}
                                      </td>
                                      <td className="px-3 py-2 text-sm text-gray-900">
                                        <div className="font-medium">{cls.name}</div>
                                        <div className="text-xs text-gray-500">{cls.description}</div>
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {cls.instructor}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getClassTypeBadgeColor(cls.class_type)}`}>
                                          {t(`search:classTypes.${cls.class_type}`)}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* モバイル表示用カード */}
                          <div className="md:hidden space-y-3">
                            {classesByDay[day]
                              .sort((a, b) => {
                                if (a.start_time && b.start_time) {
                                  return a.start_time.localeCompare(b.start_time);
                                }
                                return 0;
                              })
                              .map((cls, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="font-medium text-bjj-black">{cls.name}</div>
                                    <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getClassTypeBadgeColor(cls.class_type)}`}>
                                      {t(`search:classTypes.${cls.class_type}`)}
                                    </span>
                                  </div>
                                  
                                  <div className="text-xs text-gray-500 mb-2">{cls.description}</div>
                                  
                                  <div className="flex flex-wrap gap-y-2">
                                    <div className="w-full sm:w-1/2 flex items-center text-sm text-gray-700">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {formatTime(cls.start_time)} - {formatTime(cls.end_time)}
                                    </div>
                                    
                                    <div className="w-full sm:w-1/2 flex items-center text-sm text-gray-700">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-bjj-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                      </svg>
                                      {cls.instructor}
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 px-6 py-4">
                  <p className="text-gray-500 italic">{t('search:noClassesAvailable')}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}