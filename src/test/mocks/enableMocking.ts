export const enableMocking = async () => {
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    return;
  }

  const { worker } = await import("./handlers");

  return worker.start();
};
