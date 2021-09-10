declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SWA_CLI_DEBUG: DebugFilterLevel;
      SWA_CLI_API_URI: string;
      SWA_CLI_APP_URI: string;
      SWA_CLI_OUTPUT_LOCATION: string;
      SWA_CLI_ROUTES_LOCATION: String;
      SWA_CLI_HOST: string;
      SWA_CLI_PORT: string;
      SWA_WORKFLOW_FILE: string;
      SWA_CLI_APP_SSL: boolean;
      SWA_CLI_APP_SSL_KEY: string;
      SWA_CLI_APP_SSL_CERT: string;
      SWA_CLI_STARTUP_COMMAND: string;
    }
  }
}

declare interface Context {
  bindingData: undefined | { provider: string };
  invocationId?: string;
  res: {
    status?: number;
    cookies?: [
      {
        name: string;
        value: string;
        expires: string | Date;
        domaine: string;
      }
    ];
    headers?: { [key: string]: string };
    body?: { [key: string]: string } | string | null;
  };
}
declare interface Path {
  function: string;
  route: RegExp;
  method: "GET" | "POST";
}

declare type RuntimeHostConfig = {
  appPort: number;
  proxyHost: string;
  proxyPort: number;
  appLocation: string | undefined;
  outputLocation: string | undefined;
};

declare type GithubActionWorkflow = {
  appBuildCommand?: string;
  apiBuildCommand?: string;
  appLocation?: string;
  apiLocation?: string;
  outputLocation?: string;
  files?: string[];
};

declare type SWACLIOptions = {
  /**
   * CLI port
   */
  port?: number;
  /**
   * CLI host address
   */
  host?: string;
  /**
   * API backend port
   */
  apiPort?: number;
  /**
   * Serve the app and API over HTTPS
   */
  ssl?: boolean;
  apiPrefix?: "api";
  /**
   * SSL certificate (.crt) to use for serving HTTPS
   */
  sslCert?: string;
  /**
   * SSL key (.key) to use for serving HTTPS
   */
  sslKey?: string;
  swaConfigFilename?: "staticwebapp.config.json";
  swaConfigFilenameLegacy?: "routes.json";
  /**
   * Location of the build output directory relative to the appLocation
   */
  app?: string;
  /**
   * API folder or Azure Functions emulator address
   */
  apiLocation?: string;
  build?: boolean;
  verbose?: string;
  /**
   * Run a command at startup
   */
  run?: string;
  swaConfigLocation?: string;
  customUrlScheme?: string;
  overridableErrorCode?: number[];
  /**
   * Time to wait(in ms) for the dev server to start
   */
  devserverTimeout?: number;
};

declare type SWACLIConfig = SWACLIOptions & GithubActionWorkflow;

declare type ResponseOptions = {
  [key: string]: any;
};
declare type ClientPrincipal = {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
};

declare type SWAConfigFileRoute = {
  route: string;
  allowedRoles?: string[];
  statusCode?: number | string;
  serve?: string;
  headers?: SWAConfigFileRouteHeaders;
  methods?: string[];
  rewrite?: string;
  redirect?: string;
};

declare type SWAConfigFileGlobalHeaders = {
  [key: string]: string;
};

declare type SWAConfigFileRouteHeaders = {
  [key: string]: string;
};

declare type SWAConfigFileNavigationFallback = {
  rewrite: string;
  exclude?: string[];
};

declare type SWAConfigFileResponseOverrides = {
  [key: string]: {
    rewrite?: string;
    statusCode?: number;
    redirect?: string;
  };
};

declare type SWAConfigFileMimeTypes = {
  [key: string]: string;
};

declare type SWAConfigFile = {
  routes: SWAConfigFileRoute[];
  navigationFallback: SWAConfigFileNavigationFallback;
  responseOverrides: SWAConfigFileResponseOverrides;
  globalHeaders: SWAConfigFileGlobalHeaders;
  mimeTypes: SWAConfigFileMimeTypes;
  isLegacyConfigFile: boolean;
};

declare type DebugFilterLevel = "silly" | "silent" | "log" | "info" | "error";

declare type SWACLIConfigFile = {
  configurations?: {
    [name: string]: SWACLIOptions & { context?: string };
  };
};
