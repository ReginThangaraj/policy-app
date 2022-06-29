import { all } from "redux-saga/effects";
import {
  fetchPoliciesWatch,
  addPolicyWatch,
  updatePolicyWatch,
  deletePolicyWatch,
} from "./policy/policySaga";

export default function* rootSaga() {
  yield all([
    fetchPoliciesWatch(),
    addPolicyWatch(),
    updatePolicyWatch(),
    deletePolicyWatch(),
  ]);
}
