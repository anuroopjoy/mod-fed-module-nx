import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainModule } from './details/details.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MainModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
