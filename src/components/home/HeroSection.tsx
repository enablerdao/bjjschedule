import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function HeroSection() {
  const { t } = useTranslation('home');
  
  return (
    <section className="bg-gradient-to-r from-bjj-blue to-bjj-black text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/search" className="btn-accent text-center">
              {t('hero.searchButton')}
            </Link>
            <Link href="/academies/register" className="btn bg-white text-bjj-blue hover:bg-gray-100 text-center">
              {t('hero.registerButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}