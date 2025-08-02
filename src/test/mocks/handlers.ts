import { setupWorker } from "msw/browser";
import { analysisMock } from "./analysisMock";
import { globalDelay } from "./globalDelay";
import { globalError } from "./globalError";
import { chatMock } from "./chatMock";

export const handlers = [
  globalDelay(1000),
  globalError(),
  analysisMock,
  chatMock,
];

export const worker = setupWorker(...handlers);
