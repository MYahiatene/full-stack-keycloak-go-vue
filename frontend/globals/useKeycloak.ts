import {keycloak} from "../src/auth/keycloak";
//Todo: test
interface UseKeycloak {
  updateToken: () => void
}

export function useKeycloak(): UseKeycloak {


  function updateToken() {
    keycloak.updateToken(30).catch(() => keycloak.login())
  }

  return {updateToken}
}
