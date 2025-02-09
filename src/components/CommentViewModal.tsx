import { useTranslation } from 'react-i18next';
import { Calendar, Clock, MessageSquare, User, Star } from 'lucide-react';
import Modal from './Modal';
import { Comment } from '../types/comment';

interface CommentViewModalProps {
    comment: Comment | null;
    isOpen: boolean;
    onClose: () => void;
}

const CommentViewModal = ({ comment, isOpen, onClose }: CommentViewModalProps) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const StarRating = ({ rating }: { rating: number }) => (
        <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl">
            <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        className={`w-8 h-8 transition-all duration-300 ${
                            index < rating
                                ? 'text-yellow-400 fill-yellow-400 animate-pulse'
                                : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
            <div className="text-2xl font-bold text-primary">
                {rating.toFixed(1)}/5
            </div>
        </div>
    );

    if (!isOpen || !comment) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t('comment details')}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
                    <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="relative">
                            {comment.user?.avatar ? (
                                <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-gray-700 shadow-md"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="w-6 h-6 text-primary" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-gray-900 dark:text-white truncate ${isRTL ? 'text-right' : ''}`}>
                                {comment.user?.name || t('anonymous')}
                            </h4>
                            <div className={`flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Clock className="w-4 h-4" />
                                    <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4">
                    <StarRating rating={comment.stars} />
                </div>

                <div className="p-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="relative">
                        <div className="absolute top-0 left-0 w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-6 h-6 text-primary" />
                        </div>
                        <div className="pl-16">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('comment')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {comment.comment}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-primary 
                                 rounded-lg hover:bg-primary-dark transition-colors duration-200"
                    >
                        {t('close')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CommentViewModal;