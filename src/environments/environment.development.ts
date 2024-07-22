export const environment = {
    production: false,
    engine: {
        baseUrl: import.meta.env.NG_ENGINE_BASE_URL,
    },
    keycloak: {
        baseUrl: import.meta.env.NG_KEYCLOAK_SERVER_URL,
        realm: import.meta.env.NG_KEYCLOAK_REALM,
        clientId: import.meta.env.NG_KEYCLOAK_RESOURCE,
        redirectUri: import.meta.env.NG_KEYCLOAK_REDIRECT_URL,
        },

    activeLogs: import.meta.env.NG_ACTIVE_LOGS

};
