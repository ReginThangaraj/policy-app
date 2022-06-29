import React from "react";
import { IcDelete, IcEdit } from "../../../../assets/icons";
import IconButton from "../../../../common/components/IconButton/IconButton";
import { Gender, Policy } from "../../../../common/types/policy";
import "./PolicyListItem.scss";

type PolicyListItemProps = {
  policy: Policy;
  onEdit: () => void;
  onDelete: () => void;
};

const PolicyListItem: React.FC<PolicyListItemProps> = ({
  policy,
  onEdit,
  onDelete,
}: PolicyListItemProps) => {
  const getGender = () => {
    return policy.policyHolder.gender === Gender.Male ? "Male" : "Female";
  };

  return (
    <div className="policy-list-item">
      <div>{policy.policyNumber}</div>
      <div>{policy.policyHolder.name}</div>
      <div>{policy.policyHolder.age}</div>
      <div>{getGender()}</div>
      <div className="policy-list-item__actions">
        <IconButton src={IcEdit} onClick={onEdit} />
        <IconButton src={IcDelete} onClick={onDelete} />
      </div>
    </div>
  );
};

export default PolicyListItem;
