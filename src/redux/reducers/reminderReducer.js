import {
  ADD_REMINDER_SUCCESS,
  ADD_REMINDER_FAILURE,
  DELETE_REMINDER_SUCCESS,
  DELETE_REMINDER_FAILURE,
  GET_REMINDER_SUCCESS,
  GET_REMINDER_FAILURE,
  UPDATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_FAILURE,
} from "../../constants/ActionTypes.js";

const initialState = {
  reminders: [],
  loading: false,
  error: null,
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_REMINDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_REMINDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_REMINDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case UPDATE_REMINDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPDATE_REMINDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_REMINDER_SUCCESS:
      return {
        ...state,
        reminders: action.reminders,
        loading: false,
      };
    case GET_REMINDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reminderReducer;
