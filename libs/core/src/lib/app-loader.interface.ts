export interface ModuleFedLoaderOptions {
  path: string;
  cssPath?: string;
  name: string;
  component: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  loaded?: boolean;
}
