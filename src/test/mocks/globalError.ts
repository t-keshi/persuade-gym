import { http, HttpResponse } from "msw";

export const globalError = (error = false) =>
  http.all("/api/*", async () => {
    if (error) {
      return HttpResponse.json(undefined, { status: 500 });
    }
  });
