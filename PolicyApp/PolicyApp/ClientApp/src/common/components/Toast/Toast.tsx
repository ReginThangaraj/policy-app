import React, { useEffect } from "react";
import {
  IcClose,
  IcError,
  IcInfo,
  IcSuccess,
  IcWarning,
} from "../../../assets/icons";
import { ToastType } from "../../types/ui";
import IconButton from "../IconButton/IconButton";
import "./Toast.scss";

const TOAST_TIME_OUT = 3000;

type ToastProps = {
  type: ToastType;
  message: string;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({
  type,
  message,
  onClose,
}: ToastProps) => {
  // Close toast automatically after timeout period.
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, TOAST_TIME_OUT);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getStatusIcon = () => {
    let icon;
    switch (type) {
      case ToastType.SUCCESS:
        icon = IcSuccess;
        break;
      case ToastType.ERROR:
        icon = IcError;
        break;
      case ToastType.WARNING:
        icon = IcWarning;
        break;
      case ToastType.INFO:
        icon = IcInfo;
        break;
    }
    return icon;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="toast">
      <div className="toast__content">
        <StatusIcon />
        <div className="toast__message">{message}</div>
      </div>
      <IconButton src={IcClose} className="toast__close" onClick={onClose} />
    </div>
  );
};

export default Toast;
