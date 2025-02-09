export interface Comment {
    id: string;
    userId: string;
    comment: string;
    stars: number;
    createdAt: string;
    user?: {
        name: string;
        avatar: string;
    };
} 