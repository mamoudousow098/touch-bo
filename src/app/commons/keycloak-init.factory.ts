import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {

    return () =>
        keycloak.init({
            config: {
                url: environment.keycloak.baseUrl,
                realm: environment.keycloak.realm,
                clientId: environment.keycloak.clientId,
                
                
            },
            initOptions: {
                checkLoginIframe: false,
                redirectUri: environment.keycloak.redirectUri
            },
            loadUserProfileAtStartUp: true
        });
}
