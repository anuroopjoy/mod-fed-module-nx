import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLoaderDirective } from './app-loader.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppLoaderDirective],
  exports: [AppLoaderDirective],
})
export class CoreModule {}
