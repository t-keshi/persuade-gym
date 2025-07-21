"use client";

import { Button } from "@/components/ui/Button/Button";
import { Box, Flex, HStack, VStack } from "../../../../styled-system/jsx";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";
import { SendIcon } from "lucide-react";
import { useActionState, useRef } from "react";
import { FinishConfirmDialog } from "./components/FinishConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { mockAction } from "./action";
import { schema } from "./schema";

export const NewExercisePage: React.FC = () => {
  const [lastResult, action] = useActionState(mockAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    onSubmit: (e) => e.preventDefault(),
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema });
    },
  });

  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full">
        <Container>
          <VStack pt="lg">
            <Flex gap="sm" width="full" justifyContent="flex-start">
              <Box flexShrink={0} pt="sm">
                <Avatar src="/avatar-sato.png" />
              </Box>
              <Box maxWidth="10/12" tabIndex={-1}>
                <Card>
                  Commodo occaecat Lorem qui est. Id adipisicing non
                  reprehenderit cupidatat dolor id veniam commodo sit ad.
                  Officia qui minim occaecat eiusmod incididunt qui aute commodo
                  in. Lorem laboris nisi mollit occaecat cillum laborum
                  adipisicing sint laboris aliquip laboris aute. Minim do qui
                  minim aute veniam laborum. Aliqua pariatur velit duis eiusmod.
                  Mollit nisi ea proident sint qui quis culpa. Ipsum tempor
                  nostrud mollit cillum consectetur exercitation. Et
                  exercitation eu do aliquip sunt sint. Laborum fugiat ad culpa
                  proident irure. Laborum eu tempor voluptate enim quis duis
                  adipisicing nulla proident qui nisi dolor tempor. Consequat
                  sunt dolor voluptate amet labore ex dolore laboris amet
                  exercitation. Ullamco nostrud culpa do id ad non. Eu irure
                  veniam deserunt esse aliqua excepteur ut aute elit enim esse
                  cillum velit. Magna eiusmod sit magna nulla dolor incididunt
                  dolor eiusmod. Commodo sint sit aliqua eu minim quis fugiat.
                  Enim aute Lorem laborum id velit quis nostrud esse minim
                  exercitation cillum. Id aliqua culpa tempor dolor dolor
                  eiusmod duis nostrud. Sunt culpa occaecat labore aliqua
                  occaecat. Consectetur consequat laboris fugiat sint tempor.
                  Nulla et nulla ea mollit ad officia dolore est. Eiusmod sit
                  tempor commodo sunt ullamco incididunt aute. Dolore occaecat
                  consequat cupidatat anim occaecat. Nulla occaecat
                  reprehenderit reprehenderit anim quis. Fugiat ipsum non anim
                  id ad. Laborum in aute consectetur officia cillum aliqua
                  incididunt magna excepteur minim minim enim in. occaecat.
                  Consectetur consequat laboris fugiat sint tempor. Nulla et
                  nulla ea mollit ad officia dolore est. Eiusmod sit tempor
                  commodo sunt ullamco incididunt aute. Dolore occaecat
                  consequat cupidatat anim occaecat. Nulla occaecat
                  reprehenderit reprehenderit anim quis. Fugiat ipsum non anim
                  id ad. Laborum in aute consectetur officia cillum aliqua
                  incididunt magna excepteur minim minim enim in.
                </Card>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end">
              <Box maxWidth="10/12">
                <Card>
                  Ex veniam nulla cupidatat consequat occaecat officia
                  reprehenderit elit minim enim adipisicing nulla velit.
                  Voluptate minim labore laborum pariatur ea aliquip quis sunt
                  sit. Aute esse quis anim duis excepteur in occaecat ullamco
                  commodo elit. Consectetur minim proident dolore quis qui velit
                  reprehenderit cupidatat cupidatat cillum elit ad velit ut. Ad
                  veniam laborum culpa minim ut minim excepteur enim. Proident
                  in deserunt est in aliqua aliquip exercitation amet aliquip
                  consectetur pariatur aliquip. Elit eu labore aliqua tempor do
                  nostrud eu officia esse esse Lorem fugiat. Quis consectetur
                  sit laborum sit dolor velit laborum dolore. Velit ea cillum
                  commodo amet Lorem et. Consectetur duis magna officia aliquip
                  nostrud cupidatat. Anim nisi consequat ut mollit enim nulla
                  est incididunt ipsum Lorem. Exercitation sit dolore dolore
                  dolor mollit. Tempor culpa occaecat consectetur laborum
                  exercitation magna labore commodo. Adipisicing voluptate ea
                  amet Lorem ipsum elit quis dolore anim minim ullamco ut est
                  eiusmod.
                </Card>
              </Box>
            </Flex>
            <Box height="[200px]" />
          </VStack>
        </Container>
      </Box>
      <Box width="full" paddingBottom="lg">
        <FloatingActionArea>
          <Container>
            <form
              id={form.id}
              action={action}
              onSubmit={form.onSubmit}
              noValidate
              ref={formRef}
            >
              <HStack alignItems="flex-end">
                <TextArea
                  key={fields.textMessage.key}
                  name={fields.textMessage.name}
                  defaultValue={fields.textMessage.initialValue}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      formRef.current?.requestSubmit();
                    }
                  }}
                />
                <VStack gap="xs" flexShrink={0}>
                  <Tooltip
                    trigger={
                      <Button
                        type="submit"
                        size="lg"
                        leftIcon={<SendIcon />}
                        disabled={Boolean(fields.textMessage.errors)}
                      >
                        送信する
                      </Button>
                    }
                    content={
                      fields.textMessage.errors
                        ? fields.textMessage.errors[0]
                        : undefined
                    }
                  />
                  <FinishConfirmDialog
                    trigger={
                      <Button variant="outlined" size="lg" width="hug">
                        終わる
                      </Button>
                    }
                  />
                </VStack>
              </HStack>
            </form>
          </Container>
        </FloatingActionArea>
      </Box>
    </VStack>
  );
};

export default NewExercisePage;
