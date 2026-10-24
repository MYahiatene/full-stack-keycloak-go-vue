import {describe, expect, it, vi} from 'vitest'
import {executeRequest} from "./httpClient";

const {updateTokenSpy} = vi.hoisted(() => ({updateTokenSpy: vi.fn()}))
vi.mock('./useKeycloak', () => ({useKeycloak: () => ({updateToken: updateTokenSpy})}))

describe('httpClient', () => {

  describe('executeRequest', () => {

    it('should call execute request and its dependencies', () => {
      vi.spyOn(window, 'fetch').mockResolvedValue(undefined as unknown as Response)
      const testUrl: URL = new URL('http://localhost:8088/testurl/')
      executeRequest(testUrl)

      expect(updateTokenSpy).toHaveBeenCalled()
      expect(fetch).toHaveBeenCalled()
      // TODO:
      //expect(fetch).toHaveBeenCalledWith()
    });


  });

});
