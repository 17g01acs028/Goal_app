import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer  from "./features/auth.ts"
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer
})

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})


export const persistor = persistStore(store);

export const useAppDispatch:()=> typeof store.dispatch =useDispatch;

export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;