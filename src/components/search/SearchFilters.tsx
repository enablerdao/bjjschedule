import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { supabase } from '@/utils/supabaseClient';

type SearchFiltersProps = {
  initialFilters: {
    city: string;
    country: string;
    date: string;
    classType: string;
  };
  onSearch: (filters: any) => void;
};

export default function SearchFilters({ initialFilters, onSearch }: SearchFiltersProps) {
  const { t } = useTranslation(['common', 'search']);
  const [filters, setFilters] = useState(initialFilters);
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [classTypes, setClassTypes] = useState<{id: string, name: string}[]>([]);
  
  // Fetch countries, cities, and class types on component mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch countries
        const { data: countryData, error: countryError } = await supabase
          .from('academies')
          .select('country')
          .not('country', 'is', null)
          .order('country');
        
        if (countryError) throw countryError;
        
        const uniqueCountries = [...new Set(countryData.map(item => item.country))];
        setCountries(uniqueCountries);
        
        // Fetch cities based on selected country
        if (filters.country) {
          const { data: cityData, error: cityError } = await supabase
            .from('academies')
            .select('city')
            .eq('country', filters.country)
            .not('city', 'is', null)
            .order('city');
          
          if (cityError) throw cityError;
          
          const uniqueCities = [...new Set(cityData.map(item => item.city))];
          setCities(uniqueCities);
        }
        
        // Fetch class types
        const { data: classTypeData, error: classTypeError } = await supabase
          .from('class_categories')
          .select('id, name')
          .order('name');
        
        if (classTypeError) throw classTypeError;
        
        setClassTypes(classTypeData);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    
    fetchFilterOptions();
  }, [filters.country]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Reset city if country changes
    if (name === 'country' && value !== filters.country) {
      setFilters(prev => ({
        ...prev,
        city: ''
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };
  
  const handleReset = () => {
    setFilters({
      city: '',
      country: '',
      date: '',
      classType: ''
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.country')}
          </label>
          <select
            id="country"
            name="country"
            value={filters.country}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          >
            <option value="">{t('search:filters.allCountries')}</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.city')}
          </label>
          <select
            id="city"
            name="city"
            value={filters.city}
            onChange={handleInputChange}
            disabled={!filters.country}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue disabled:bg-gray-100"
          >
            <option value="">{t('search:filters.allCities')}</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.date')}
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          />
        </div>
        
        <div>
          <label htmlFor="classType" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search:filters.classType')}
          </label>
          <select
            id="classType"
            name="classType"
            value={filters.classType}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-bjj-blue focus:ring-bjj-blue"
          >
            <option value="">{t('search:filters.allClassTypes')}</option>
            {classTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          {t('buttons.reset')}
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-bjj-blue text-white rounded-md text-sm font-medium hover:bg-bjj-blue-dark"
        >
          {t('buttons.search')}
        </button>
      </div>
    </form>
  );
}