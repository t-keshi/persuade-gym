export type PersuasionTechnique = {
  title: string;
  description: string;
  example: string;
  tip: string;
};

export const persuasionTechniques: PersuasionTechnique[] = [
  {
    title: "ゲイン・フレーム",
    description: "利得を強調する",
    example: "「このプランならコストを30%削減できます」",
    tip: "相手が得られるメリットを具体的な数字で示すことで、ポジティブな印象を与えます。",
  },
  {
    title: "ロス・フレーム",
    description: "損失を強調する",
    example: "「導入しないと、月10万円の機会損失になります」",
    tip: "人は利益を得ることよりも、損失を避けることに敏感です。この心理を活用しましょう。",
  },
  {
    title: "アンカリング",
    description: "最初に提示する情報が基準になる",
    example: "「通常は100万円ですが、今回は50万円で提供します」",
    tip: "最初に高い数字を提示することで、その後の提案が魅力的に見える効果があります。",
  },
  {
    title: "社会的証明",
    description: "他者の行動や評価を示す",
    example: "「同業他社の80%が既に導入しています」",
    tip: "多くの人が選んでいるという事実は、強力な説得材料になります。",
  },
  {
    title: "希少性の原理",
    description: "限定性や緊急性を強調する",
    example: "「このキャンペーンは今月末までの限定です」",
    tip: "入手困難なものほど価値が高く感じられる心理を活用します。",
  },
  {
    title: "返報性の原理",
    description: "先に何かを与える",
    example: "「まずは無料トライアルをお試しください」",
    tip: "相手に何かを与えることで、お返しをしたくなる心理が働きます。",
  },
];
