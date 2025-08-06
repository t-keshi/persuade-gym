"use client";

import React, { Suspense } from "react";

import { Box, Stack, VStack } from "../../../../styled-system/jsx";

import { GradingScale } from "./components/GradingScale";
import { ResultLoading } from "./components/ResultLoading";
import { useAnalysis } from "./useAnalysis";

import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";
import { Typography } from "@/components/ui/Typography/Typography";

const ResultContent: React.FC = () => {
  const { analysis, isLoading, error, retry } = useAnalysis();

  if (isLoading) {
    return <ResultLoading />;
  }

  if (error || !analysis) {
    return (
      <VStack
        height="contentHeight"
        gap="none"
        justifyContent="center"
        alignItems="center"
      >
        <Container size="sm">
          <Card>
            <VStack gap="lg" alignItems="center">
              <Typography variant="h3" color="error">
                分析中にエラーが発生しました
              </Typography>
              <Box textAlign="center">
                <Typography>
                  {error?.message ||
                    "分析データの取得に失敗しました。もう一度お試しください。"}
                </Typography>
              </Box>
              <VStack gap="md" alignItems="center">
                <Button onClick={retry} size="lg" variant="primary">
                  リトライ
                </Button>
                <Button
                  as="link"
                  href="/exercise/new"
                  size="lg"
                  variant="outlined"
                >
                  新しく始める
                </Button>
              </VStack>
            </VStack>
          </Card>
        </Container>
      </VStack>
    );
  }

  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full">
        <Container>
          <Box p="lg">
            <Stack gap="lg">
              <GradingScale point={analysis.overallScore} />

              {/* 良かった点 */}
              {analysis.strengths.length > 0 && (
                <Card>
                  <VStack gap="md" alignItems="stretch">
                    <Typography variant="h3">良かった点</Typography>
                    <VStack gap="sm" alignItems="stretch">
                      {analysis.strengths.map((strength, index) => (
                        <Typography key={index}>• {strength}</Typography>
                      ))}
                    </VStack>
                  </VStack>
                </Card>
              )}

              {/* 改善点 */}
              {analysis.improvements.length > 0 && (
                <Card>
                  <VStack gap="md" alignItems="stretch">
                    <Typography variant="h3">改善点</Typography>
                    <VStack gap="sm" alignItems="stretch">
                      {analysis.improvements.map((improvement, index) => (
                        <Typography key={index}>• {improvement}</Typography>
                      ))}
                    </VStack>
                  </VStack>
                </Card>
              )}

              {/* アドバイス */}
              <Card>
                <VStack gap="md" alignItems="stretch">
                  <Typography variant="h3">次回に向けたアドバイス</Typography>
                  <Typography whiteSpace="pre-wrap">
                    {analysis.advice}
                  </Typography>
                </VStack>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box width="full" paddingBottom="lg">
        <FloatingActionArea>
          <Container size="sm">
            <Button as="link" size="lg" width="hug" href="/exercise/new">
              再チャレンジ
            </Button>
          </Container>
        </FloatingActionArea>
      </Box>
    </VStack>
  );
};

export const ResultExerciseClient: React.FC = () => {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
};
