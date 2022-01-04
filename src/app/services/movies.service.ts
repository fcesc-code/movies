import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../../KEYS/API_SECRET_KEYS';
import {
  CastResponse,
  GenreListResponse,
  KeywordResults,
  MovieResponse,
  ShortMovieListResponse,
} from '../models/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMoviesByRating(
    itemsPerPage: number,
    page: number = 1
  ): Observable<ShortMovieListResponse> {
    const requestedPage = page + 1;
    const options = {
      params: new HttpParams()
        .set('page_size', itemsPerPage)
        .set('page', requestedPage),
    };
    return this.http.get<ShortMovieListResponse>(
      `${API_URL}/movie/order/byRating/`,
      options
    );
  }

  getMoviesByPopularity(
    itemsPerPage: number,
    page: number
  ): Observable<ShortMovieListResponse> {
    const requestedPage = page + 1;
    const options = {
      params: new HttpParams()
        .set('page_size', itemsPerPage)
        .set('page', requestedPage),
    };
    return this.http.get<ShortMovieListResponse>(
      `${API_URL}/movie/order/byPopularity/`,
      options
    );
  }

  getMoviesByYear(
    itemsPerPage: number,
    page: number,
    year: number
  ): Observable<ShortMovieListResponse> {
    const requestedPage = page + 1;
    const options = {
      params: new HttpParams()
        .set('page_size', itemsPerPage)
        .set('page', requestedPage),
    };
    return this.http.get<ShortMovieListResponse>(
      `${API_URL}/movie/byYear/${year}/`,
      options
    );
  }

  getMoviesByGenre(
    itemsPerPage: number,
    page: number,
    genre: string
  ): Observable<ShortMovieListResponse> {
    const requestedPage = page + 1;
    const options = {
      params: new HttpParams()
        .set('page_size', itemsPerPage)
        .set('page', requestedPage),
    };
    return this.http.get<ShortMovieListResponse>(
      `${API_URL}/movie/byGen/${genre}/`,
      options
    );
  }

  getMovieById(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${API_URL}/movie/id/${id}/`);
  }

  getCastByMovieId(id: string): Observable<CastResponse> {
    return this.http.get<CastResponse>(`${API_URL}/movie/id/${id}/cast`);
  }

  getKeywordsByMovieId(id: string): Observable<KeywordResults> {
    return this.http.get<KeywordResults>(`${API_URL}/movie/id/${id}/keywords`);
  }

  getGenres(): Observable<GenreListResponse> {
    return this.http.get<GenreListResponse>(`${API_URL}/genres/`);
  }
}
