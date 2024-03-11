import axios from "axios";
import Cookies from 'js-cookie';



import {
  SERVER_URL,
  LOGIN,
  REGISTER,
  ADD_REMINDER,
  DELETE_REMINDER,
  UPDATE_REMINDER,
  GET_REMINDER
} from "../../constants/Constants";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  ADD_REMINDER_SUCCESS,
  ADD_REMINDER_FAILURE,
  DELETE_REMINDER_SUCCESS,
  DELETE_REMINDER_FAILURE,
  UPDATE_REMINDER_SUCCESS,
  UPDATE_REMINDER_FAILURE,
  GET_REMINDER_SUCCESS,
  GET_REMINDER_FAILURE
} from "../../constants/ActionTypes";

const instance = axios.create({
	withCredentials: true,
	baseURL: 'http://127.0.0.1:5000',
	headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
	credentials: 'include',
})

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await axios.post(`${SERVER_URL}${LOGIN}`, {
        email,
        password,
      },{withCredentials: true });

      if (response && response.data) {
        localStorage.setItem("id", response.data.user._id);
        localStorage.setItem("userData", JSON.stringify(response.data.user));

        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data.user,
        });
      } else {
        console.error("Invalid response from the server");
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Invalid response from the server",
        });
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const signup = (formData) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await axios.post(`${SERVER_URL}${REGISTER}`, formData);
      if (response.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      }
    } catch (error) {
      console.error("Error while signing up the user:", error);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};


export const addReminderAction = (reminderData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${SERVER_URL}${ADD_REMINDER}`,reminderData);
      if (response.status === 200) {
        dispatch({ type: ADD_REMINDER_SUCCESS });
        return response.data; 
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
      dispatch({ type: ADD_REMINDER_FAILURE, payload: error.message });
    }
  };
};



export const deleteReminderAction=(deleteId,userId)=>{
  return async(dispatch)=>{
    try {
      const response=await axios.delete(`${SERVER_URL}${DELETE_REMINDER}${deleteId}`, {data: { id: userId },})
      dispatch({type: DELETE_REMINDER_SUCCESS})
      return response.data;
    } catch (error) {
      console.error("Error adding reminder:", error);
      dispatch({ type: DELETE_REMINDER_FAILURE, payload: error.message });
    }
  };
};


export const getReminderAction=(getId)=>{
  return async (dispatch)=>{
    try {
      const response =await instance.get(`${SERVER_URL}${GET_REMINDER}${getId}`, { withCredentials: true , credentials: 'include'});
      dispatch({type: GET_REMINDER_SUCCESS})
      return response.data.getList;
    } catch (error) {
      console.error("Error fetching reminders:", error);
      dispatch({type: GET_REMINDER_FAILURE, payload: error.message});
      throw error;
    }
  }
}

export const updateReminderAction = (id, data) => {
  return async (dispatch) => {
    try {
      await axios.put(`${SERVER_URL}${UPDATE_REMINDER}${id}`, data);
      dispatch({type: UPDATE_REMINDER_SUCCESS})
      return true
    } catch (error) {
      console.error("Error updating reminder:", error);
      dispatch({type: UPDATE_REMINDER_FAILURE})
      throw error; 
    }
  };
};