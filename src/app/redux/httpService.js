import axios from "axios";

export default class HttpService {
  BASE_URL = "http://localhost:3001";
  _accessToken = null;

  async get(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .get(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error));
  }

  async post(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .post(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  async delete(endpoint, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .delete(`${this.BASE_URL}/${endpoint}`, options)
      .catch((error) => this._handleHttpError(error));
  }

  async patch(endpoint, data = {}, options = {}) {
    Object.assign(options, this._getCommonOptions());
    return axios
      .patch(`${this.BASE_URL}/${endpoint}`, data, options)
      .catch((error) => this._handleHttpError(error));
  }

  _handleHttpError(error) {
    const { statusCode } = error.response.data;

    if (statusCode !== 401) {
      throw error;
    } else {
      return this._handle401();
    }
  }

  _handle401() {
    // this.routerStore.push('/signin');
  }

  _getCommonOptions() {
    const token = this.loadToken();

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  get accessToken() {
    return this._accessToken ? this._accessToken : this.loadToken();
  }

  saveUser(accessToken, username) {
    this._accessToken = accessToken;
    return localStorage.setItem(
      "user",
      JSON.stringify({ accessToken, username })
    );
  }

  loadToken() {
    const token = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    this._accessToken = token ? token.accessToken : null;
    return token;
  }

  removeToken() {
    localStorage.removeItem("user");
  }
}
