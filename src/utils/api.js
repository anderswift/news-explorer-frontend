import { NEWS_API_KEY, testData } from './constants.js';

class Api {

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._apiKey = NEWS_API_KEY;
    this._headers = headers;
  }
  
  
  getCardsByKeyword(keyword) {
    //return Promise.resolve(() => { return testData; });
    
    return fetch(this._baseUrl + '?' +
      new URLSearchParams({
        apiKey: this._apiKey,
        pageSize: 10,
        q: keyword 
      }), {
      headers: this._headers
    }).then(res => {
      if (res.ok) return res.json();
      else return Promise.reject(`Error: ${res.status}`);
    }).then(res => res.articles);
    
  } 
}

export const api = new Api({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
  headers: {
    "Content-Type": "application/json"
  }
});