import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EF1262]/5 to-[#4361EE]/5 p-4">
            <div className="text-center">
                <div className="flex justify-center mb-6">
                    <ShieldAlert className="w-20 h-20 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('unauthorized_access')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {t('unauthorized_message')}
                </p>
                <Link 
                    to="/"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{t('back_to_home')}</span>
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized; 