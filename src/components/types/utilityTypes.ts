import type React from "react";

type OmitComponentProps<T> = Omit<T, "className" | "style" | "children">;

export type StandardComponentProps<
  TElementProps,
  TElementType extends React.ElementType
> = TElementProps &
  Omit<
    OmitComponentProps<React.ComponentProps<TElementType>>,
    keyof TElementProps
  >;
