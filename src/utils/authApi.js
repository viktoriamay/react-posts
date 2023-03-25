const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, configFunc, headers }) {
    this._baseUrl = baseUrl;
    this._configFunc = configFunc;
    this._headers = headers;
  }

  login(dataUser ) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser)
    }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-9',
  headers: {
    'content-type': 'application/json',
  },
};

export const authApi = new Api(config);

