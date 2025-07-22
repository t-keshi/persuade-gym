import { setupServer } from "msw/node";
import { beforeAll, afterEach, afterAll } from "vitest";
import { handlers } from "./mocks/handlers";
import "@testing-library/jest-dom/vitest";

// MSWサーバーのセットアップ
export const server = setupServer(...handlers);

// テスト開始前にサーバーを起動
beforeAll(() => server.listen());

// 各テスト後にハンドラーをリセット
afterEach(() => server.resetHandlers());

// すべてのテスト終了後にサーバーを停止
afterAll(() => server.close());
