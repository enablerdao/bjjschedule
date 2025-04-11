import { useTranslation } from 'next-i18next';

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

type HonoluluMapViewProps = {
  academies: Academy[];
};

export default function HonoluluMapView({ academies }: HonoluluMapViewProps) {
  const { t } = useTranslation(['common', 'search']);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('search:mapViewPlaceholder')}
        </h3>
        <p className="text-gray-500">
          {t('common:coming_soon')}
        </p>
        
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">{t('common:academies')}</h4>
          <ul className="space-y-2">
            {academies.map((academy, index) => (
              <li key={index} className="text-left p-3 bg-white rounded border border-gray-200">
                <p className="font-medium">{academy.name}</p>
                <p className="text-sm text-gray-600">{academy.address}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('common:lat')}: {academy.location.latitude}, {t('common:lng')}: {academy.location.longitude}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {t('common:classes')}: {academy.classes.length}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}