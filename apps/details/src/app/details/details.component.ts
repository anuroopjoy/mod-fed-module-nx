import { Component, OnInit } from '@angular/core';
import { BaseComponent, GlobalStateService } from '@app/core';
import { movieList } from './movies.constants';

@Component({
  selector: 'app-main',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class MainComponent extends BaseComponent implements OnInit {
  title = 'main';
  movies: {
    name: string;
    isActive?: boolean;
  }[][] = [];

  constructor(private state: GlobalStateService) {
    super();
  }

  override ngOnInit(): void {
    this.subscriberMap.set(
      this.state.state$,
      this.handleCategorySelected.bind(this)
    );
    super.ngOnInit();
  }

  private handleCategorySelected(selected: string) {
    this.getMovies(selected);
  }

  private getMovies(category: string) {
    if (category) {
      const movies = movieList.filter((movie) => movie.category === category);
      this.movies = [];
      while (movies.length) this.movies.push(movies.splice(0, 3));
    }
  }
}
