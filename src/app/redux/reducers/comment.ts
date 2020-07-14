import { CreateCommentAction, Comment, Action } from "../actions";

const initialState = {
  comments: [] as Comment[],
};

export const commentsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "CREATE_COMMENT":
      let newComments = state.comments.push(action.payload);
      return {
        ...state,
        comments: newComments,
      };
    default:
      return state;
  }
};
