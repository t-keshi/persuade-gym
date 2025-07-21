import z from "zod";

const MAX_TEXT_MESSAGE = 5000;

export const schema = z.object({
  textMessage: z
    .string()
    .max(
      MAX_TEXT_MESSAGE,
      `${MAX_TEXT_MESSAGE.toLocaleString()}文字以内で入力してください`
    )
    .default(""),
});
