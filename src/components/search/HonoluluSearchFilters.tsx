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
    { id: 'Monday', name: t('search:daysOfWeek.monday') },
    { id: 'Tuesday', name: t('search:daysOfWeek.tuesday') },
    { id: 'Wednesday', name: t('search:daysOfWeek.wednesday') },
    { id: 'Thursday', name: t('search:daysOfWeek.thursday') },
    { id: 'Friday', name: t('search:daysOfWeek.friday') },
    { id: 'Saturday', name: t('search:daysOfWeek.saturday') },
    { id: 'Sunday', name: t('search:daysOfWeek.sunday') },
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="academy_name" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.academy')}
          </label>
          <input
            type="text"
            id="academy_name"
            name="academy_name"
            value={filters.academy_name}
            onChange={handleInputChange}
            placeholder={t('search:filters.academyPlaceholder')}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          />
        </div>
        
        <div>
          <label htmlFor="class_type" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.classType')}
          </label>
          <select
            id="class_type"
            name="class_type"
            value={filters.class_type}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          >
            <option value="">{t('search:filters.allTypes')}</option>
            {classTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="day_of_week" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.dayOfWeek')}
          </label>
          <select
            id="day_of_week"
            name="day_of_week"
            value={filters.day_of_week}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          >
            <option value="">{t('search:filters.allDays')}</option>
            {daysOfWeek.map(day => (
              <option key={day.id} value={day.id}>{day.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentViewMode === 'list' 
                ? 'bg-bjj-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('search:viewModes.list')}
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('map')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              currentViewMode === 'map' 
                ? 'bg-bjj-blue text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('search:viewModes.map')}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {t('buttons.reset')}
        </button>
      </div>
    </div>
  );
}