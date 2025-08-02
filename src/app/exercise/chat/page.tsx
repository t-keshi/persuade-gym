"use client";

import { Button } from "@/components/ui/Button/Button";
import { Box, Flex, HStack, VStack } from "../../../../styled-system/jsx";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";
import { SendIcon } from "lucide-react";
import { FinishConfirmDialog } from "./components/FinishConfirmDialog";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { Typography } from "@/components/ui/Typography/Typography";
import { usePersuadeChat } from "./usePersuadeChat";
import { useCountdownTimer } from "@/utils/useCountdownTimer";

export const ChatExercisePage: React.FC = () => {
  const {
    messages,
    input,
    isLoading,
    error,
    remainingPoints,
    currentStage,
    character,
    validationError,
    hasEndMessage,
    scrollAreaRef,
    textAreaRef,
    handleInputChange,
    handleSubmit,
    handleFinish,
  } = usePersuadeChat();

  const { count, isActive } = useCountdownTimer({
    initialCount: 5,
    onComplete: handleFinish,
    enabled: hasEndMessage,
  });

  return (
    <VStack height="contentHeight" gap="none">
      <Box flexGrow={1} overflowY="scroll" width="full" ref={scrollAreaRef}>
        <Container>
          <VStack pt="lg" pb="lg">
            <Box width="full" textAlign="center" pb="md">
              <Typography>
                現在のステージ: <strong>{currentStage}</strong> | 残りポイント:{" "}
                <strong>{remainingPoints}</strong>
              </Typography>
            </Box>

            {messages.map((message) => (
              <Flex
                key={message.id}
                gap="sm"
                width="full"
                justifyContent={
                  message.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                {message.role === "assistant" && (
                  <Box flexShrink={0} pt="sm">
                    <Avatar src={character.avatar} />
                  </Box>
                )}
                <Box maxWidth="10/12" tabIndex={-1}>
                  <Card>{message.content}</Card>
                </Box>
              </Flex>
            ))}

            {isLoading && (
              <Flex gap="sm" width="full" justifyContent="flex-start">
                <Box flexShrink={0} pt="sm">
                  <Avatar src={character.avatar} />
                </Box>
                <Box maxWidth="10/12">
                  <Card>
                    <Typography>入力中...</Typography>
                  </Card>
                </Box>
              </Flex>
            )}

            {error && (
              <Typography color="error">
                エラーが発生しました: {error.message}
              </Typography>
            )}

            {isActive && (
              <Box width="full" textAlign="center" pt="md">
                <Card>
                  <Typography>{count}秒後に結果画面に移動します...</Typography>
                </Card>
              </Box>
            )}
          </VStack>
        </Container>
      </Box>

      <Box width="full" paddingBottom="lg">
        <FloatingActionArea>
          <Container>
            <form onSubmit={handleSubmit} noValidate>
              <HStack alignItems="flex-end">
                <TextArea
                  ref={textAreaRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder="メッセージを入力...(ctr + Enterで送信)"
                  disabled={isLoading || remainingPoints === 0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      const form = e.currentTarget.form;
                      if (form) {
                        form.requestSubmit();
                      }
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
                        disabled={
                          !input.trim() || isLoading || !!validationError
                        }
                      >
                        送信する
                      </Button>
                    }
                    content={
                      validationError
                        ? validationError
                        : input.trim() === ""
                        ? "メッセージを入力してください"
                        : null
                    }
                  />
                  <FinishConfirmDialog
                    trigger={
                      <Button variant="outlined" size="lg" width="hug">
                        終わる
                      </Button>
                    }
                    onConfirm={handleFinish}
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

export default ChatExercisePage;
