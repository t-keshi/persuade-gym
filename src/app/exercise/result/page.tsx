import { Button } from "@/components/ui/Button/Button";
import React from "react";
import { Box, Stack, VStack } from "../../../../styled-system/jsx";
import { Typography } from "@/components/ui/Typography/Typography";
import { Container } from "@/components/ui/Container/Container";
import { GradingScale } from "./components/GradingScale";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";

const ResultPage: React.FC = () => {
  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full">
        <Container>
          <Box p="lg">
            <Stack gap="lg">
              <GradingScale point={100} />
              <Typography>
                Aliquip fugiat sunt ullamco non deserunt. Occaecat sint quis
                aliquip elit. Nisi exercitation consequat fugiat adipisicing
                cillum aliquip duis enim in culpa. Nisi reprehenderit fugiat
                pariatur cupidatat ea reprehenderit magna ipsum deserunt cillum
                culpa aliquip aliqua exercitation. Eu pariatur exercitation sit
                velit. Culpa cupidatat do enim non et aliqua Lorem in. Aliqua
                consectetur excepteur occaecat exercitation cillum occaecat
                dolor. Aute aliquip cillum adipisicing eu consequat eiusmod
                proident aliqua labore tempor id non dolor esse. Ex duis ut
                dolor eu mollit adipisicing fugiat cupidatat laboris officia sit
                non officia. Do elit incididunt incididunt qui anim ad mollit
                esse minim. Reprehenderit do proident deserunt ea quis eu ea
                pariatur adipisicing irure est exercitation est.
              </Typography>
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

export default ResultPage;
