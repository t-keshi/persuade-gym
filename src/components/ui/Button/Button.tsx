import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import { LoaderCircle } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { button, ButtonVariantProps } from "../../../../styled-system/recipes";

type ElementPropsForAnchor = {
  as: "link";
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
} & Pick<LinkProps, "href" | "replace" | "scroll">;
type ElementPropsForButton = {
  as?: never;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean | undefined;
  disabled?: boolean | undefined;
};

type ButtonElementProps =
  | StandardComponentProps<ElementPropsForAnchor, "a">
  | StandardComponentProps<ElementPropsForButton, "button">;

export type ButtonProps = ButtonVariantProps & ButtonElementProps;

export const Button: React.FC<ButtonProps> = (props) => {
  const [
    buttonVariantProps,
    { children, leftIcon, rightIcon, loading, disabled, ...rest },
  ] = button.splitVariantProps(props);

  const buttonContent = (
    <>
      {loading && <LoaderCircle />}
      {leftIcon}
      {children}
      {rightIcon}
    </>
  );

  if (rest.as === "link") {
    const { as: _, replace, scroll, href, ...anchorAttributes } = rest;
    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        className={button(buttonVariantProps)}
        aria-disabled={disabled}
        {...(loading && { "aria-busy": true })}
        {...anchorAttributes}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={button(buttonVariantProps)}
      disabled={disabled}
      {...(loading && { "aria-busy": true })}
      {...rest}
    >
      {buttonContent}
    </button>
  );
};
