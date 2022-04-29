import { Component } from '@angular/core';
import { BaseComponent, ModuleFedLoaderOptions } from '@app/core';

@Component({
  selector: 'mod-fed-module-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent {
  title = 'container';
  selectedCategory!: string;
  loaderConfig: Record<string, ModuleFedLoaderOptions> = {
    nav: {
      name: 'nav',
      component: 'Module',
      path: 'http://localhost:4201',
      inputs: {
        initialSelection: 'Action',
      },
    },
    main: {
      name: 'details',
      component: 'Module',
      path: 'http://localhost:4202',
    },
  };
}
