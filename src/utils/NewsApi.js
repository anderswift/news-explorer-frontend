import { NEWS_API_KEY } from './constants';

class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._apiKey = NEWS_API_KEY;
    this._headers = headers;
  }

  getCardsByKeyword(keyword, numberCards = 100) {
    const params = new URLSearchParams({
      apiKey: this._apiKey,
      pageSize: numberCards,
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

const newsApi = new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
  headers: { 'Content-Type': 'application/json' }
});

export { newsApi as default };
