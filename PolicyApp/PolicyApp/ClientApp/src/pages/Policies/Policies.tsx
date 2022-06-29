import React, { useEffect, useState } from "react";
import PolicyList from "./PolicyList/PolicyList";
import { deletePolicy, fetch } from "../../common/store/policy/policySlice";
import { useAppDispatch, useAppSelector } from "../../common/store";
import { ApiStatus } from "../../common/types/store";
import PolicyForm from "./PolicyForm/PolicyForm";
import { FormMode } from "../../common/types/form";
import { Policy } from "../../common/types/policy";
import { useTranslation } from "react-i18next";
import { ToastDetails, ToastType } from "../../common/types/ui";
import Toast from "../../common/components/Toast/Toast";
import Confirmation from "../../common/components/Confirmation/Confirmation";
import "./Policies.scss";

const Policies: React.FC = () => {
  const dispatch = useAppDispatch();

  const policyListData = useAppSelector((store) => store.policy.list.data);
  const addStatus = useAppSelector((store) => store.policy.add.status);
  const updateStatus = useAppSelector((store) => store.policy.update.status);
  const deleteStatus = useAppSelector((store) => store.policy.delete.status);

  const [showForm, setShowForm] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<FormMode>(FormMode.ADD);
  const [policyToEdit, setPolicyToEdit] = useState<Policy>();
  const [policyToDelete, setPolicyToDelete] = useState<number>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>();
  const [toast, setToast] = useState<ToastDetails>({
    show: false,
    type: ToastType.SUCCESS,
    message: "",
  });

  const { t } = useTranslation(["policies"]);

  useEffect(() => {
    dispatch(fetch());
  }, []);

  useEffect(() => {
    // Refresh list after adding an item
    if (addStatus === ApiStatus.SUCCESS) {
      setToast({
        show: true,
        type: ToastType.SUCCESS,
        message: t("addSuccess"),
      });
      hideFormAndRefreshList();
    } else if (addStatus === ApiStatus.ERROR) {
      setToast({
        show: true,
        type: ToastType.ERROR,
        message: t("saveFailed"),
      });
    }
  }, [addStatus]);

  useEffect(() => {
    // Refresh list after updating an item
    if (updateStatus === ApiStatus.SUCCESS) {
      setToast({
        show: true,
        type: ToastType.SUCCESS,
        message: t("updateSuccess"),
      });
      hideFormAndRefreshList();
    } else if (updateStatus === ApiStatus.ERROR) {
      setToast({
        show: true,
        type: ToastType.ERROR,
        message: t("saveFailed"),
      });
    }
  }, [updateStatus]);

  useEffect(() => {
    // Refresh list after deleting an item
    if (deleteStatus === ApiStatus.SUCCESS) {
      setToast({
        show: true,
        type: ToastType.SUCCESS,
        message: t("deleteSuccess"),
      });
      dispatch(fetch());
    } else if (deleteStatus === ApiStatus.ERROR) {
      setToast({
        show: true,
        type: ToastType.ERROR,
        message: t("deleteFailed"),
      });
    }
  }, [deleteStatus]);

  const hideToast = () => {
    setToast({
      show: false,
      type: ToastType.SUCCESS,
      message: "",
    });
  };

  const hideFormAndRefreshList = () => {
    setShowForm(false);
    dispatch(fetch());
  };

  const handleAdd = () => {
    setFormMode(FormMode.ADD);
    setShowForm(true);
  };

  const handleEdit = (policy: Policy) => {
    setPolicyToEdit(policy);
    setFormMode(FormMode.EDIT);
    setShowForm(true);
    hideToast();
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleToastClose = () => {
    hideToast();
  };

  const handleDelete = (policyNumber: number) => {
    setPolicyToDelete(policyNumber);
    setShowDeleteConfirmation(true);
    hideToast();
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    if (policyToDelete) {
      dispatch(deletePolicy(policyToDelete));
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="policies">
      <div className="policies__head">
        <h1 className="policies__title">{t("heading")}</h1>
        <button onClick={handleAdd} className="button button--primary">
          {t("addPolicy")}
        </button>
      </div>
      <PolicyList
        policies={policyListData.policies}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showForm && (
        <PolicyForm
          mode={formMode}
          policy={policyToEdit}
          onCancel={handleFormCancel}
        />
      )}

      {showDeleteConfirmation && (
        <Confirmation
          heading={t("deleteConfirmation.heading")}
          message={t("deleteConfirmation.message")}
          confirmButtonLabel={t("deleteConfirmation.confirmButtonLabel")}
          confirmButtonClassName="button--delete"
          onConfirm={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
        />
      )}

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default Policies;
