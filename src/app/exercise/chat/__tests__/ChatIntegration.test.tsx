import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { server } from "@/test/setup";
import { errorHandlers } from "@/test/mocks/handlers";
import ChatPage from "../page";
import "@testing-library/happy-dom";

// モックのuseRouterとuseSearchParams
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "character") return "suzuki";
      if (key === "scenario") return "product-proposal";
      return null;
    },
  }),
}));

describe("チャット機能の統合テスト", () => {
  const user = userEvent.setup();

  it("メッセージを送信してAIからの応答を受け取る", async () => {
    render(<ChatPage />);

    // 初期状態の確認
    expect(screen.getByText("鈴木さん")).toBeInTheDocument();
    expect(screen.getByText("新商品の提案")).toBeInTheDocument();

    // テキストエリアにメッセージを入力
    const textarea = screen.getByPlaceholderText("メッセージを入力...");
    await user.type(
      textarea,
      "こんにちは、鈴木様。本日は新商品のご提案でお伺いしました。"
    );

    // 送信ボタンをクリック
    const sendButton = screen.getByRole("button", { name: "送信" });
    await user.click(sendButton);

    // ユーザーメッセージが表示されることを確認
    expect(
      screen.getByText(
        "こんにちは、鈴木様。本日は新商品のご提案でお伺いしました。"
      )
    ).toBeInTheDocument();

    // AIからの応答を待つ
    await waitFor(
      () => {
        expect(screen.getByText(/こんにちは、お客様/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // ストリーミングが完了することを確認
    await waitFor(() => {
      expect(
        screen.getByText(/ご提案についてお聞きしたいです/)
      ).toBeInTheDocument();
    });
  });

  it("ポイントが正しく消費される", async () => {
    render(<ChatPage />);

    // 初期ポイントの確認
    expect(screen.getByText("100 / 100")).toBeInTheDocument();

    // 短いメッセージを送信（10ポイント消費）
    const textarea = screen.getByPlaceholderText("メッセージを入力...");
    await user.type(textarea, "よろしくお願いします。");

    const sendButton = screen.getByRole("button", { name: "送信" });
    await user.click(sendButton);

    // ポイントが減少することを確認
    await waitFor(() => {
      expect(screen.getByText("90 / 100")).toBeInTheDocument();
    });
  });

  it("エラー時に適切なメッセージを表示", async () => {
    // エラーハンドラーを設定
    server.use(errorHandlers.chatError);

    render(<ChatPage />);

    const textarea = screen.getByPlaceholderText("メッセージを入力...");
    await user.type(textarea, "テストメッセージ");

    const sendButton = screen.getByRole("button", { name: "送信" });
    await user.click(sendButton);

    // エラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/エラーが発生しました/)).toBeInTheDocument();
    });
  });

  it("終了確認ダイアログが正しく動作する", async () => {
    render(<ChatPage />);

    // 終了ボタンをクリック
    const finishButton = screen.getByRole("button", { name: "終了" });
    await user.click(finishButton);

    // ダイアログが表示されることを確認
    expect(screen.getByText("説得を終了しますか？")).toBeInTheDocument();
    expect(
      screen.getByText("現在の対話内容を分析して、フィードバックを表示します。")
    ).toBeInTheDocument();

    // キャンセルボタンをクリック
    const cancelButton = screen.getByRole("button", { name: "キャンセル" });
    await user.click(cancelButton);

    // ダイアログが閉じることを確認
    await waitFor(() => {
      expect(
        screen.queryByText("説得を終了しますか？")
      ).not.toBeInTheDocument();
    });
  });

  it("ステージインジケーターが正しく表示される", async () => {
    render(<ChatPage />);

    // 各ステージが表示されることを確認
    expect(screen.getByText("導入")).toBeInTheDocument();
    expect(screen.getByText("課題確認")).toBeInTheDocument();
    expect(screen.getByText("提案")).toBeInTheDocument();
    expect(screen.getByText("クロージング")).toBeInTheDocument();

    // 現在のステージがハイライトされていることを確認
    const introStage = screen.getByText("導入").closest("div");
    expect(introStage).toHaveClass("active"); // CSSクラスに応じて調整
  });
});
