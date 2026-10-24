import {useKeycloak} from "./useKeycloak";
import {keycloak} from "@/auth/keycloak.ts";

const {updateToken} = useKeycloak()

function getBearerToken(): string {
  return keycloak.token ? `Bearer ${keycloak.token}` : ''
}

//TODO: Tests
export async function executeRequest(url: URL): Promise<Response> {
  updateToken();
  const bearerToken: string = getBearerToken();


  const headers = new Headers();
  headers.set('Authorization', bearerToken)

  const options: RequestInit = {headers}
  const request: Request = new Request(url, options)

  return await fetch(request);
}
