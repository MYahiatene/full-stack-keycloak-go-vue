import {keycloak} from "@/auth/keycloak.ts";
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
