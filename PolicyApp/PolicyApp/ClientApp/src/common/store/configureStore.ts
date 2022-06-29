import { configureStore, PreloadedState } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { initialPolicyState } from "./policy/policyState";
import rootReducer, { RootState } from "./rootReducer";
import rootSaga from "./rootSaga";

const initialState: RootState = {
  policy: initialPolicyState,
};

const sagaMiddleware = createSagaMiddleware();

export const getStore = (
  preloadedState: PreloadedState<RootState> = initialState
) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleWares) =>
      getDefaultMiddleWares({ serializableCheck: false }).concat(
        sagaMiddleware
      ),
  });
};

export const store = getStore();

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
