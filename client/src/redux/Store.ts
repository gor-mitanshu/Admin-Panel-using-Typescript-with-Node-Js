import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./combineReducer";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["LoginAuthReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
const persistor = persistStore(store);

export { store, persistor };
