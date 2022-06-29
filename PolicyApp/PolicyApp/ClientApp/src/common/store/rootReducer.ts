import { combineReducers } from "redux";
import policy from "./policy/policySlice";

const rootReducer = combineReducers({
  policy,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
