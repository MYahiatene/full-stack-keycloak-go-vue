import * as KeycloakInstance from "@/auth/keycloak.ts";
import {keycloak} from "@/auth/keycloak.ts";


const init = vi.hoisted(() => vi.fn())

vi.mock('keycloak-js', () => ({
  default: vi.fn(function () {
    return {init}
  }),
}))

describe('keycloak', () => {

  it('should initialize keycloak with pkce and login-required', async () => {
    const init = vi.fn().mockResolvedValue(true)

    await KeycloakInstance.initKeycloak()

    expect(keycloak.init).toHaveBeenCalledWith({
      "onLoad": "login-required",
      "pkceMethod": "S256",
    },)
  });
})
