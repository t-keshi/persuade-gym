import { FieldValue, Timestamp } from "firebase-admin/firestore";

import type { AnalysisResult } from "@/domain/analysis";
import type { Character } from "@/domain/character";
import type { Scenario } from "@/domain/scenario";

import { getFirestoreAdmin } from "@/lib/firebase/admin";

type SessionStart = {
  sessionId: string;
  character: Character;
  scenario: Scenario;
  userId: string;
  startedAt: Date;
};

type MessageData = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type SessionComplete = {
  analysisResult: AnalysisResult;
  completedAt: Date;
  totalMessagesCount: number;
};

export class AnalyticsService {
  private db = getFirestoreAdmin();

  // セッションの存在確認
  sessionExists = async (sessionId: string): Promise<boolean> => {
    try {
      const sessionDoc = await this.db
        .collection("sessions")
        .doc(sessionId)
        .get();
      return sessionDoc.exists;
    } catch (error) {
      console.error("Error checking session existence:", error);
      return false;
    }
  };

  // セッションの開始
  startSession = async (data: SessionStart): Promise<void> => {
    try {
      const sessionData = {
        sessionId: data.sessionId,
        userId: data.userId,
        startedAt: Timestamp.fromDate(data.startedAt),
        character: {
          id: data.character.id,
          name: data.character.name,
        },
        scenario: {
          id: data.scenario.id,
          title: data.scenario.title,
        },
        initialPoints: 100,
        appVersion: process.env.npm_package_version || "unknown",
        userAgent: "Next.js API Route",
      };

      await this.db.collection("sessions").doc(data.sessionId).set(sessionData);
    } catch (error) {
      console.error("Error starting session:", error);
      throw error;
    }
  };

  // メッセージの保存
  saveMessage = async (
    sessionId: string,
    message: MessageData
  ): Promise<void> => {
    try {
      const messageId = this.generateMessageId();
      const messageData = {
        messageId,
        role: message.role,
        content: message.content,
        timestamp: Timestamp.fromDate(message.timestamp),
        createdAt: FieldValue.serverTimestamp(),
      };

      await this.db
        .collection("sessions")
        .doc(sessionId)
        .collection("messages")
        .doc(messageId)
        .set(messageData);
    } catch (error) {
      console.error("Error saving message:", error);
      throw error;
    }
  };

  // セッションの完了
  completeSession = async (
    sessionId: string,
    data: SessionComplete
  ): Promise<void> => {
    try {
      const updateData = {
        completedAt: Timestamp.fromDate(data.completedAt),
        totalMessagesCount: data.totalMessagesCount,
        analysisResult: {
          overallScore: data.analysisResult.overallScore,
          strengths: data.analysisResult.strengths,
          improvements: data.analysisResult.improvements,
          advice: data.analysisResult.advice,
        },
      };

      await this.db.collection("sessions").doc(sessionId).update(updateData);
    } catch (error) {
      console.error("Error completing session:", error);
      throw error;
    }
  };

  // メッセージIDの生成
  private generateMessageId = (): string => {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  };
}

export const analyticsService = new AnalyticsService();
