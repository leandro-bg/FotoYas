import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  first_name: "",
  second_name: "",
  first_last_name: "",
  second_last_name: "",
  email: "",
  number_phone: "",
  document: "",
  password_hash: "",
  is_confirmed: false,
  is_active: false,
  is_enable_temp_pass: false,
  profile_id: "",
  type_document_id: "",
  created_at: "",
  updated_at: "",
  token: "",
  refresh_token: "",
  credits: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
