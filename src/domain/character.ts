export type PersonalityTrait =
  | "論理的"
  | "感情的"
  | "慎重"
  | "決断力がある"
  | "保守的"
  | "革新的"
  | "リスク回避"
  | "チャレンジャー"
  | "細部にこだわる"
  | "大局的";

export type Character = {
  id: string;
  name: string;
  avatar?: string; // 画像パスまたはURL
  job: string;
  age: number;
  difficultyLevel: 1 | 2 | 3 | 4 | 5;
  personality: PersonalityTrait[];
  background: string; // 経歴や背景情報
  description: string; // キャラクターの詳細説明
  shortIntro: string; // 簡単な人物紹介（1-2文程度）
};

export const CHARACTER_ID = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  EXPERT: "EXPERT",
} as const;

export const characterPresets = [
  {
    id: CHARACTER_ID.BEGINNER,
    name: "佐藤 健太",
    avatar: "/avatar-sato.png",
    job: "IT企業・営業部新人",
    age: 26,
    difficultyLevel: 1,
    personality: ["革新的", "チャレンジャー", "感情的"],
    background:
      "大学卒業後、大手IT企業に入社。営業部に配属されて1年目。新しい技術やサービスに興味を持ち、自分自身も最新のガジェットを積極的に使用する。まだ経験が浅いため、先輩や上司のアドバイスを素直に受け入れる傾向がある。",
    description:
      "若く意欲的な営業マン。新しいアイデアや提案に対して前向きで、論理的な説明と具体的なメリットを示されると納得しやすい。ただし、自分の会社の方針や上司の意見を気にする傾向があり、それらと矛盾する提案には躊躇することも。説得のポイントは、革新性と具体的なメリットを明確に示すこと。",
    shortIntro: "新しいものが大好きな営業新人。論理的な説明に前向き。",
  },
  {
    id: CHARACTER_ID.INTERMEDIATE,
    name: "鈴木 美香",
    avatar: "/avatar-suzuki.png",
    job: "中堅メーカー・購買部マネージャー",
    age: 42,
    difficultyLevel: 3,
    personality: ["慎重", "論理的", "リスク回避"],
    background:
      "同じ会社で15年以上勤務し、購買部のマネージャーに昇進。これまでに何度か失敗を経験しており、新しい取引先や製品の採用には慎重な姿勢を取る。コスト削減と品質維持のバランスを常に意識している。部下からの信頼も厚く、チームの意見を重視する。",
    description:
      "経験豊富な購買マネージャー。データや実績を重視し、感情に流されない意思決定を心がけている。新規提案には懐疑的だが、コスト削減や業務効率化につながる提案には関心を示す。説得のポイントは、具体的な数字やデータを示し、リスクへの対策を明確に説明すること。また、自社での実績や他社での成功事例を示すことも効果的。",
    shortIntro: "経験豊富な慎重派。データと実績を重視する購買責任者。",
  },
  {
    id: CHARACTER_ID.EXPERT,
    name: "高橋 誠一",
    avatar: "/avatar-takahashi.png",
    job: "老舗企業・代表取締役",
    age: 58,
    difficultyLevel: 5,
    personality: ["保守的", "細部にこだわる", "慎重"],
    background:
      "家業を継いで30年、老舗企業を守り発展させてきた。バブル崩壊やリーマンショックなど、いくつもの経済危機を乗り越えてきた経験から、安易な変化や流行に流されない経営哲学を持つ。伝統と革新のバランスを常に模索している。業界内での人脈も広く、信頼関係を重視する。",
    description:
      "長年の経験と実績を持つ経営者。新しい提案に対しては徹底的に質問し、あらゆる角度から検討する。表面的な説明では決して納得せず、細部まで一貫性のある提案を求める。感情に訴えるよりも、長期的な視点での利益やリスク、自社の理念との整合性を重視する。説得のポイントは、提案の本質を理解し、相手の価値観や懸念点を十分に把握した上で、段階的かつ忍耐強くアプローチすること。",
    shortIntro: "30年の経営経験。細部まで検討する最難関の老舗社長。",
  },
] as const satisfies Character[];
