import { version } from "react";

export const dataAttr = (guard: boolean | undefined) => {
  return guard ? "" : undefined;
};

export const ariaAttr = (guard: boolean | undefined) => {
  return guard ? "true" : undefined;
};

export const inertAttr = (value: boolean | undefined) => {
  const pieces = version.split(".");
  const majorPart = pieces[0];
  if (majorPart === undefined) return undefined;

  const major = parseInt(majorPart, 10);
  // https://github.com/facebook/react/issues/17157#issuecomment-2003750544
  if (major >= 19) {
    return value;
  }

  return value ? "" : undefined;
};
