import { chatMock } from "@/test/mocks/chatMock";
import { openai } from "@ai-sdk/openai";

export const model =
  process.env.ENABLE_MOCK === "true" ? chatMock : openai("gpt-4-turbo");
