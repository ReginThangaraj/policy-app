import axios, { AxiosError, AxiosResponse } from "axios";
import { PolicyListData } from "../store/policy/policyState";
import { ApiResult, endpoints } from "../types/http";
import { Policy } from "../types/policy";

export class PolicyApi {
  public static async get(): Promise<ApiResult<PolicyListData>> {
    let data: PolicyListData = {
      policies: [],
      totalCount: 0,
    };
    let status: number | undefined;
    let error = "";

    await axios
      .get(endpoints.policies)
      .then((res: AxiosResponse) => {
        data.policies = res.data;
        data.totalCount = data.policies.length; //TODO: API to return total count for pagination.
        status = res.status;
      })
      .catch((err: AxiosError) => {
        status = err.response?.status;
        error = err.message;
      });

    return new ApiResult<PolicyListData>(data, status, error);
  }

  public static async add(policy: Policy): Promise<ApiResult> {
    let status: number | undefined;
    let error = "";

    await axios
      .post(endpoints.policies, policy)
      .then((res: AxiosResponse) => {
        status = res.status;
      })
      .catch((err: AxiosError) => {
        status = err.response?.status;
        error = err.message;
      });

    return new ApiResult(undefined, status, error);
  }

  public static async update(policy: Policy): Promise<ApiResult> {
    let status: number | undefined;
    let error = "";

    await axios
      .put(endpoints.policies, policy)
      .then((res: AxiosResponse) => {
        status = res.status;
      })
      .catch((err: AxiosError) => {
        status = err.response?.status;
        error = err.message;
      });

    return new ApiResult(undefined, status, error);
  }

  public static async delete(policyNumber: number): Promise<ApiResult> {
    let status: number | undefined;
    let error = "";

    await axios
      .delete(endpoints.policies + policyNumber)
      .then((res: AxiosResponse) => {
        status = res.status;
      })
      .catch((err: AxiosError) => {
        status = err.response?.status;
        error = err.message;
      });

    return new ApiResult(undefined, status, error);
  }
}
