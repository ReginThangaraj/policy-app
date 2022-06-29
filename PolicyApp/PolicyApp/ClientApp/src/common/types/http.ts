export class ApiResult<T = void> {
  public value?: T;
  public error?: string;
  public statusCode?: number;

  public get hasError(): boolean {
    return this.error ? this.error.length > 0 : false;
  }

  constructor(value?: T, status?: number, error?: string) {
    this.value = value;
    this.statusCode = status;
    this.error = error;
  }
}

export const endpoints = {
  policies: "/api/policies/",
};
