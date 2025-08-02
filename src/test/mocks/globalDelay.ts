import { http } from "msw";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const globalDelay = (delay = 0) => {
  return http.all("/api/*", async () => {
    await sleep(delay);
  });
};
