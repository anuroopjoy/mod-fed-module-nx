/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadRemoteModule } from '@nrwl/angular/mfe';
import {
  ComponentRef,
  createNgModuleRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { each, set } from 'lodash-es';
import { ModuleFedLoaderOptions } from './app-loader.interface';

@Injectable({
  providedIn: 'root',
})
export class DynamicLoader {
  constructor(private injector: Injector) {}

  public loadModule(
    viewContainerRef: ViewContainerRef,
    appDetail: ModuleFedLoaderOptions
  ) {
    if (!appDetail) return;
    this.loadStyles(appDetail);
    appDetail.component = appDetail.component ?? 'default';
    return loadRemoteModule(appDetail.name, `./${appDetail.component}`)
      .then(async (m: any) => {
        const lazyModule = m[appDetail.component as string];
        const moduleRef = createNgModuleRef(lazyModule, this.injector);
        const componentClass = (moduleRef.instance as any).getComponent();
        const injector = (moduleRef.instance as any).getInjector();
        viewContainerRef.clear();
        lazyModule.injector = injector;
        const component: ComponentRef<any> = viewContainerRef.createComponent(
          componentClass,
          { ngModuleRef: moduleRef }
        );
        each(appDetail.inputs, (value, key) => {
          component.instance[key] = value;
        });
        each(appDetail.outputs, (value, key) => {
          component.instance[key].subscribe(value);
        });
        set(appDetail, 'loaded', true);
      })
      .catch((error) => {
        set(appDetail, 'loaded', true);
        return error;
      });
  }

  private loadStyles(appDetail: ModuleFedLoaderOptions) {
    if (appDetail.cssPath) {
      const link = document.createElement('link');
      link.href = appDetail.cssPath;
      link.rel = 'stylesheet';
      document.body.appendChild(link);
    }
  }
}
