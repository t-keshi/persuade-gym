import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { server } from "@/test/setup";
import { errorHandlers } from "@/test/mocks/handlers";
import ResultPage from "../page";

// モックのuseSearchParams
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "messages") {
        return JSON.stringify([
          {
            id: "1",
            role: "user",
            parts: [{ type: "text", text: "こんにちは、新商品のご提案です。" }],
          },
          {
            id: "2",
            role: "assistant",
            parts: [
              { type: "text", text: "お聞きします。どのような商品ですか？" },
            ],
          },
        ]);
      }
      return null;
    },
  }),
}));

describe("結果ページの統合テスト", () => {
  it("分析結果が正しく表示される", async () => {
    render(<ResultPage />);

    // ローディング状態の確認
    expect(screen.getByText("分析中...")).toBeInTheDocument();

    // 分析結果を待つ
    await waitFor(
      () => {
        expect(screen.getByText("総合スコア")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // スコアの表示確認
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("/ 100")).toBeInTheDocument();

    // 各ステージのスコア確認
    expect(screen.getByText("導入")).toBeInTheDocument();
    expect(screen.getByText("90点")).toBeInTheDocument();
    expect(screen.getByText("課題確認")).toBeInTheDocument();
    expect(screen.getByText("85点")).toBeInTheDocument();

    // 使用した説得技法の確認
    expect(screen.getByText("使用した説得技法")).toBeInTheDocument();
    expect(screen.getByText("共感")).toBeInTheDocument();
    expect(screen.getByText("3回")).toBeInTheDocument();
    expect(screen.getByText("効果: 高")).toBeInTheDocument();

    // フィードバックの確認
    expect(screen.getByText("良かった点")).toBeInTheDocument();
    expect(
      screen.getByText(/相手の立場に立った共感的なアプローチ/)
    ).toBeInTheDocument();

    expect(screen.getByText("改善点")).toBeInTheDocument();
    expect(
      screen.getByText(/クロージングでもう少し積極的に/)
    ).toBeInTheDocument();
  });

  it("エラー時に適切なメッセージを表示", async () => {
    // エラーハンドラーを設定
    server.use(errorHandlers.analyzeError);

    render(<ResultPage />);

    // エラーメッセージを待つ
    await waitFor(() => {
      expect(
        screen.getByText("分析中にエラーが発生しました")
      ).toBeInTheDocument();
    });

    // 再試行ボタンの確認
    expect(screen.getByRole("button", { name: "再試行" })).toBeInTheDocument();
  });

  it("ポイント効率が正しく表示される", async () => {
    render(<ResultPage />);

    // 分析結果を待つ
    await waitFor(() => {
      expect(screen.getByText("ポイント効率")).toBeInTheDocument();
    });

    // ポイント効率の詳細確認
    expect(screen.getByText("使用ポイント")).toBeInTheDocument();
    expect(screen.getByText("80 / 100")).toBeInTheDocument();
    expect(screen.getByText("平均ポイント/ステージ")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("効率評価")).toBeInTheDocument();
    expect(screen.getByText("良好")).toBeInTheDocument();
  });

  it("グレーディングスケールが正しく動作する", async () => {
    render(<ResultPage />);

    // 分析結果を待つ
    await waitFor(() => {
      expect(screen.getByText("総合スコア")).toBeInTheDocument();
    });

    // スケールの各レベルが表示されることを確認
    const scale = screen.getByTestId("grading-scale");
    expect(scale).toBeInTheDocument();

    // 現在のスコアがハイライトされていることを確認
    const currentScore = screen.getByText("85").closest("div");
    expect(currentScore).toHaveAttribute("aria-current", "true");
  });
});
