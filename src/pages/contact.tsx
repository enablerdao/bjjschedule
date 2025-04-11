import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Contact() {
  const { t } = useTranslation('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setSubmitError(t('errors.somethingWrong'));
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Head>
        <title>{t('contact.title')} - {t('app.name')}</title>
        <meta name="description" content={t('contact.description')} />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8 text-center">{t('contact.title')}</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h2 className="text-2xl font-bold mb-2">{t('contact.thankYou')}</h2>
                  <p className="text-gray-600 mb-6">{t('contact.successMessage')}</p>
                  <button 
                    className="btn-primary"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    {t('contact.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        {t('contact.nameLabel')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">
                        {t('contact.emailLabel')}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">
                      {t('contact.subjectLabel')}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('contact.selectSubject')}</option>
                      <option value="general">{t('contact.subjects.general')}</option>
                      <option value="academy">{t('contact.subjects.academy')}</option>
                      <option value="technical">{t('contact.subjects.technical')}</option>
                      <option value="partnership">{t('contact.subjects.partnership')}</option>
                      <option value="other">{t('contact.subjects.other')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">
                      {t('contact.messageLabel')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="form-input"
                      required
                    ></textarea>
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn-primary min-w-[150px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('loading') : t('contact.submitButton')}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg className="w-10 h-10 text-bjj-blue mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">{t('contact.email')}</h3>
                <p className="text-gray-600">support@bjjschedule.com</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg className="w-10 h-10 text-bjj-blue mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">{t('contact.phone')}</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <svg className="w-10 h-10 text-bjj-blue mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">{t('contact.location')}</h3>
                <p className="text-gray-600">Tokyo, Japan</p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};