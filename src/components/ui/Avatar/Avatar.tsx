import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import { avatar, AvatarVariantProps } from "../../../../styled-system/recipes";
import Image from "next/image";

type ElementProps =
  | {
      children?: never;
      src: string;
      alt?: string;
    }
  | {
      children: React.ReactNode;
      src?: never;
      alt?: never;
    };

type AvatarElementProps = StandardComponentProps<ElementProps, "div">;

export type AvatarProps = AvatarVariantProps & AvatarElementProps;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const [avatarVariantProps, { src, alt, children, ...rest }] =
    avatar.splitVariantProps(props);
  const className = avatar(avatarVariantProps);

  return (
    <div className={className} {...rest}>
      {src ? <Image src={src} alt={alt || "Avatar"} fill /> : children}
    </div>
  );
};
