class Api {
  constructor(
    options = {
      headers: {
        authorization: "793ccaf5-d27e-4116-b328-f4d0925cd1fb",
        "Content-Type": "application/json",
      },
    }
  ) {
    this._baseUrl = "https://around.nomoreparties.co/v1/web_es_cohort_02/";
    this._options = options;
  }

  _fetchData() {
    return fetch(this._baseUrl + this._specificUrl, this._options)
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUserInfo() {
    this._specificUrl = "users/me";
    this._options.method = "GET";
    delete this._options.body;
    return this._fetchData();
  }

  toggleLikeBtn(id, isLiked) {
    this._specificUrl = `/cards/likes/${id} `;
    this._options.method = isLiked ? "DELETE" : "PUT";
    delete this._options.body;
    return this._fetchData();
  }

  deleteCard(id) {
    this._specificUrl = `/cards/${id} `;
    this._options.method = "DELETE";
    delete this._options.body;
    return this._fetchData().then(() => id);
  }

  setNewPlace(data) {
    this._specificUrl = "/cards";
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: data.newPlaceCaption,
      link: data.newPlace,
    });
    return this._fetchData();
  }

  changeUserInfo(data) {
    this._specificUrl = "users/me";
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({
      name: data.name,
      about: data.about,
    });
    return this._fetchData();
  }

  getInitialCards() {
    this._specificUrl = "cards";
    this._options.method = "GET";
    delete this._options._body;
    return this._fetchData();
  }

  setProfilePic(data) {
    this._specificUrl = "users/me/avatar";
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({ avatar: data.avatar });
    return this._fetchData();
  }
}

export default new Api();
