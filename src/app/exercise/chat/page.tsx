"use client";

import { SendIcon } from "lucide-react";

import { Box, Flex, HStack, VStack } from "../../../../styled-system/jsx";

import { FinishConfirmDialog } from "./components/FinishConfirmDialog";
import { DEFAULT_POINTS, usePersuadeChat } from "./usePersuadeChat";

import { Avatar } from "@/components/ui/Avatar/Avatar";
import { Button } from "@/components/ui/Button/Button";
import { Card } from "@/components/ui/Card/Card";
import { Container } from "@/components/ui/Container/Container";
import { FloatingActionArea } from "@/components/ui/FloatingActionArea/FloatingActionArea";
import { PointIndicator } from "@/components/ui/PointIndicator/PointIndicator";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { Typography } from "@/components/ui/Typography/Typography";
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
    isExerciseEnded,
    scrollAreaRef,
    textAreaRef,
    handleInputChange,
    handleSubmit,
    handleFinish,
  } = usePersuadeChat();

  const { count, isActive } = useCountdownTimer({
    initialCount: 10,
    onComplete: handleFinish,
    enabled: isExerciseEnded,
  });

  return (
    <VStack height="contentHeight" gap="none" position="relative">
      <Box
        width="full"
        borderBottom="1px solid"
        borderColor="divider"
        backgroundColor="background.default"
        position="sticky"
        top="none"
        zIndex="info"
        py="sm"
      >
        <Container>
          <HStack justifyContent="center" gap="lg">
            <Typography>
              現在のステージ: <strong>{currentStage}</strong>
            </Typography>
            <Tooltip
              content="ポイントは発言の長さで消費されます。短く的確な発言を心がけましょう。"
              trigger={
                <PointIndicator value={remainingPoints} max={DEFAULT_POINTS} />
              }
            />
          </HStack>
        </Container>
      </Box>

      <Box flexGrow={1} overflowY="scroll" width="full" ref={scrollAreaRef}>
        <Container>
          <VStack pt="lg" pb="lg">
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
                  <Card>
                    {message.parts?.map((part, i) =>
                      part.type === "text" ? (
                        <span key={`${message.id}-part-${i}`}>{part.text}</span>
                      ) : null
                    )}
                  </Card>
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
                  <Typography>
                    そろそろ終了です。{count}秒後に結果画面に移動します...
                  </Typography>
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
                          !input ||
                          !input.trim() ||
                          isLoading ||
                          !!validationError
                        }
                      >
                        送信する
                      </Button>
                    }
                    content={
                      validationError
                        ? validationError
                        : !input || !input.trim()
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
