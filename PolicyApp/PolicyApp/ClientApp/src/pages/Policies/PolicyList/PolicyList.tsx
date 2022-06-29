import React from "react";
import { Policy } from "../../../common/types/policy";
import PolicyListItem from "./PolicyListItem/PolicyListItem";
import PolicyListHead from "./PolicyListHead/PolicyListHead";
import "./PolicyList.scss";

type PolicyListProps = {
  policies: Policy[];
  onEdit: (policy: Policy) => void;
  onDelete: (policyNumber: number) => void;
};

const PolicyList: React.FC<PolicyListProps> = ({
  policies,
  onEdit,
  onDelete,
}: PolicyListProps) => {
  return (
    <div className="policy-list">
      <PolicyListHead />
      {policies.map((item) => (
        <PolicyListItem
          key={item.policyNumber}
          policy={item}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.policyNumber)}
        />
      ))}
    </div>
  );
};

export default PolicyList;
