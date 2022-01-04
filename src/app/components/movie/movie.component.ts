import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie, MovieResponse } from 'src/app/models/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass'],
})
export class MovieComponent implements OnInit {
  imageSubscription!: Subscription;
  movie: Movie;
  safeUrl!: any;

  constructor(
    private moviesService: MoviesService,
    private activeatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.movie = {
      imdb_id: '',
      title: '',
      year: 2000,
      popularity: 5000,
      description: '',
      content_rating: '',
      rating: 9,
      movie_length: 100,
      release: '',
      created_at: '',
      plot: '',
      image_url: '',
      banner: '',
      trailer: '',
      type: '',
      more_like_this: {},
      gen: [],
      keywords: [],
    };
  }

  ngOnInit(): void {
    const movieId: string | null =
      this.activeatedRoute.snapshot.paramMap.get('id');

    if (movieId) {
      this.imageSubscription = this.moviesService
        .getMovieById(movieId)
        .subscribe((movie: MovieResponse) => {
          this.movie = movie.results;
        });
    }
  }
}
