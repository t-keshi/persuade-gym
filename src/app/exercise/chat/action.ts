"use server";

import { parseWithZod } from "@conform-to/zod";
import { schema } from "./schema";

export const mockAction = async (_: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, {
    schema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  return submission.reply();
};
