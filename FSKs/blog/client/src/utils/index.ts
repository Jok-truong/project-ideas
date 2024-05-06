import { TCategoryOption } from "../types/postCategories";
import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "../constants/extensions";
import { JSONContent } from "@tiptap/react";

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

const parseJsonToHtml = (json: JSONContent) => {
  return parse(generateHTML(json, extensions));
};

export default parseJsonToHtml;
