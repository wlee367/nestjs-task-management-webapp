import { Dispatch } from "redux";
import CommentService from "../api/CommentService";

export interface commentUser {
    id: string;
    username: string;
}

export interface Comment {
  id: string;
  commentText: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  taskId: string;
  user: commentUser;
}

export interface FetchCommentAction {
  type: "FETCH_COMMENTS";
  payload: Comment[];
}

export interface CreateCommentAction {
  type: "CREATE_COMMENT";
  payload: Comment;
}

let commentService = new CommentService();

export const createCommentOnTask = (commentText: string, taskId: string) => {
  return async (dispatch: Dispatch) => {
    commentService.createComment(taskId, commentText).then((response) => {
      console.log(response.data);
      dispatch<CreateCommentAction>({
        type: "CREATE_COMMENT",
        payload: response.data,
      });
    });
  };
};
