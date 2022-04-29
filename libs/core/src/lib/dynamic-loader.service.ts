/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  loadRemoteModule,
  setRemoteDefinitions,
  setRemoteUrlResolver,
} from '@nrwl/angular/mfe';
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
  private loaderQueue: Record<string, ModuleFedLoaderOptions[]> = {};
  constructor(private injector: Injector) {}

  public loadModule(
    viewContainerRef: ViewContainerRef,
    appDetail: ModuleFedLoaderOptions
  ) {
    if (!appDetail) return;
    this.loadStyles(appDetail);
    if (this.loaderQueue[appDetail.path]?.length) {
      const pendingModules = this.loaderQueue[appDetail.path].filter(
        (app) => !app.loaded
      );
      if (pendingModules?.length) {
        setTimeout(
          this.loadModule.bind(this, viewContainerRef, appDetail),
          100
        );
        return;
      }
      delete this.loaderQueue[appDetail.path];
    }
    this.loaderQueue[appDetail.path] = this.loaderQueue[appDetail.path]?.length
      ? [...this.loaderQueue[appDetail.path], appDetail]
      : [appDetail];
    setRemoteDefinitions({
      [appDetail.name]: appDetail.path,
    });
    return loadRemoteModule(appDetail.name, `./${appDetail.component}`)
      .then(async (m: any) => {
        const lazyModule = m[appDetail.component];
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
        set(
          this.loaderQueue[appDetail.path].find(
            (app) => app.component === appDetail.component
          ) as ModuleFedLoaderOptions,
          'loaded',
          true
        );
      })
      .catch((error) => {
        set(
          this.loaderQueue[appDetail.path].find(
            (app) => app.component === appDetail.component
          ) as ModuleFedLoaderOptions,
          'loaded',
          true
        );
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
