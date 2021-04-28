import axios from "../axios";
import { JSDOM } from "jsdom";

export const loadDOM = async (url: string, isDocument?: boolean) => {
  if (typeof url === "object" || isDocument) {
    return new JSDOM(url).window.document;
  }

  const { data } = await axios.get(url);

  return new JSDOM(data).window.document;
};

export const trim = (value: string|null): string => {
  if (value == null) {
    return "";
  }

  return (value + "").replace(/^\s+|\s+$/g, "");
};
