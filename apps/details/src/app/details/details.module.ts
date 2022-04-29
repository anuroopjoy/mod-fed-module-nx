import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { MainComponent } from './details.component';

@NgModule({
  declarations: [MainComponent],
  exports: [MainComponent],
  imports: [CommonModule],
  providers: [],
})
export class MainModule {
  constructor(private injector: Injector) {}
  getComponent() {
    return MainComponent;
  }

  getInjector() {
    return this.injector;
  }
}
