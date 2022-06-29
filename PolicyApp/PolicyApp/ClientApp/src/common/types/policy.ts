export enum Gender {
  Male,
  Female,
}

export type PolicyHolder = {
  name: string;
  age: number;
  gender: Gender;
};

export type Policy = {
  policyNumber: number;
  policyHolder: PolicyHolder;
};
