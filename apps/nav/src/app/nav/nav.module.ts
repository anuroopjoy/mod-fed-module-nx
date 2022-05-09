import { CommonModule } from '@angular/common';
import { Injector, NgModule } from '@angular/core';

import { NavComponent } from './nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule],
  providers: [],
  exports: [NavComponent],
})
export default class NavModule {
  constructor(private injector: Injector) {}

  getComponent() {
    return NavComponent;
  }
  getInjector() {
    return this.injector;
  }
}
