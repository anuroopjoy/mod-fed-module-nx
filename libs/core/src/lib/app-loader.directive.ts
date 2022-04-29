import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
} from '@angular/core';
import { ModuleFedLoaderOptions } from './app-loader.interface';

import { DynamicLoader } from './dynamic-loader.service';

@Directive({
  selector: '[appModuleFedLoader]',
})
export class AppLoaderDirective implements OnChanges {
  @Input() public appModuleFedLoader!: ModuleFedLoaderOptions;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private loader: DynamicLoader,
    private cdr: ChangeDetectorRef
  ) {}
  public ngOnChanges(): Promise<void> {
    return this.loader.loadModule(
      this.viewContainerRef,
      this.appModuleFedLoader
    ) as Promise<void>;
  }
}
