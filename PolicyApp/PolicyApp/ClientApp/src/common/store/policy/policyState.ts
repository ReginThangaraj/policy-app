import { Policy } from "../../types/policy";
import { ApiStatus, State } from "../../types/store";

export type PolicyListData = {
  policies: Policy[];
  totalCount: number;
};

export type PolicyState = {
  list: State<PolicyListData>;
  add: {
    status: ApiStatus;
    error: string;
  };
  update: {
    status: ApiStatus;
    error: string;
  };
  delete: {
    status: ApiStatus;
    error: string;
  };
};

export const initialPolicyState: PolicyState = {
  list: {
    data: {
      policies: [],
      totalCount: 0,
    },
    status: ApiStatus.DEFAULT,
  },
  add: {
    status: ApiStatus.DEFAULT,
    error: "",
  },
  update: {
    status: ApiStatus.DEFAULT,
    error: "",
  },
  delete: {
    status: ApiStatus.DEFAULT,
    error: "",
  },
};
