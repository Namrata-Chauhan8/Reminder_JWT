import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/reducers'; 
import reminderReducer from './reducers/reminderReducer';

const rootReducer = combineReducers({
  loginSignup: loginReducer,
  reminder: reminderReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export default store;