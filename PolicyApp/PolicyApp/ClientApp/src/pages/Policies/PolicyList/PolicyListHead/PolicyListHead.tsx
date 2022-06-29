import React from "react";
import { useTranslation } from "react-i18next";
import "./PolicyListHead.scss";

const PolicyListHead: React.FC = () => {
  const { t } = useTranslation(["policies"]);
  return (
    <div className="policy-list-head">
      <div>{t("columns.policyNumber")}</div>
      <div>{t("columns.name")}</div>
      <div>{t("columns.age")}</div>
      <div>{t("columns.gender")}</div>
      <div>{t("columns.actions")}</div>
    </div>
  );
};

export default PolicyListHead;
