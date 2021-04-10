import { NEWS_API_KEY } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._apiKey = NEWS_API_KEY;
    this._headers = headers;
  }

  getCardsByKeyword(keyword) {
    const params = new URLSearchParams({
      apiKey: this._apiKey,
      pageSize: 10,
      q: keyword
    });
    return fetch(
      `${this._baseUrl}?${params}`,
      { headers: this._headers }
    ).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(new Error(res.status));
    }).then((res) => res.articles);
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  headers: { 'Content-Type': 'application/json' }
});

export { api as default };
