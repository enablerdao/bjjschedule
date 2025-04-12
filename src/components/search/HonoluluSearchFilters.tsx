import { useState } from 'react';
import { useTranslation } from 'next-i18next';

type HonoluluSearchFiltersProps = {
  onFilterChange: (filters: any) => void;
  onViewModeChange: (mode: 'list' | 'map') => void;
  currentViewMode: 'list' | 'map';
};

export default function HonoluluSearchFilters({ 
  onFilterChange, 
  onViewModeChange,
  currentViewMode
}: HonoluluSearchFiltersProps) {
  const { t } = useTranslation(['common', 'search']);
  const [filters, setFilters] = useState({
    academy_name: '',
    class_type: '',
    day_of_week: '',
  });
  
  const classTypes = [
    { id: 'beginner', name: t('search:classTypes.beginner') },
    { id: 'intermediate', name: t('search:classTypes.intermediate') },
    { id: 'advanced', name: t('search:classTypes.advanced') },
    { id: 'kids', name: t('search:classTypes.kids') },
    { id: 'kids_advanced', name: t('search:classTypes.kids_advanced') },
    { id: 'women', name: t('search:classTypes.women') },
    { id: 'open_mat', name: t('search:classTypes.open_mat') },
  ];
  
  const daysOfWeek = [
    { id: 'monday', name: t('search:daysOfWeek.monday') },
    { id: 'tuesday', name: t('search:daysOfWeek.tuesday') },
    { id: 'wednesday', name: t('search:daysOfWeek.wednesday') },
    { id: 'thursday', name: t('search:daysOfWeek.thursday') },
    { id: 'friday', name: t('search:daysOfWeek.friday') },
    { id: 'saturday', name: t('search:daysOfWeek.saturday') },
    { id: 'sunday', name: t('search:daysOfWeek.sunday') },
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    const newFilters = {
      ...filters,
      [name]: value
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleReset = () => {
    const resetFilters = {
      academy_name: '',
      class_type: '',
      day_of_week: '',
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <label htmlFor="academy_name" className="block text-sm font-medium text-bjj-blue-dark mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {t('search:filters.academy')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="academy_name"
              name="academy_name"
              value={filters.academy_name}
              onChange={handleInputChange}
              placeholder={t('search:filters.academyPlaceholder')}
              className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="class_type" className="block text-sm font-medium text-bjj-blue-dark mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('search:filters.classType')}
          </label>
          <div className="relative">
            <select
              id="class_type"
              name="class_type"
              value={filters.class_type}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue appearance-none pr-10"
            >
              <option value="">{t('search:filters.allTypes')}</option>
              {classTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="day_of_week" className="block text-sm font-medium text-bjj-blue-dark mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t('search:filters.dayOfWeek')}
          </label>
          <div className="relative">
            <select
              id="day_of_week"
              name="day_of_week"
              value={filters.day_of_week}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue appearance-none pr-10"
            >
              <option value="">{t('search:filters.allDays')}</option>
              {daysOfWeek.map(day => (
                <option key={day.id} value={day.id}>{day.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-between items-center border-t border-gray-200 pt-4">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              currentViewMode === 'list' 
                ? 'bg-bjj-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {t('search:viewModes.list')}
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('map')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
              currentViewMode === 'map' 
                ? 'bg-bjj-blue text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            {t('search:viewModes.map')}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {t('buttons.reset')}
        </button>
      </div>
    </div>
  );
}