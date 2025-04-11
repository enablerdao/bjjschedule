import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];
  
  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 text-bjj-black hover:text-bjj-blue transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{currentLanguage.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md py-1 z-10 min-w-[120px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                lang.code === currentLanguage.code ? 'text-bjj-blue font-medium' : 'text-bjj-black'
              }`}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}