import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_GENERAL_KEYS } from '../../../KEYS/API_SECRET_KEYS';
import { Movie, ShortMovie } from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMoviesByRating(): Observable<ShortMovie[]> {
    const options = {
      params: new HttpParams().set('page-size', '25'),
    };
    return this.http.get<ShortMovie[]>(
      `${API_GENERAL_KEYS.url}/movie/order/byRating/`,
      options
    );
  }

  getMoviesByPopularity(): Observable<ShortMovie[]> {
    const options = {
      params: new HttpParams().set('page-size', '25'),
    };
    return this.http.get<ShortMovie[]>(
      `${API_GENERAL_KEYS.url}/movie/order/byPopularity/`,
      options
    );
  }

  getMoviesByYear(year: number): Observable<ShortMovie[]> {
    const options = {
      params: new HttpParams().set('page-size', '25'),
    };
    return this.http.get<ShortMovie[]>(
      `${API_GENERAL_KEYS.url}/movie/byYear/${year}/`,
      options
    );
  }

  getMoviesByGenre(genre: number): Observable<ShortMovie[]> {
    const options = {
      params: new HttpParams().set('page-size', '25'),
    };
    return this.http.get<ShortMovie[]>(
      `${API_GENERAL_KEYS.url}/movie/byGen/${genre}/`,
      options
    );
  }

  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${API_GENERAL_KEYS.url}/movie/id/${id}/`);
  }
}
