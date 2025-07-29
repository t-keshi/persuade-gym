import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";
import { handlers } from "./mocks/handlers";
import "@testing-library/jest-dom/vitest";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
