# Firebase を使った会話データ分析システム実装ガイド

## 概要

説得トレーニングアプリの会話データを Firebase に保存し、ユーザーの学習効果を分析するシステムの実装方針。

## 収集するデータ

### 1. セッションデータ

- ユーザー ID（匿名）
- 開始・終了時刻
- 使用キャラクター（初心者向け、中級者向けなど）
- シナリオ（新商品提案、価格交渉など）
- ポイント使用状況（初期値 100）
- 分析結果（総合スコア、良かった点、改善点、アドバイス）

### 2. メッセージデータ

- 各メッセージの内容
- 送信者（user/assistant）
- タイムスタンプ

## Firebase 構成

### 使用サービス

- **Firestore**: メインのデータストレージ
- **Firebase Analytics**: 利用状況の追跡
- **Firebase Auth（オプション）**: 匿名認証でユーザー追跡

### Firestore データ構造

```typescript
// セッションコレクション
type Session = {
  // 基本情報
  sessionId: string;
  userId: string; // 匿名ID（localStorage or Firebase Auth）
  startedAt: Timestamp;
  completedAt: Timestamp;

  // 設定情報
  character: {
    id: string;
    name: string;
  };
  scenario: {
    id: string;
    title: string;
  };

  // 進行状況
  initialPoints: 100;
  totalMessagesCount: number;

  // 分析結果
  analysisResult: {
    overallScore: number;
    strengths: string[];
    improvements: string[];
    advice: string;
  };

  // メタデータ
  appVersion: string;
  userAgent: string;
};

// メッセージサブコレクション
type Message = {
  messageId: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Timestamp;
};
```

## 実装上の注意点

### 1. プライバシー保護

#### 同意管理

- 初回利用時に必ず同意を取得
- 利用規約とプライバシーポリシーへのリンクを表示
- オプトアウト機能を提供

### 2. データ収集のタイミング

- **リアルタイム保存**: 各メッセージ送信時に Firestore へ保存
- **バッチ保存**: セッション完了時に分析結果と共に保存
- **エラーハンドリング**: ネットワークエラー時はローカルストレージに一時保存

### 3. 分析用メトリクス

#### 追加で収集すべきデータ

- 各メッセージの反応時間（思考時間）
- エクササイズの完了率（途中離脱 vs 完了）
- 同一シナリオの再チャレンジ率
- ステージごとのポイント効率
- 説得成功/失敗の判定

## 実装ステップ

### 1. Firebase プロジェクトのセットアップ

```bash
# Firebase SDKのインストール
pnpm add firebase
```

### 2. Firebase 設定ファイル

```typescript
// src/lib/firebase/config.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Firebase Consoleから取得した設定
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
export const auth = getAuth(app);
```

### 3. データ保存サービス

```typescript
// src/services/analyticsService.ts
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export class AnalyticsService {
  // セッションの開始
  async startSession(data: SessionStart) {
    /* ... */
  }

  // メッセージの保存
  async saveMessage(sessionId: string, message: MessageData) {
    /* ... */
  }

  // セッションの完了
  async completeSession(sessionId: string, analysisResult: AnalysisResult) {
    /* ... */
  }
}
```

### 4. API Routes での実装

#### チャット API での実装

```typescript
// src/app/api/chat/route.ts
import { streamText } from "ai";
import { analyticsService } from "@/services/analyticsService";

export async function POST(req: Request) {
  const { messages, character, scenario, sessionId, userId } = await req.json();

  // セッションが存在しない場合は作成
  const sessionExists = await analyticsService.sessionExists(sessionId);
  if (!sessionExists) {
    await analyticsService.startSession({
      sessionId,
      character,
      scenario,
      userId,
      startedAt: new Date(),
    });
  }

  // ユーザーメッセージを保存
  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role === "user") {
    await analyticsService.saveMessage(sessionId, {
      role: "user",
      content: lastMessage.content,
      timestamp: new Date(),
      // その他のメタデータ
    });
  }

  // AI レスポンスの生成
  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    messages,
    // ... その他の設定
  });

  // AI レスポンスも保存（ストリーミング完了後）
  result.onFinish(async ({ text }) => {
    await analyticsService.saveMessage(sessionId, {
      role: "assistant",
      content: text,
      timestamp: new Date(),
    });
  });

  return result.toDataStreamResponse();
}
```

