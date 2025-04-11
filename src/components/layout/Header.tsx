import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation('common');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-bjj-blue font-bold text-2xl">{t('app.name')}</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/search" className="text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.search')}
            </Link>
            <Link href="/academies" className="text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.academies')}
            </Link>
            <Link href="/about" className="text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
            <Link href="/login" className="btn-outline">
              {t('nav.login')}
            </Link>
            <Link href="/signup" className="btn-primary">
              {t('nav.signup')}
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-bjj-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-3">
            <Link href="/search" className="block text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.search')}
            </Link>
            <Link href="/academies" className="block text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.academies')}
            </Link>
            <Link href="/about" className="block text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contact" className="block text-bjj-black hover:text-bjj-blue transition-colors">
              {t('nav.contact')}
            </Link>
            <LanguageSwitcher />
            <div className="flex space-x-2 pt-2">
              <Link href="/login" className="btn-outline flex-1 text-center">
                {t('nav.login')}
              </Link>
              <Link href="/signup" className="btn-primary flex-1 text-center">
                {t('nav.signup')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}