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
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import toolkitSliceTimer from "./toolkitSliceTimer";
import toolkitSliceTimeOuts from "./toolkitSliceTimeOuts";
import toolkitSliceStatistic from "./toolkitSliceStatistic";
import toolkitSliceNotification from "./toolkitSliceNotification";

const rootReducer = combineReducers({
  timer: toolkitSliceTimer,
  timeouts: toolkitSliceTimeOuts,
  notifications: toolkitSliceNotification,
  statistic: toolkitSliceStatistic,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
