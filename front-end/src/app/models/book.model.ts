export interface Book {
  _id?: string;
  photo?: string;
  name?: string;
  category?: string;
  author?: string;
  averageRating?: number;
  reviews?: BookReviews[];
}

export interface BookReviews {
  reviewerName: string;
  rating: number;
  comment: string;
}
