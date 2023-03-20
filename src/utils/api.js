const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, configFunc, headers }) {
    this._baseUrl = baseUrl;
    this._configFunc = configFunc;
    this._headers = headers;
  }

  getPostsList() {
    return fetch(`${this._baseUrl}/posts`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }

  search(searchQuery) {
    return fetch(`${this._baseUrl}/posts/search?query=${searchQuery}`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-9/',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2QxYmM1ODU5Yjk4YjAzOGY3N2FiZTQiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzkxODcyMjgsImV4cCI6MTcxMDcyMzIyOH0.1XyGJixnaIW0oiF1p_VnvSpg0Vq_AnPSy3ci9RItwQU',
  },
};

const api = new Api(config);

export default api;
