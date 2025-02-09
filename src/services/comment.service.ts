import axiosInstance from '../config/axios';
import { Comment } from '../types/comment';

export class CommentService {
    private BASE_PATH = '/comments';

    async getPharmacyComments(pharmacyId: string): Promise<Comment[]> {
        const response = await axiosInstance.get(`${this.BASE_PATH}/${pharmacyId}`);
        console.log(response.data);
        return response.data;
    }

    async deleteComment(pharmacyId: string, commentId: string) {
        const response = await axiosInstance.delete(`${this.BASE_PATH}/${pharmacyId}/${commentId}`);
        return response.data;
    }
}

export const commentService = new CommentService(); 