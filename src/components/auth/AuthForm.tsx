import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';

type AuthMode = 'login' | 'signup' | 'forgotPassword';

export default function AuthForm() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    
    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        // Redirect to dashboard or home page
        router.push('/');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        setMessage(t('auth.verificationSent'));
      } else if (mode === 'forgotPassword') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) throw error;
        
        setMessage(t('auth.resetPasswordSent'));
      }
    } catch (error: any) {
      setError(error.message || t('errors.somethingWrong'));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {mode === 'login' && t('auth.login')}
        {mode === 'signup' && t('auth.signup')}
        {mode === 'forgotPassword' && t('auth.forgotPassword')}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.email')}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
            required
          />
        </div>
        
        {mode !== 'forgotPassword' && (
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-bjj-blue focus:border-bjj-blue"
              required
              minLength={8}
            />
          </div>
        )}
        
        <button
          type="submit"
          className="w-full btn-primary"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('loading')}
            </span>
          ) : (
            <>
              {mode === 'login' && t('auth.login')}
              {mode === 'signup' && t('auth.signup')}
              {mode === 'forgotPassword' && t('auth.resetPassword')}
            </>
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {mode === 'login' && (
          <>
            <p className="mb-2">
              <button
                onClick={() => setMode('forgotPassword')}
                className="text-bjj-blue hover:underline"
              >
                {t('auth.forgotPassword')}
              </button>
            </p>
            <p>
              {t('auth.noAccount')}{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-bjj-blue hover:underline font-medium"
              >
                {t('auth.createAccount')}
              </button>
            </p>
          </>
        )}
        
        {mode === 'signup' && (
          <p>
            {t('auth.hasAccount')}{' '}
            <button
              onClick={() => setMode('login')}
              className="text-bjj-blue hover:underline font-medium"
            >
              {t('auth.loginNow')}
            </button>
          </p>
        )}
        
        {mode === 'forgotPassword' && (
          <p>
            <button
              onClick={() => setMode('login')}
              className="text-bjj-blue hover:underline"
            >
              {t('auth.backToLogin')}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}