import Keycloak from 'keycloak-js';

// TODO: Use env variables
// TODO: Tests
export const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "futterhaus-realm",
  clientId: "futterhaus-frontend"
});


export async function initKeycloak(): Promise<void> {
  try {
    await keycloak.init({onLoad: 'login-required', pkceMethod: 'S256'});
  } catch (error) {
    throw error;
  }

}


keycloak.onTokenExpired = () => {
  keycloak.updateToken(30).catch(() => keycloak.login())
}

keycloak.onAuthLogout = async () => {
  await keycloak.login();
}
