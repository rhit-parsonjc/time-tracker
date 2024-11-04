import { useEffect, useState } from "react";

interface Props {
  id: string;
  name: string;
  initialValue: boolean;
  onChange: (newValue: boolean) => void;
}
function CheckboxFormInput(props: Props) {
  const { id, name, initialValue, onChange } = props;
  const [value, setValue] = useState(initialValue);
  useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={value}
      onChange={(e) => {
        const newValue = e.target.checked;
        setValue(newValue);
        onChange(newValue);
      }}
    />
  );
}
export default CheckboxFormInput;
