import { openai } from "@ai-sdk/openai";

import { chatMock } from "@/test/mocks/chatMock";

export const model =
  process.env.ENABLE_MOCK === "true" ? chatMock : openai("gpt-4-turbo");
