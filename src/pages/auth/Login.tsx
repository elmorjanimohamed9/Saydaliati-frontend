import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { authService } from '../../services/auth.service';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const response = await authService.login({
                email: formData.email,
                password: formData.password
            });

            if (formData.remember) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.User));
            } else {
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('user', JSON.stringify(response.User));
            }

            toast.success(t('Login successful!'));
            navigate('/pharmacies');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || t('login failed');
            toast.error(errorMessage);
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
                        {t('login')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {t('login subtitle', 'Welcome back!')}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
                    <form onSubmit={submitForm} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('Email')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                                placeholder={t('enter email')}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('Password')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="form-input w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900"
                                placeholder={t('Enter password')}
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="form-checkbox rounded text-primary border-gray-300 dark:border-gray-700"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                />
                                <label htmlFor="remember" className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                                    {t('Remember me')}
                                </label>
                            </div>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-primary hover:text-primary-dark transition-colors"
                            >
                                {t('Forgot password?')}
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t('signing in') : t('sign in')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;