export interface userTableData {
  photo: string;
  name: string;
  author: string;
  averageRating: number;
  rating: number;
  shelve: 'read' | 'reading' | 'want to read' | null;
}
