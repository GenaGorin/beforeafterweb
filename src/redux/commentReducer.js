import { GET_COMMENTS, SEND_COMMENT, SET_COMMENT_LIKE } from "./types";

const initialState = {
  comments: [],
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return { ...state, comments: [...state.comments, ...action.payload] };
    case SEND_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case SET_COMMENT_LIKE:
      let comments = state.comments.map((comment) => {
        if (comment.id === action.payload) {
          comment.likes = comment.likes + 1;
          return comment;
        } else {
          return comment;
        }
      });

      return { ...state, comments: comments };
    default:
      return state;
  }
};
