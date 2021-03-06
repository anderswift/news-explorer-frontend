import { RESPONSE_MSG } from './constants.js';

class MainApi {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  checkToken(token) {
    this._headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
    return fetch(this._baseUrl + 'users/me', {
      method: 'GET',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    })
  }
  
  
  login(data) {
    return fetch(this._baseUrl + 'signin', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) return res.json();
      if (res.status === 401) return Promise.reject(RESPONSE_MSG.incorrectLogin);
      if (res.status === 400) return Promise.reject(RESPONSE_MSG.registrationValidationError);
      if (res.status === 500) return Promise.reject(RESPONSE_MSG.serverError);
      return Promise.reject(RESPONSE_MSG.connectionFailed);
    })
    .then(data => {
      localStorage.setItem('jwt', data.token);
      return this.checkToken(data.token);
    });  
  }
  
  
  register(credentials) {
    return fetch(this._baseUrl + 'signup', {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(credentials)
    })
    .then(res => {
      if (res.ok) return res.json();
      if (res.status === 409) return Promise.reject(RESPONSE_MSG.accountExists);
      if (res.status === 400) return Promise.reject(RESPONSE_MSG.registrationValidationError);
      if (res.status === 500) return Promise.reject(RESPONSE_MSG.serverError);
      return Promise.reject(RESPONSE_MSG.connectionFailed);
    }); 
  }
}

const api = new MainApi({
  baseUrl: "http://localhost:3001/",
  headers: { "Content-Type": "application/json" }
});

export { api as default };
