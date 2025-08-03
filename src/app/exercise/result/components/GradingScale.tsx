import React from "react";

import { HStack, VStack } from "../../../../../styled-system/jsx";

import { Typography } from "@/components/ui/Typography/Typography";

type GradingScaleProps = {
  point: number;
};

export const GradingScale: React.FC<GradingScaleProps> = ({ point }) => {
  return (
    <HStack justifyContent="center" alignItems="flex-start">
      <VStack gap="xs" alignItems="center">
        <Typography variant="caption" as="span" color="textSecondary">
          獲得ポイント
        </Typography>
        <Typography variant="h1">{point}点</Typography>
      </VStack>
    </HStack>
  );
};
