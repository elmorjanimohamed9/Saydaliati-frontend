import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { authService } from '../../services/auth.service';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            setIsLoading(true);
            await authService.forgotPassword(email);
            toast.success(t('password reset sent'));
        } catch (error: any) {
            toast.error(error.response?.data?.message || t('password reset failed'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EF1262]/5 to-[#4361EE]/5 p-4">
            <div className="w-full max-w-md">
                {/* Logo and Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <img 
                            src="/assets/images/saydaliyati-logo.png" 
                            alt="logo" 
                            className="w-[12rem] flex-none" 
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('forgot password')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('Enter your email to reset your password.')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('Email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                                placeholder={t('enter email')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            )}
                            {t('send reset link')}
                        </button>
                    </form>
                </div>

                {/* Back to Login Link */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5"
                    >
                        <ArrowLeft className={`w-4 h-4 transition-transform duration-300 rtl:rotate-180 group-hover:transform ltr:group-hover:-translate-x-1 rtl:group-hover:translate-x-1`} />
                        <span className="font-medium">{t('back to login')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword; 