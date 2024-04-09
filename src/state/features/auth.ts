import { createSlice } from "@reduxjs/toolkit";

export interface Auth{
  
mode:string,
user:string,
token:string

}

const initialState:Auth = {
  mode: "light",
  user: "",
  token: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = "any";
      state.token = "";
    },
  },
});

export const { setMode, setLogin, setLogout } =
  AuthSlice.actions;
export default AuthSlice.reducer;
