import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for featured academies
const FEATURED_ACADEMIES = [
  {
    id: 1,
    name: 'Alliance Jiu-Jitsu',
    location: 'São Paulo, Brazil',
    image: '/images/placeholder-academy-1.jpg',
    classes: 42,
  },
  {
    id: 2,
    name: 'Gracie Barra',
    location: 'Rio de Janeiro, Brazil',
    image: '/images/placeholder-academy-2.jpg',
    classes: 38,
  },
  {
    id: 3,
    name: 'Relson Gracie Jiu-Jitsu Team HK',
    location: 'Honolulu, Hawaii',
    image: '/images/placeholder-academy-3.jpg',
    classes: 38,
    specialLink: '/honolulu',
  },
  {
    id: 4,
    name: 'Carpe Diem BJJ 原宿',
    location: '東京, 日本',
    image: '/images/placeholder-academy-4.jpg',
    classes: 15,
    specialLink: '/tokyo',
  },
];

export default function FeaturedAcademies() {
  const { t } = useTranslation('home');
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {t('featured.title')}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ACADEMIES.map((academy) => (
            <Link 
              key={academy.id} 
              href={academy.specialLink || `/academies/${academy.id}`}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 mb-4 rounded overflow-hidden">
                <div className="absolute inset-0 bg-bjj-blue/20 flex items-center justify-center">
                  <span className="text-white font-bold">{t('featured.imagePlaceholder')}</span>
                </div>
                {/* Uncomment when you have actual images */}
                {/* <Image 
                  src={academy.image} 
                  alt={academy.name} 
                  fill 
                  className="object-cover" 
                /> */}
              </div>
              <h3 className="font-bold text-lg mb-1">{academy.name}</h3>
              <p className="text-gray-600 mb-2">{academy.location}</p>
              <p className="text-sm text-bjj-blue">
                {t('featured.classesCount', { count: academy.classes })}
              </p>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/academies" className="btn-outline">
            {t('featured.viewAllButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}