import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { authService } from '../../services/auth.service';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error(t('passwords dont match'));
            return;
        }

        const token = searchParams.get('token');
        if (!token) {
            toast.error(t('invalid reset link'));
            return;
        }

        try {
            setIsLoading(true);
            await authService.resetPassword({
                token,
                newPassword: formData.password
            });
            toast.success(t('password reset success'));
            navigate('/login');
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
                        {t('reset password')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('Enter your new password to reset your account.')}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('New password')}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900 ltr:pr-10 rtl:pl-10"
                                    placeholder={t('enter new password')}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5 " /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('Confirm password')}
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                                placeholder={t('confirm new password')}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            )}
                            {t('reset password')}
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

export default ResetPassword; 