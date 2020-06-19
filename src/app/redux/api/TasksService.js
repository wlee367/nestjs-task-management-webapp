import HttpService from "../httpService";
import { post, get, patch } from "axios";
import qs from "querystring";

class TasksService extends HttpService {
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

  // grabs all tasks that belong to the user.
  async getAllTasks() {
    return get(`${this.BASE_URL}/tasks`, this.config)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return {
          err,
        };
      });
  }

  // grabs a singular task by id.
  async getTaskById(taskId) {
    return get(`${this.BASE_URL}/tasks/${taskId}`)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return {
          err,
        };
      });
  }

  // updates a single task
  async updateTask(taskId, status) {
    return patch(
      `${this.BASE_URL}/tasks/${taskId}/status`,
      qs.stringify({ status }),
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

  // creates a task.
  async createTask(title, description) {
    return post(
      `${this.BASE_URL}/tasks`,
      qs.stringify({ title, description }),
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

export default TasksService;
