import { Component, OnInit } from '@angular/core';
import { BaseComponent, ModuleFedLoaderOptions } from '@app/core';
import { setRemoteDefinitions } from '@nrwl/angular/mfe';

@Component({
  selector: 'mod-fed-module-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'container';
  selectedCategory!: string;
  loaderConfig: Record<string, ModuleFedLoaderOptions> = {
    nav: {
      name: 'nav',
      inputs: {
        initialSelection: 'Action',
      },
    },
    details: {
      name: 'details',
    },
  };

  override ngOnInit(): void {
    super.ngOnInit();
    setRemoteDefinitions({
      nav: 'http://localhost:4201',
      details: 'http://localhost:4202',
    });
  }
}
