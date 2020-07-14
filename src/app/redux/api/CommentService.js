import HttpService from "../httpService";
import { post } from "axios";
import qs from "querystring";

class CommentService extends HttpService {
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

  async createComment(taskId, commentText) {
    return post(
      `${this.BASE_URL}/comments`,
      qs.stringify({ taskId, commentText }),
      this.config
    )
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

export default CommentService;