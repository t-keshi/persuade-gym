"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Box, HStack, VStack } from "../../../../styled-system/jsx";

import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";
import { RadioGroup } from "@/components/ui/RadioGroup/RadioGroup";
import { RadioGroupItem } from "@/components/ui/RadioGroup/RadioGroupItem";
import { Typography } from "@/components/ui/Typography/Typography";
import { beginnerCharacterPreset, characterPresets } from "@/domain/character";
import { scenarioPresets } from "@/domain/scenario";

export const NewExercisePage = () => {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<string>(
    beginnerCharacterPreset.id
  );
  const [selectedScenario, setSelectedScenario] = useState<string>(
    scenarioPresets[0].id
  );

  const handleStart = () => {
    const params = new URLSearchParams({
      character: selectedCharacter,
      scenario: selectedScenario,
    });
    router.push(`/exercise/chat?${params.toString()}`);
  };

  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full">
        <Container size="sm">
          <Box pt="lg" width="full">
            <VStack gap="lg" width="full">
              <RadioGroup
                legend="1. 説得相手を選択"
                defaultValue={beginnerCharacterPreset.id}
                value={selectedCharacter}
                onValueChange={(details) => setSelectedCharacter(details.value)}
              >
                {characterPresets.map((character) => (
                  <RadioGroupItem key={character.id} value={character.id}>
                    <HStack gap="sm">
                      <Box flexShrink={0}>
                        <Avatar src={character.avatar} />
                      </Box>
                      <VStack gap="none" alignItems="flex-start">
                        <HStack gap="xs">
                          <Typography>{character.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            難易度:
                            {"★".repeat(character.difficultyLevel)}
                            {"☆".repeat(5 - character.difficultyLevel)}
                          </Typography>
                        </HStack>
                        <Typography variant="body2" color="textSecondary">
                          {character.shortIntro}
                        </Typography>
                      </VStack>
                    </HStack>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
              <RadioGroup
                legend="2. シナリオを選択"
                defaultValue={scenarioPresets[0].id}
                value={selectedScenario}
                onValueChange={(details) => setSelectedScenario(details.value)}
              >
                {scenarioPresets.map((scenario) => (
                  <RadioGroupItem key={scenario.id} value={scenario.id}>
                    <HStack gap="sm">
                      <Box flexShrink={0}>
                        <Avatar>{scenario.icon}</Avatar>
                      </Box>
                      <VStack gap="xs" alignItems="flex-start">
                        <Typography>{scenario.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {scenario.description}
                        </Typography>
                      </VStack>
                    </HStack>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            </VStack>
          </Box>
        </Container>
      </Box>
      <Box width="full" paddingBottom="lg">
        <FloatingActionArea>
          <Container size="sm">
            <Button size="lg" width="hug" onClick={handleStart}>
              エクササイズ開始
            </Button>
          </Container>
        </FloatingActionArea>
      </Box>
    </VStack>
  );
};

export default NewExercisePage;
