import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Trash2,
    MessageSquare,
    ArrowLeft,
    Eye,
    Search,
    User,
    Calendar,
    Star,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { commentService } from '../services/comment.service';
import { Comment } from '../types/comment';
import CommentViewModal from '../components/CommentViewModal';
import { pharmacyService } from '../services/pharmacy.service';

const PharmacyComments = () => {
    const { t } = useTranslation();
    const { pharmacyId } = useParams<{ pharmacyId: string }>();
    const navigate = useNavigate();
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
    const [pharmacyName, setPharmacyName] = useState<string>('');

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredComments(comments);
            return;
        }

        const searchTermLower = searchTerm.toLowerCase();
        const filtered = comments.filter(comment =>
            comment.user?.name?.toLowerCase().includes(searchTermLower) ||
            comment.comment.toLowerCase().includes(searchTermLower)
        );

        setFilteredComments(filtered);
    }, [searchTerm, comments]);

    useEffect(() => {
        if (pharmacyId) {
            fetchPharmacyComments();
        }
    }, [pharmacyId]);

    const fetchPharmacyComments = async () => {
        if (!pharmacyId) return;
        
        try {
            setLoading(true);
            const commentsData = await commentService.getPharmacyComments(pharmacyId);
            setComments(commentsData);
            setFilteredComments(commentsData);
        } catch (error) {
            toast.error(t('error_loading_comments'));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!pharmacyId) return;
        
        try {
            await commentService.deleteComment(pharmacyId, commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
            toast.success(t('comment deleted successfully'));
        } catch (error) {
            toast.error(t('error deleting comment'));
        }
    };

    const handleViewComment = (comment: Comment) => {
        setSelectedComment(comment);
        setIsViewModalOpen(true);
    };

    const fetchPharmacyName = async () => {
        if (!pharmacyId) return;
        try {
            const data = await pharmacyService.getPharmacyById(pharmacyId);
            setPharmacyName(data.name);
        } catch (error) {
            console.error('Error fetching pharmacy name:', error);
        }
    };

    useEffect(() => {
        if (pharmacyId) {
            fetchPharmacyName();
        }
    }, [pharmacyId]);

    const CommentCard = ({ comment }: { comment: Comment }) => (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 h-full flex flex-col transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                        {comment.user?.avatar ? (
                            <img
                                src={comment.user.avatar}
                                alt={comment.user.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        ) : (
                            <User className="w-6 h-6 text-primary" />
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {comment.user?.name || t('anonymous')}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="flex">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={`w-4 h-4 ${
                                        index < comment.stars
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex-1">
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                    {comment.comment}
                </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleViewComment(comment)}
                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
                            title={t('view comment')}
                        >
                            <Eye className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
                        </button>
                        <button
                            onClick={() => handleDelete(comment.id)}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
                            title={t('delete comment')}
                        >
                            <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 rounded-lg dark:bg-gray-900 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        title={t('go_back')}
                    >
                        <ArrowLeft className="w-5 h-5 rtl:rotate-180  text-gray-600 dark:text-gray-400" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {pharmacyName || t('loading')}
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder={t('search comments...')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 
                                     rounded-full border border-gray-200 dark:border-gray-700 
                                     focus:ring-2 focus:ring-primary focus:border-transparent
                                     text-gray-900 dark:text-white outline-none"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{filteredComments.length} {t('comments')}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-60">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                    </div>
                ) : filteredComments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredComments.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                            {searchTerm ? t('no results found') : t('no comments yet')}
                        </h3>
                    </div>
                )}

                <CommentViewModal
                    comment={selectedComment}
                    isOpen={isViewModalOpen}
                    onClose={() => {
                        setIsViewModalOpen(false);
                        setSelectedComment(null);
                    }}
                />
            </div>
        </div>
    );
};

export default PharmacyComments;