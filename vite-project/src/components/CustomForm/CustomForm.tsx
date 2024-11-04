import { useEffect, useState } from "react";
import TextFormInput from "../TextFormInput/TextFormInput";
import styles from "./CustomForm.module.css";
import CategoryFormInput from "../CategoryFormInput/CategoryFormInput";
import ErrorMessage from "../ErrorMessage/ErrorMesage";
import CheckboxFormInput from "../CheckboxFormInput/CheckboxFormInput";
import Icon, { IconName } from "../Icon/Icon";

export type FormInputProps =
  | {
      inputType: "text";
      id: string;
      name: string;
      type: string;
      required: boolean;
      index: number;
    }
  | {
      inputType: "category";
      id: string;
      required: boolean;
      index: number;
    }
  | {
      inputType: "checkbox";
      id: string;
      name: string;
      index: number;
    };

type OnSubmitResult =
  | {
      success: false;
      errorMessage: string;
    }
  | {
      success: true;
      newValues: string[];
      newBooleans: boolean[];
    };

interface Props {
  initialFormValues: string[];
  initialFormBooleans: boolean[];
  onSubmit: (values: string[], booleans: boolean[]) => OnSubmitResult;
  formInputLines: FormInputProps[][];
  categories: string[];
  submitButtonName: string;
  timeEntryId: string | null;
  submitButtonIcon: IconName;
}

function CustomForm(props: Props) {
  const {
    initialFormValues,
    initialFormBooleans,
    onSubmit,
    formInputLines,
    categories,
    submitButtonName,
    timeEntryId,
    submitButtonIcon,
  } = props;
  const [formValues, setFormValues] = useState<string[]>([]);
  const [formBooleans, setFormBooleans] = useState<boolean[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setFormValues([...initialFormValues]);
    setFormBooleans([...initialFormBooleans]);
  }, [timeEntryId]);
  function setFormValue(index: number) {
    return (newValue: string) => {
      setFormValues((prevFormValues) =>
        prevFormValues.map((oldValue, i) => (i === index ? newValue : oldValue))
      );
    };
  }
  function setFormBoolean(index: number) {
    return (newValue: boolean) => {
      setFormBooleans((prevFormBooleans) =>
        prevFormBooleans.map((oldValue, i) =>
          i === index ? newValue : oldValue
        )
      );
    };
  }
  function handleSubmit() {
    const submitResult = onSubmit(formValues, formBooleans);
    if (submitResult.success) {
      setErrorMessage("");
      setFormValues(submitResult.newValues);
      setFormBooleans(submitResult.newBooleans);
    } else {
      setErrorMessage(submitResult.errorMessage);
    }
  }
  return (
    <>
      <form id={styles.form}>
        {formInputLines.map((formInputLine, i) => (
          <div className={styles.formLine} key={i} tabIndex={0}>
            {formInputLine.map((formInput) => {
              if (formInput.inputType === "text")
                return (
                  <TextFormInput
                    id={formInput.id}
                    name={formInput.name}
                    type={formInput.type}
                    required={formInput.required}
                    initialValue={formValues[formInput.index]}
                    onChange={setFormValue(formInput.index)}
                    key={formInput.id}
                  />
                );
              else if (formInput.inputType === "category")
                return (
                  <CategoryFormInput
                    id={formInput.id}
                    categories={categories}
                    required={formInput.required}
                    initialCategory={formValues[formInput.index]}
                    onChange={setFormValue(formInput.index)}
                    key={formInput.id}
                  />
                );
              else if (formInput.inputType === "checkbox")
                return (
                  <CheckboxFormInput
                    id={formInput.id}
                    name={formInput.name}
                    initialValue={formBooleans[formInput.index]}
                    onChange={setFormBoolean(formInput.index)}
                    key={formInput.id}
                  />
                );
              else return null;
            })}
          </div>
        ))}
        <button id={styles.submitButton} onClick={handleSubmit} type="button">
          <Icon iconName={submitButtonIcon} />
          <p style={{ fontSize: "1rem" }}>&nbsp;{submitButtonName}</p>
        </button>
      </form>
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default CustomForm;
