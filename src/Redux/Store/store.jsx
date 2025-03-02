import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/user.slice";
import modalReducer from "../Slice/modal.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sessionModal: modalReducer,
  },
});

export default store;
