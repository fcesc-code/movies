import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { Role, CastResponse } from 'src/app/models/movie.interface';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.sass'],
})
export class CastComponent implements OnInit, OnDestroy {
  castSubscription!: Subscription;
  cast: Role[] = [];

  constructor(private moviesService: MoviesService) {}

  @Input() movieId!: any;

  ngOnInit(): void {
    this.castSubscription = this.moviesService
      .getCastByMovieId(this.movieId)
      .subscribe((cast: CastResponse) => {
        this.cast = cast.results.roles;
      });
  }

  ngOnDestroy(): void {
    this.castSubscription.unsubscribe();
  }
}
