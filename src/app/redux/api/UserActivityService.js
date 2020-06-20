import HttpService from "../httpService";
import { get } from "axios";

class UserActivityService extends HttpService {
  config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${
        JSON.parse(this.loadToken())
          ? JSON.parse(this.loadToken()).accessToken
          : null
      }`,
    },
  };

  async getAllActivity() {
    return get(`${this.BASE_URL}/user-activity`, this.config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return {
          err,
        };
      });
  }
}

export default UserActivityService;
