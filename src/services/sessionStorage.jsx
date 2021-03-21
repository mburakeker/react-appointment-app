  
export const SessionStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    function _setAccessToken(tokenObj) {
      sessionStorage.setItem('access_token', tokenObj);
    }
    function _setRefreshToken(tokenObj) {
      sessionStorage.setItem('refresh_token', tokenObj);
    }
    function _getAccessToken() {
      return sessionStorage.getItem('access_token');
    }
    function _getRefreshToken() {
      return sessionStorage.getItem('refresh_token');
    }
    function _clearToken() {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
    }
   return {
      getService : _getService,
      setAccessToken: _setAccessToken,
      getAccessToken : _getAccessToken,
      clearToken : _clearToken
    }
   })();
   export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('state');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
  }
  
  export const saveState = (state) => {
  try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('state',serializedState);
  } catch (error) {
    console.log(error)
  }
  }