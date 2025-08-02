export type ScenarioDifficulty = "初級" | "中級" | "上級";

export interface Scenario {
  id: string;
  title: string;
  icon: string; // アイコン（絵文字）
  description: string;
  context: string; // 背景情報や状況設定
  goal: string; // 説得の目標
  difficulty: ScenarioDifficulty;
  suggestedApproaches: string[]; // 推奨されるアプローチや戦略
  keyPoints: string[]; // 重要なポイントや考慮すべき点
}

export const SCENARIO_ID = {
  NEW_PRODUCT: "new-product",
  PRICE_NEGOTIATION: "price-negotiation",
  INTERNAL_PROJECT: "internal-project",
} as const;

export const newProductScenarioPreset = {
  id: SCENARIO_ID.NEW_PRODUCT,
  title: "新商品の導入提案",
  icon: "🎁",
  description:
    "あなたは新しい商品・サービスを相手に提案し、導入してもらうことを目指します。",
  context:
    "あなたは営業担当者として、クライアント企業に新しい商品やサービスを提案しています。この商品は市場で実績があり、多くの企業で導入されていますが、まだ相手企業では採用されていません。相手は新しいものに対して慎重な姿勢を持っていますが、業務効率化や競争力強化には関心があります。",
  goal: "新商品・サービスの導入を決定してもらう、または次回の詳細提案の機会を得る。",
  difficulty: "初級",
  suggestedApproaches: [
    "商品・サービスの具体的なメリットを数値で示す",
    "他社での成功事例を紹介する",
    "試験的な導入から始めることを提案する",
    "相手企業の課題に対する解決策として提示する",
  ],
  keyPoints: [
    "コスト対効果を明確に説明する",
    "導入に伴うリスクとその対策を示す",
    "相手企業の業界特性や文化に合わせた提案をする",
    "競合他社との差別化ポイントを強調する",
  ],
} as const satisfies Scenario;

export const priceNegotiationScenarioPreset = {
  id: SCENARIO_ID.PRICE_NEGOTIATION,
  title: "価格交渉",
  icon: "💰",
  description:
    "長期的な取引関係を維持しながら、価格改定や値上げの交渉を行います。",
  context:
    "あなたは自社製品の営業担当者で、原材料費の高騰や人件費の上昇により、長年取引のある顧客に対して価格改定（値上げ）の交渉をすることになりました。相手は予算の制約があり、コスト削減を求められている状況です。しかし、あなたの会社の製品は相手の事業において重要な役割を果たしています。",
  goal: "価格改定を受け入れてもらいながら、取引関係を良好に保つ。",
  difficulty: "中級",
  suggestedApproaches: [
    "値上げの背景と必要性を丁寧に説明する",
    "段階的な価格改定を提案する",
    "数量割引や長期契約などの代替案を用意する",
    "付加価値サービスの提供を検討する",
  ],
  keyPoints: [
    "一方的な通知ではなく、対話を重視する",
    "相手の予算制約を理解し、共感を示す",
    "値上げ幅の根拠を明確に示す",
    "長期的な関係性の価値を強調する",
    "競合他社の価格動向も考慮する",
  ],
} as const satisfies Scenario;

export const internalProjectScenarioPreset = {
  id: SCENARIO_ID.INTERNAL_PROJECT,
  title: "社内プロジェクト提案",
  icon: "📊",
  description:
    "組織内で新しいプロジェクトや施策の承認を得るための説得を行います。",
  context:
    "あなたは社内の改善提案やイノベーションを推進する立場にあり、業務効率化や社員満足度向上につながる新しいプロジェクトを考案しました。このプロジェクトには初期投資や業務変更が必要ですが、長期的には大きなメリットがあると確信しています。上司や経営層は変化に慎重で、短期的な成果や明確なROIを重視する傾向があります。",
  goal: "プロジェクトの承認と必要なリソース（予算・人員）の割り当てを得る。",
  difficulty: "上級",
  suggestedApproaches: [
    "現状の課題と解決策を明確に示す",
    "短期・中期・長期のメリットをバランスよく説明する",
    "段階的な実施計画を提案する",
    "類似プロジェクトの成功事例を社内外から集める",
  ],
  keyPoints: [
    "会社の経営方針や戦略との整合性を示す",
    "定量的・定性的な効果を具体的に説明する",
    "リスク分析とその対策を準備する",
    "キーパーソンの関心事や懸念点を事前に把握する",
    "プロジェクト成功の指標と評価方法を明確にする",
  ],
} as const satisfies Scenario;

// シナリオプレセットの配列
export const scenarioPresets: Scenario[] = [
  newProductScenarioPreset,
  priceNegotiationScenarioPreset,
  internalProjectScenarioPreset,
];
