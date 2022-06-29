import React from "react";
import { useTranslation } from "react-i18next";
import { IcClose } from "../../../assets/icons";
import Backdrop from "../Backdrop/Backdrop";
import IconButton from "../IconButton/IconButton";
import "./Confirmation.scss";

type ConfirmationProps = {
  heading: string;
  message: string;
  confirmButtonLabel: string;
  cancelButtonLabel?: string;
  confirmButtonClassName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({
  heading,
  message,
  confirmButtonLabel,
  cancelButtonLabel = "",
  confirmButtonClassName = "",
  onConfirm,
  onCancel,
}: ConfirmationProps) => {
  const { t } = useTranslation(["common"]);
  const cancelLabel = cancelButtonLabel ? cancelButtonLabel : t("cancel");

  return (
    <>
      <Backdrop />
      <section className="confirmation">
        <header className="confirmation__header">
          <h2 className="confirmation__heading">{heading}</h2>
          <IconButton src={IcClose} onClick={onCancel} />
        </header>
        <main className="confirmation__body">{message}</main>
        <footer className="confirmation__footer">
          <button
            type="button"
            className={`button ${confirmButtonClassName}`}
            onClick={onConfirm}
          >
            {confirmButtonLabel}
          </button>
          <button type="button" className="button" onClick={onCancel}>
            {cancelLabel}
          </button>
        </footer>
      </section>
    </>
  );
};

export default Confirmation;
