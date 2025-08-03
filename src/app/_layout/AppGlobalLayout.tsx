import React from "react";

import Link from "next/link";

import { css } from "../../../styled-system/css";
import { Box } from "../../../styled-system/jsx";

import { Logo } from "./Logo";

import { Header } from "@/components/ui/Header/Header";
import { Typography } from "@/components/ui/Typography/Typography";

type AppGlobalLayoutProps = { children: React.ReactNode };

export const AppGlobalLayout: React.FC<AppGlobalLayoutProps> = ({
  children,
}) => {
  const isAuthenticated = false;

  return (
    <Box>
      <Header
        logo={
          <Link
            href="/"
            className={css({ cursor: "hover", outlineColor: "secondary.main" })}
          >
            <Logo />
          </Link>
        }
      >
        <Typography variant="h6" as="span">
          {isAuthenticated ? "username" : "お試しユーザー"}
        </Typography>
      </Header>
      <main>
        <Box paddingInline="md">{children}</Box>
      </main>
    </Box>
  );
};
