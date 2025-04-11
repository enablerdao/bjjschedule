import { useTranslation } from 'next-i18next';
import Link from 'next/link';
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
                <h2 className="text-2xl font-bold text-bjj-black mb-2">{academy.name}</h2>
                <p className="text-gray-600 mb-4">{academy.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                      {t('common:contact_info')}
                    </h3>
                    <p className="text-gray-700 mb-1">{academy.address}</p>
                    {academy.phone && <p className="text-gray-700 mb-1">{academy.phone}</p>}
                    {academy.email && <p className="text-gray-700 mb-1">{academy.email}</p>}
                    {academy.website && (
                      <a 
                        href={academy.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-bjj-blue hover:underline"
                      >
                        {academy.website}
                      </a>
                    )}
                  </div>
                  
                  {Object.keys(academy.social_media).length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                        {t('common:social_media')}
                      </h3>
                      <div className="flex space-x-3">
                        {Object.entries(academy.social_media).map(([platform, url]) => (
                          <a 
                            key={platform}
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-bjj-blue hover:underline"
                          >
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* クラススケジュール */}
              {academy.classes.length > 0 ? (
                <div className="border-t border-gray-200 px-6 py-4">
                  <h3 className="text-lg font-semibold text-bjj-black mb-4">
                    {t('common:class_schedule')}
                  </h3>
                  
                  <div className="space-y-6">
                    {sortedDays.map(day => (
                      <div key={day}>
                        <h4 className="text-md font-medium text-bjj-blue-dark mb-2">
                          {t(`search:daysOfWeek.${day.toLowerCase()}`)}
                        </h4>
                        
                        <div className="overflow-x-auto">
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
                                .sort((a, b) => a.start_time.localeCompare(b.start_time))
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