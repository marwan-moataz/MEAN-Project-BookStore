export interface Book {
  _id?: string;
  photo?: string;
  name?: string;
  category?: string;
  categoryId?: string;
  author?: string;
  authorId?: string;
  averageRating?: number;
  reviews?: BookReviews[];
}

export interface BookReviews {
  reviewerName: string;
  rating: number;
  comment: string;
}
