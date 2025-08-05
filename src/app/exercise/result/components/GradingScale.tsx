import React from "react";

import { Box, HStack, VStack } from "../../../../../styled-system/jsx";

import { Typography } from "@/components/ui/Typography/Typography";

type GradingScaleProps = {
  point: number;
};

type GradeInfo = {
  text: string;
  color: "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
};

const getGradeText = (point: number): GradeInfo => {
  if (point >= 90) {
    return { text: "Excellent!", color: "primary" };
  } else if (point >= 70) {
    return { text: "Great!", color: "secondary" };
  } else if (point >= 50) {
    return { text: "Good!", color: "textPrimary" };
  } else if (point >= 30) {
    return { text: "Nice try!", color: "textPrimary" };
  } else {
    return { text: "Keep trying!", color: "textSecondary" };
  }
};

export const GradingScale: React.FC<GradingScaleProps> = ({ point }) => {
  const grade = getGradeText(point);

  return (
    <HStack justifyContent="center" alignItems="flex-start">
      <VStack gap="xs" alignItems="center">
        <Typography variant="caption" as="span" color="textSecondary">
          獲得ポイント
        </Typography>
        <Typography variant="h1">{point}点</Typography>
        <Box marginTop="sm">
          <Typography variant="h2" color={grade.color}>
            {grade.text}
          </Typography>
        </Box>
      </VStack>
    </HStack>
  );
};
