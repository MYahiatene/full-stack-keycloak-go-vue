import Keycloak from 'keycloak-js';

// TODO: Tests mit vi.stubEnv

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
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
