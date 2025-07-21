import { Typography } from "@/components/ui/Typography/Typography";
import { Box, Flex, Stack } from "../../styled-system/jsx";
import { Button } from "@/components/ui/Button/Button";

const HomePage = () => {
  return (
    <Flex height="[calc(100svh - 80px)]" alignItems="center">
      <Stack>
        <Typography variant="h1">説得力を鍛える一番クールな方法</Typography>
        <Box>
          <Button as="link" href="/exercise/new" size="lg">
            始める
          </Button>
        </Box>
      </Stack>
    </Flex>
  );
};

export default HomePage;
