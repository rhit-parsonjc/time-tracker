import { useEffect, useState } from "react";
import styles from "./TextFormInput.module.css";

interface Props {
  id: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  initialValue: string;
  required: boolean;
  onChange: (newValue: string) => void;
}

function TextFormInput(props: Props) {
  const { id, name, type, initialValue, required, onChange } = props;
  const [value, setValue] = useState<string>(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {name}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}
        required={required}
        className={styles.input}
      />
    </>
  );
}

export default TextFormInput;
