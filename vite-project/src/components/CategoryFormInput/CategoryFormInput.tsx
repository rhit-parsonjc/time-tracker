import { useEffect, useState } from "react";
import styles from "./CategoryFormInput.module.css";

interface Props {
  id: string;
  categories: string[];
  initialCategory: string;
  required: boolean;
  onChange: (newCategory: string) => void;
}

function CategoryFormInput(props: Props) {
  const { id, categories, initialCategory, required, onChange } = props;
  const [category, setCategory] = useState<string>(initialCategory);
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        Category
      </label>
      <select
        name="category"
        id={id}
        value={category}
        onChange={(e) => {
          const newCategory = e.target.value;
          setCategory(newCategory);
          onChange(newCategory);
        }}
        required={required}
        className={styles.selectInput}
      >
        {categories.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}

export default CategoryFormInput;