#### 分析 API での実装

```typescript
// src/app/api/analysis/route.ts
import { generateObject } from "ai";
import { analyticsService } from "@/services/analyticsService";

export async function POST(req: Request) {
  const { messages, character, scenario, sessionId } = await req.json();

  // 分析結果の生成
  const result = await generateObject({
    model: anthropic("claude-sonnet-4-20250514"),
    schema: analysisResultSchema,
    prompt: createAnalysisPrompt({
      /* ... */
    }),
  });

  // セッション完了時にFirebaseに保存
  if (sessionId) {
    await analyticsService.completeSession(sessionId, {
      analysisResult: result.object,
      completedAt: new Date(),
      totalMessagesCount: userMessages.length,
    });
  }

  return NextResponse.json(result.object);
}
```

#### フロントエンドの修正

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return defaultValue;

    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// usePersuadeChat.tsx の修正
const [sessionId] = useState<string>(crypto.randomUUID());
const [userId] = useLocalStorage<string>("userId", crypto.randomUUID());

const { messages, status, error, setMessages, sendMessage } = useChat({
  transport: new DefaultChatTransport({
    api: "/api/chat",
    body: {
      character: character,
      scenario: scenario,
      sessionId: sessionId,
      userId: userId,
      isPointsExhausted: remainingPoints === 0,
    },
  }),
});

// 結果画面への遷移時にセッションIDを渡す
const handleFinish = useCallback(() => {
  setLocationState({ messages, sessionId });
  router.push(
    `/exercise/result?character=${characterId}&scenario=${scenarioId}`
  );
}, [messages, sessionId, setLocationState, router, characterId, scenarioId]);
```

## セキュリティルール

```javascript
// Firestore セキュリティルール
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // セッションは認証済みユーザーのみ作成可能
    match /sessions/{sessionId} {
      allow read: if request.auth != null &&
        (request.auth.uid == resource.data.userId ||
         request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
        request.auth.uid == resource.data.userId;

      // メッセージサブコレクション
      match /messages/{messageId} {
        allow read: if request.auth != null &&
          (request.auth.uid == get(/databases/$(database)/documents/sessions/$(sessionId)).data.userId ||
           request.auth.token.admin == true);
        allow create: if request.auth != null &&
          request.auth.uid == get(/databases/$(database)/documents/sessions/$(sessionId)).data.userId;
      }
    }
  }
}
```

## 分析ダッシュボード（将来的な拡張）

### 集計データの例

- ユーザーあたりの平均セッション数
- シナリオ別の完了率
- ステージ別のドロップオフ率
- 平均スコアの推移
- よく使われる説得テクニック

### 機械学習による改善提案

- パーソナライズされた学習経路の提案
- 苦手分野の特定と重点トレーニング
- 成功パターンの抽出と共有

## 今後の拡張可能性

1. **リアルタイムフィードバック**

   - 他のユーザーとの比較（ベンチマーク）
   - リアルタイムでのヒント提供

2. **ゲーミフィケーション**

   - スコアボード
   - バッジシステム
   - 連続トレーニング記録

3. **チーム機能**
   - 組織単位での利用状況分析
   - チーム内でのベストプラクティス共有

## 実装時のチェックリスト

- [ ] Firebase プロジェクトの作成
- [ ] 環境変数の設定（.env.local）
- [ ] プライバシーポリシーの作成
- [ ] 同意管理 UI の実装
- [ ] エラーハンドリングとリトライ機能
- [ ] セキュリティルールの設定
- [ ] 分析データの定期バックアップ設定
