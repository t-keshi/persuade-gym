import { z } from "zod";

export const analysisResultSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("総合スコア（0-100）"),
  strengths: z.array(z.string()).describe("良かった点"),
  improvements: z.array(z.string()).describe("改善点"),
  advice: z.string().describe("次回に向けたアドバイス"),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
