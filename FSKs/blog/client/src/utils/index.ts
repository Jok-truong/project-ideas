import { TCategoryOption } from "../types/postCategories";

export const hasMessage = (x: unknown): x is { message: string } => {
  return Boolean(
    typeof x === "object" &&
      x &&
      "message" in x &&
      typeof x.message === "string"
  );
};

export const categoryToOption = (category: {
  _id: string;
  title: string;
}): TCategoryOption => ({
  value: category._id,
  label: category.title,
});

export const filterCategories = (inputValue: string, categoriesData: any) => {
  const filteredOptions = categoriesData
    .map(categoryToOption)
    .filter((category: any) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );

  return filteredOptions;
};
