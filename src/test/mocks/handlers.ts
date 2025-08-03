import { setupWorker } from "msw/browser";

import { analysisMock } from "./analysisMock";
import { chatMock } from "./chatMock";
import { globalDelay } from "./globalDelay";
import { globalError } from "./globalError";

export const handlers = [
  globalDelay(1000),
  globalError(),
  analysisMock,
  chatMock,
];

export const worker = setupWorker(...handlers);
