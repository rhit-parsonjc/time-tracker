import { useEffect, useState } from "react";
import TextFormInput from "../TextFormInput/TextFormInput";
import styles from "./CustomForm.module.css";
import CategoryFormInput from "../CategoryFormInput/CategoryFormInput";
import ErrorMessage from "../ErrorMessage/ErrorMesage";

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
    };

type OnSubmitResult =
  | {
      success: false;
      errorMessage: string;
    }
  | {
      success: true;
      newValues: string[];
    };

interface Props {
  initialFormValues: string[];
  onSubmit: (values: string[]) => OnSubmitResult;
  formInputLines: FormInputProps[][];
  categories: string[];
  submitButtonName: string;
  timeEntryId: string | null;
}

function CustomForm(props: Props) {
  const {
    initialFormValues,
    onSubmit,
    formInputLines,
    categories,
    submitButtonName,
    timeEntryId,
  } = props;
  const [formValues, setFormValues] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setFormValues([...initialFormValues]);
  }, [timeEntryId]);
  function setFormValue(index: number) {
    return (newValue: string) => {
      setFormValues((prevFormValues) => {
        const newFormValues: string[] = prevFormValues.map((oldValue, i) =>
          i === index ? newValue : oldValue
        );
        return newFormValues;
      });
    };
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submitResult = onSubmit(formValues);
    if (submitResult.success) {
      setErrorMessage("");
      setFormValues(submitResult.newValues);
      console.log(submitResult.newValues);
    } else {
      setErrorMessage(submitResult.errorMessage);
    }
  }
  return (
    <>
      <form id={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
              else return null;
            })}
          </div>
        ))}
        <input
          type="submit"
          value={submitButtonName}
          id={styles.submitButton}
        />
      </form>
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default CustomForm;
