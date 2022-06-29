import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../common/store";
import { add, update } from "../../../common/store/policy/policySlice";
import { Policy } from "../../../common/types/policy";
import { FormMode } from "../../../common/types/form";
import Backdrop from "../../../common/components/Backdrop/Backdrop";
import IconButton from "../../../common/components/IconButton/IconButton";
import { IcClose } from "../../../assets/icons";
import { object, number, string } from "yup";
import "./PolicyForm.scss";

type PolicyFormData = {
  policyNumber: string;
  name: string;
  age: string;
  gender: number;
};

type PolicyFormProps = {
  mode: FormMode;
  policy?: Policy;
  onCancel: () => void;
};

const PolicyForm: React.FC<PolicyFormProps> = ({
  mode,
  policy,
  onCancel,
}: PolicyFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["policies"], { keyPrefix: "form" });

  const validationSchema = object({
    policyNumber: number()
      .typeError(t("errors.numberRequired"))
      .min(1, t("errors.policyNumberMin"))
      .max(999999, t("errors.policyNumberMax"))
      .required(t("errors.required")),
    name: string().max(50, t("errors.nameMax")).required(t("errors.required")),
    age: number()
      .typeError(t("errors.numberRequired"))
      .min(1, t("errors.ageMin"))
      .max(99, t("errors.ageMax"))
      .required(t("errors.required")),
    gender: number()
      .min(0, t("errors.required"))
      .max(1, t("errors.required"))
      .required(t("errors.required")),
  });

  const getInitialValues: () => PolicyFormData = () => {
    let initialValues: PolicyFormData;

    if (mode === FormMode.EDIT && policy) {
      initialValues = {
        policyNumber: policy.policyNumber.toString(),
        name: policy.policyHolder.name,
        age: policy.policyHolder.age.toString(),
        gender: policy.policyHolder.gender,
      };
    } else {
      initialValues = { policyNumber: "", name: "", age: "", gender: -1 };
    }

    return initialValues;
  };

  const handleSubmit = (data: PolicyFormData) => {
    const policy: Policy = {
      policyNumber: +data.policyNumber,
      policyHolder: {
        name: data.name,
        age: +data.age,
        gender: +data.gender,
      },
    };

    if (mode === FormMode.ADD) {
      dispatch(add(policy));
    } else {
      dispatch(update(policy));
    }
  };

  return (
    <>
      <Backdrop />
      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        <Form className="policy-form">
          <header className="policy-form__header">
            <h2 className="policy-form__heading">
              {mode === FormMode.ADD ? "Add policy" : "Edit policy"}
            </h2>
            <IconButton src={IcClose} onClick={onCancel} />
          </header>
          <main className="policy-form__body">
            <div
              className="policy-form__field-wrap"
              data-testid="policy-form-number"
            >
              <label htmlFor="policyNumber">{t("policyNumber")}</label>
              <Field
                name="policyNumber"
                id="policyNumber"
                type="text"
                disabled={mode === FormMode.EDIT}
                className="policy-form__field"
              />
              <ErrorMessage
                name="policyNumber"
                component="div"
                className="policy-form__error"
              />
            </div>

            <div
              className="policy-form__field-wrap"
              data-testid="policy-form-name"
            >
              <label htmlFor="name">{t("name")}</label>
              <Field
                name="name"
                id="name"
                type="text"
                className="policy-form__field"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="policy-form__error"
              />
            </div>

            <div
              className="policy-form__field-wrap"
              data-testid="policy-form-age"
            >
              <label htmlFor="age">{t("age")}</label>
              <Field
                name="age"
                id="age"
                type="text"
                className="policy-form__field"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="policy-form__error"
              />
            </div>

            <div
              className="policy-form__field-wrap"
              data-testid="policy-form-gender"
            >
              <label htmlFor="gender">{t("gender")}</label>
              <Field
                name="gender"
                id="gender"
                as="select"
                className="policy-form__field"
              >
                <option value="-1">-</option>
                <option value="0">{t("genderMale")}</option>
                <option value="1">{t("genderFemale")}</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="policy-form__error"
              />
            </div>
          </main>
          <footer className="policy-form__footer">
            <button type="submit" className="button button--primary">
              {t("save")}
            </button>
            <button type="button" className="button" onClick={onCancel}>
              {t("cancel")}
            </button>
          </footer>
        </Form>
      </Formik>
    </>
  );
};

export default PolicyForm;
