class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _setToken = (token) => {
    this._headers.authorization = `Bearer ${token}`;
  };

  _getResponseData = (res) => {
    if (res.ok) {
      return res.json().then((res) => res.data);
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  authorize = () => {
    const token = localStorage.getItem("token");
    if (token) {
      this._setToken(token);
      return this.getUserInfo()
        .then((user) => user)
        .catch((e) => Promise.reject(`Ошибка сохраненного токена: ${e}`));
    }
    return Promise.reject(`Токен не найден в локальном хранилище`);
  };

  logout = () => {
    localStorage.removeItem("token");
  };

  register = (email, password) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponseData);
  };

  login = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.ok) {
        return res
          .json()
          .then(({ token }) => {
            localStorage.setItem("token", token);
            this._setToken(token);
          })
          .catch((e) => console.log(e));
      }
      return Promise.reject(`Ошибка входа: ${res.status}`);
    });
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  };

  setUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._getResponseData);
  };

  setUserAvatar = (avatarSrc) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatarSrc }),
    }).then(this._getResponseData);
  };

  addCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._getResponseData);
  };

  removeCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  };

  addLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  };

  removeLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  };

  changeLikeCardStatus = (id, toIsLiked) => {
    if (toIsLiked) {
      return this.addLike(id);
    }
    return this.removeLike(id);
  };
}

export default new Api({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
