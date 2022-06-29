import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Policy } from "../../types/policy";
import { ApiStatus } from "../../types/store";
import { initialPolicyState, PolicyListData } from "./policyState";

const policySlice = createSlice({
  name: "policies",
  initialState: initialPolicyState,
  reducers: {
    fetch(state, action: PayloadAction) {
      state.list.status = ApiStatus.LOADING;
    },
    fetchSuccess(state, { payload }: PayloadAction<PolicyListData>) {
      state.list.data = payload;
      state.list.status = ApiStatus.SUCCESS;
    },
    fetchFailure(state, { payload }: PayloadAction<string>) {
      state.list.status = ApiStatus.ERROR;
      state.list.error = payload;
    },

    add(state, action: PayloadAction<Policy>) {
      state.add.status = ApiStatus.LOADING;
      state.add.error = "";
    },
    addSuccess(state, { payload }: PayloadAction) {
      state.add.status = ApiStatus.SUCCESS;
    },
    addFailure(state, { payload }: PayloadAction<string>) {
      state.add.status = ApiStatus.ERROR;
      state.add.error = payload;
    },

    update(state, action: PayloadAction<Policy>) {
      state.update.status = ApiStatus.LOADING;
      state.update.error = "";
    },
    updateSuccess(state, { payload }: PayloadAction) {
      state.update.status = ApiStatus.SUCCESS;
    },
    updateFailure(state, { payload }: PayloadAction<string>) {
      state.update.status = ApiStatus.ERROR;
      state.update.error = payload;
    },

    deletePolicy(state, action: PayloadAction<number>) {
      state.delete.status = ApiStatus.LOADING;
      state.delete.error = "";
    },
    deleteSuccess(state, { payload }: PayloadAction) {
      state.delete.status = ApiStatus.SUCCESS;
    },
    deleteFailure(state, { payload }: PayloadAction<string>) {
      state.delete.status = ApiStatus.ERROR;
      state.delete.error = payload;
    },
  },
});

export const {
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
} = policySlice.actions;

export default policySlice.reducer;
