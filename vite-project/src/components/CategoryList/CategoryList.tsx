import { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryList.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMesage";

interface Props {
  categories: string[];
  addCategory: (category: string) => void;
  editCategory: (oldCategory: string, newCategory: string) => void;
  deleteCategory: (category: string) => void;
}

function CategoryList(props: Props) {
  const { categories, addCategory, editCategory, deleteCategory } = props;
  const [category, setCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <>
      <ul id={styles.categoryList}>
        {categories.map((category, index) => (
          <CategoryItem
            categoryName={category}
            onEdit={() => {
              setSelectedCategory(category);
              setCategory(category);
            }}
            onDelete={() => deleteCategory(category)}
            deletable={index !== 0}
            key={category}
          />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedCategory && category === selectedCategory) {
            setErrorMessage("");
            return;
          }
          if (categories.indexOf(category) !== -1) {
            setErrorMessage("Category already present");
            return;
          }
          setErrorMessage("");
          if (selectedCategory) {
            editCategory(selectedCategory, category);
          } else {
            addCategory(category);
          }
          setCategory("");
          setSelectedCategory(null);
        }}
        id={styles.categoryNameForm}
      >
        <label htmlFor="categoryformcategoryname" style={{ fontSize: "1rem" }}>
          Category Name
        </label>
        <input
          type="text"
          id="categoryformcategoryname"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ fontSize: "1rem" }}
          required
        />
        <input
          type="submit"
          value="Add Category"
          style={{ fontSize: "1rem" }}
        />
      </form>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </>
  );
}

export default CategoryList;
