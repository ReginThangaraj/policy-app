import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";
import { PolicyApi } from "../../api/PolicyApi";
import { ApiResult } from "../../types/http";
import { Policy } from "../../types/policy";
import {
  fetch,
  fetchSuccess,
  fetchFailure,
  add,
  addSuccess,
  addFailure,
  update,
  updateSuccess,
  updateFailure,
  deletePolicy,
  deleteSuccess,
  deleteFailure,
} from "./policySlice";
import { PolicyListData } from "./policyState";

const fetchPolicies = function* (action: PayloadAction) {
  const result: ApiResult<PolicyListData> = yield PolicyApi.get();

  if (result.hasError) {
    yield put<PayloadAction<string>>({
      type: fetchFailure.type,
      payload: result.error || "",
    });
  } else if (result.value) {
    yield put<PayloadAction<PolicyListData>>({
      type: fetchSuccess.type,
      payload: result.value,
    });
  }
};

export const fetchPoliciesWatch = function* () {
  yield takeLatest(fetch, fetchPolicies);
};

const addPolicy = function* (action: PayloadAction<Policy>) {
  const result: ApiResult<never> = yield PolicyApi.add(action.payload);

  if (result.hasError) {
    yield put<PayloadAction<string>>({
      type: addFailure.type,
      payload: result.error || "",
    });
  } else {
    yield put<PayloadAction>({
      type: addSuccess.type,
      payload: undefined,
    });
  }
};

export const addPolicyWatch = function* () {
  yield takeLatest(add, addPolicy);
};

const updatePolicy = function* (action: PayloadAction<Policy>) {
  const result: ApiResult<never> = yield PolicyApi.update(action.payload);

  if (result.hasError) {
    yield put<PayloadAction<string>>({
      type: updateFailure.type,
      payload: result.error || "",
    });
  } else {
    yield put<PayloadAction>({
      type: updateSuccess.type,
      payload: undefined,
    });
  }
};

export const updatePolicyWatch = function* () {
  yield takeLatest(update, updatePolicy);
};

const doDeletePolicy = function* (action: PayloadAction<number>) {
  const result: ApiResult<never> = yield PolicyApi.delete(action.payload);

  if (result.hasError) {
    yield put<PayloadAction<string>>({
      type: deleteFailure.type,
      payload: result.error || "",
    });
  } else {
    yield put<PayloadAction>({
      type: deleteSuccess.type,
      payload: undefined,
    });
  }
};

export const deletePolicyWatch = function* () {
  yield takeLatest(deletePolicy, doDeletePolicy);
};
