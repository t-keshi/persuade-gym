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
  const { analysis, isLoading } = useAnalysis();

  if (isLoading || !analysis) {
    return <ResultLoading />;
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
                  <Typography>{analysis.advice}</Typography>
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

const ResultPage: React.FC = () => {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
};

export default ResultPage;
