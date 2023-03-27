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
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  search(searchQuery) {
    return fetch(`${this._baseUrl}/posts/search?query=${searchQuery}`, {
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  changeLikePost(postId, isLike) {
    // console.log(postId);
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      ...this._configFunc(),
      method: isLike ? 'DELETE' : 'PUT',
    }).then(onResponse);
  }

  getPostById(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  getUsers() {
    return fetch(`${this._baseUrl}/users`, {
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  getUserById(userId) {
    return fetch(`${this._baseUrl}/users/${userId}`, {
      ...this._configFunc(),
      method: 'GET',
    }).then(onResponse);
  }

  login(dataUser) {
    return fetch(`${this._baseUrl}/signin`, {
      ...this._configFunc(),
      method: 'POST',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  addComment(postId, comment) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      ...this._configFunc(),
      method: 'POST',
      body: JSON.stringify(comment),
    }).then(onResponse);
  }

  deleteComment(postId, commentId) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
      ...this._configFunc(),
      method: 'DELETE',
    }).then(onResponse);
  }

  editUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      ...this._configFunc(),
      method: 'PATCH',
      body: JSON.stringify(dataUser),
    }).then(onResponse);
  }

  editUserAvatar(body) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      ...this._configFunc(),
      method: 'PATCH',
      body: JSON.stringify(body)
    }).then(onResponse);
  }

  addPost(newPost) {
    return fetch(`${this._baseUrl}/posts`, {
      ...this._configFunc(),
      method: 'POST',
      body: JSON.stringify(newPost)
    }).then(onResponse);
  }

  deletePost(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      ...this._configFunc(),
      method: 'DELETE',
    }).then(onResponse);
  }
}

const configFunc = () => {
  return {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
};

const config = {
  baseUrl: 'https://api.react-learning.ru/v2/group-9',
  headers: {
    'content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  configFunc: configFunc,
};

const api = new Api(config);

export default api;
