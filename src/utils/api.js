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

  changeLikePost(postId, isLike) {
    // console.log(postId);
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      headers: this._headers,
      method: isLike ? 'DELETE' : 'PUT',
    }).then(onResponse);
  }

  getPostById(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }

  getUsers() {
    return fetch(`${this._baseUrl}/users`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }

  getUserById(userId) {
    return fetch(`${this._baseUrl}/users/${userId}`, {
      headers: this._headers,
      method: 'GET',
    }).then(onResponse);
  }


  login(dataUser ) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(dataUser)
    }).then(onResponse);
  }

  addComment(postId, comment ) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(comment)
    }).then(onResponse);
  }

  deleteComment(postId, commentId ) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
      headers: this._headers,
      method: 'DELETE',
    }).then(onResponse);
  }
}

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-9',
  headers: {
    'content-type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2QxYmM1ODU5Yjk4YjAzOGY3N2FiZTQiLCJncm91cCI6Imdyb3VwLTkiLCJpYXQiOjE2NzkxODcyMjgsImV4cCI6MTcxMDcyMzIyOH0.1XyGJixnaIW0oiF1p_VnvSpg0Vq_AnPSy3ci9RItwQU',
  },
};

const api = new Api(config);

export default api;
