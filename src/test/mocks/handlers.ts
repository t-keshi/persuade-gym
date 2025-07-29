import { setupWorker } from "msw/browser";
import { chatMock } from "./chatMock";
import { analysisMock } from "./analysisMock";

export const handlers = [analysisMock, chatMock];

export const worker = setupWorker(...handlers);
