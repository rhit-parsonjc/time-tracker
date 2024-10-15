import { useState } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import styles from "./CategoryList.module.css";

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
  return (
    <>
      <ul id={styles.categorylist}>
        {categories.map((category) => (
          <CategoryItem
            categoryName={category}
            onEdit={() => {
              setSelectedCategory(category);
              setCategory(category);
            }}
            onDelete={() => deleteCategory(category)}
          />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedCategory) {
            editCategory(selectedCategory, category);
          } else {
            addCategory(category);
          }
          setCategory("");
          setSelectedCategory(null);
        }}
        id={styles.categorynameform}
      >
        <label htmlFor="categoryformcategoryname">Category Name</label>
        <input
          type="text"
          id="categoryformcategoryname"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input type="submit" value="Add Category" />
      </form>
    </>
  );
}

export default CategoryList;
