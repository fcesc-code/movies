import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { filter, merge, Observable } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

import {
  Genre,
  GenreListResponse,
  ShortMovie,
  ShortMovieListResponse,
} from '../../models/movie.interface';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.sass'],
})
export class MoviesComponent implements OnInit, OnDestroy, AfterViewInit {
  moviesSubscription!: Subscription;
  movies: ShortMovie[];
  count: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  currentSelector: 'Popularity' | 'Rating' | 'Year' | 'Genre';
  selectedGenre: string;
  selectedYear: number;
  currentYear: number;
  currentPage: number;

  selectorsList: string[] = ['Popularity', 'Rating', 'Year', 'Genre'];
  genresList: string[];
  selectorsForm: FormGroup;
  selectors: FormControl;
  year: FormControl;
  genres: FormControl;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  UISubscription!: Subscription;

  constructor(
    private moviesService: MoviesService,
    private formBuilder: FormBuilder
  ) {
    this.movies = [];
    this.genresList = [];
    this.count = 0;
    this.itemsPerPageOptions = [5, 10, 25, 50, 100];
    this.itemsPerPage = this.itemsPerPageOptions[1];
    this.currentPage = 0;
    this.currentSelector = 'Popularity';
    this.selectedYear = 2010;
    this.selectedGenre = 'Drama';
    this.currentYear = Number(new Date().getFullYear());

    this.selectors = new FormControl(this.currentSelector, [
      Validators.required,
    ]);
    this.year = new FormControl(this.selectedYear, [
      Validators.min(1930),
      Validators.max(this.currentYear),
    ]);
    this.genres = new FormControl(this.selectedGenre);

    this.selectorsForm = this.formBuilder.group({
      selectors: this.selectors,
      year: this.year,
      genres: this.genres,
    });
  }

  ngOnInit(): void {
    this.loadMoviesPage();
    this.loadGenres();
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.UISubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    const UIObservableStream = merge(
      this.paginator.page.pipe(
        tap((event: PageEvent) => {
          this.currentPage = event.pageIndex;
          this.itemsPerPage = event.pageSize;
        })
      ),
      this.selectorsForm.valueChanges.pipe(
        filter(
          () =>
            this.currentSelector !== 'Year' ||
            (this.currentSelector === 'Year' && this.year.dirty)
        ),
        tap((event: any) => {
          this.selectedGenre = event.genres;
          this.selectedYear = event.year;
          this.currentSelector = event.selectors;
        })
      )
    );

    this.UISubscription = UIObservableStream.subscribe(() => {
      this.loadMoviesPage();
    });
  }

  getMoviesByPopularity(): void {}

  loadMoviesPage(): void {
    if (this.moviesSubscription) {
      this.moviesSubscription.unsubscribe();
    }

    switch (this.currentSelector) {
      case 'Rating':
        this.loaderFactory(
          this.moviesService.getMoviesByRating(
            this.itemsPerPage,
            this.currentPage
          )
        );
        break;
      case 'Year':
        this.loaderFactory(
          this.moviesService.getMoviesByYear(
            this.itemsPerPage,
            this.currentPage,
            this.selectedYear
          )
        );
        break;
      case 'Genre':
        this.loaderFactory(
          this.moviesService.getMoviesByGenre(
            this.itemsPerPage,
            this.currentPage,
            this.selectedGenre
          )
        );
        break;
      default:
      case 'Popularity':
        this.loaderFactory(
          this.moviesService.getMoviesByPopularity(
            this.itemsPerPage,
            this.currentPage
          )
        );
    }
  }

  loaderFactory(observable: Observable<any>): void {
    this.moviesSubscription = observable.subscribe(
      (movies: ShortMovieListResponse) => {
        this.movies = movies.results;
        this.count = movies.count;
      }
    );
  }

  loadGenres(): void {
    this.moviesService.getGenres().subscribe((genres: GenreListResponse) => {
      this.genresList = genres.results
        .map((genre: Genre) => genre.genre)
        .filter(
          (genre: string) =>
            genre !== 'Short' &&
            genre !== 'Talk-Show' &&
            genre !== 'Game-Show' &&
            genre !== 'Reality-TV' &&
            genre !== 'News' &&
            genre !== 'Adult'
        );
    });
  }
}
