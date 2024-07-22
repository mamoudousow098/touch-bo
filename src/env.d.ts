interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    /**
     * Built-in environment variable.
     * @see Docs https://github.com/chihab/ngx-env#ng_app_env.
     */
    readonly NG_APP_ENV: string;
    readonly NG_ENGINE_BASE_URL: string;
    readonly NG_KEYCLOAK_SERVER_URL: string;
    readonly NG_KEYCLOAK_REALM: string;
    readonly NG_KEYCLOAK_RESOURCE: string;
    readonly NG_KEYCLOAK_REDIRECT_URL: string;
    readonly NG_ACTIVE_LOGS: boolean;


    [key: string]: any;
}
