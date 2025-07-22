import React, { useState, useEffect } from "react";
import { Loading } from "@/components/ui/Loading/Loading";
import { Typography } from "@/components/ui/Typography/Typography";
import { Card } from "@/components/ui/Card/Card";
import { Box, Stack, VStack } from "../../../../../styled-system/jsx";
import { persuasionTechniques } from "@/domain/persuasionTechniques";

export const ResultLoading: React.FC = () => {
  const [currentTechniqueIndex, setCurrentTechniqueIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechniqueIndex(
        (prevIndex) => (prevIndex + 1) % persuasionTechniques.length
      );
    }, 6000); // 6秒ごとに切り替え

    return () => clearInterval(interval);
  }, []);

  const currentTechnique = persuasionTechniques[currentTechniqueIndex];

  return (
    <VStack
      gap="lg"
      alignItems="center"
      justifyContent="center"
      minHeight="[500px]"
    >
      <Loading size="lg" loadingText="結果を分析中" />

      <Box maxWidth="[700px]" width="full">
        <Card>
          <Stack gap="md">
            <Box textAlign="center">
              <Typography variant="body2">💡 説得のテクニック</Typography>
            </Box>

            <Stack gap="sm">
              <Typography variant="h5" fontWeight="bold">
                {currentTechnique.title}
              </Typography>
              <Typography variant="body1" color="primary">
                {currentTechnique.description}
              </Typography>
            </Stack>

            <Box
              backgroundColor="background.default"
              padding="md"
              borderRadius="sm"
            >
              <Typography variant="body1" italic>
                例: {currentTechnique.example}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary">
              {currentTechnique.tip}
            </Typography>
          </Stack>
        </Card>
      </Box>

      <Stack gap="xs" alignItems="center">
        <Typography variant="caption" color="textSecondary">
          分析には少し時間がかかります
        </Typography>
        <Box display="flex" gap="xs">
          {persuasionTechniques.map((_, index) => (
            <Box
              key={index}
              width="[8px]"
              height="[8px]"
              borderRadius="circle"
              backgroundColor={
                index === currentTechniqueIndex ? "primary.main" : "divider"
              }
              style={{ transition: "background-color 0.3s" }}
            />
          ))}
        </Box>
      </Stack>
    </VStack>
  );
};
