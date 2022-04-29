export interface ModuleFedLoaderOptions {
  cssPath?: string;
  name: string;
  component: string;
  inputs?: Record<string, any>;
  outputs?: Record<string, any>;
  loaded?: boolean;
}
