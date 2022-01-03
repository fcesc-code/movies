export interface Movie {
  imdb_id: string;
  title: string;
  year: number;
  popularity: number;
  description: string;
  content_rating: string;
  rating: number;
  movie_length: number;
  release: string;
  created_at: string;
  plot: string;
  image_url: string;
  banner: string;
  trailer: string;
  type: string;
  more_like_this: Object;
  gen: Genre[];
  keywords: Keyword[];
}

interface Genre {
  id: number;
  genre: string;
}

interface Keyword {
  id: number;
  keyword: string;
}

export interface ShortMovie {
  imdb_id: string;
  title: string;
}
