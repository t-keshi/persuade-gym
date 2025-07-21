import { Button } from "@/components/ui/Button/Button";
import { Box, HStack, VStack } from "../../../../styled-system/jsx";
import { Container } from "@/components/ui/Container/Container";
import { Typography } from "@/components/ui/Typography/Typography";
import { RadioGroup } from "@/components/ui/RadioGroup/RadioGroup";
import { RadioGroupItem } from "@/components/ui/RadioGroup/RadioGroupItem";
import { CHARACTER_ID, characterPresets } from "@/domain/character";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { scenarioPresets } from "@/domain/scenario";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";

export const NewExercisePage = () => {
  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full">
        <Container size="sm">
          <Box pt="lg" width="full">
            <VStack gap="lg" width="full">
              <RadioGroup
                legend="1. 説得相手を選択"
                defaultValue={CHARACTER_ID.BEGINNER}
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
            <Button as="link" size="lg" width="hug" href="/exercise/chat">
              エクササイズ開始
            </Button>
          </Container>
        </FloatingActionArea>
      </Box>
    </VStack>
  );
};

export default NewExercisePage;
