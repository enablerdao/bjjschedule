import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function SearchSection() {
  const { t } = useTranslation('home');
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [classType, setClassType] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (date) params.append('date', date);
    if (classType) params.append('type', classType);
    
    router.push(`/search?${params.toString()}`);
  };
  
  return (
    <section className="py-12 bg-bjj-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            {t('search.title')}
          </h2>
          
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('search.locationLabel')}
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                  placeholder={t('search.locationPlaceholder')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('search.dateLabel')}
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="classType" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('search.classTypeLabel')}
                </label>
                <select
                  id="classType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
                  value={classType}
                  onChange={(e) => setClassType(e.target.value)}
                >
                  <option value="">{t('search.allClasses')}</option>
                  <option value="fundamentals">{t('search.classTypes.fundamentals')}</option>
                  <option value="advanced">{t('search.classTypes.advanced')}</option>
                  <option value="nogi">{t('search.classTypes.nogi')}</option>
                  <option value="kids">{t('search.classTypes.kids')}</option>
                  <option value="competition">{t('search.classTypes.competition')}</option>
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <button type="submit" className="btn-primary px-8">
                {t('search.searchButton')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}