import React from "react";
import { StandardComponentProps } from "@/components/types/utilityTypes";
import { header, HeaderVariantProps } from "../../../../styled-system/recipes";

type ElementProps = {
  logo: React.ReactNode;
  children?: React.ReactNode;
};
type HeaderElementProps = StandardComponentProps<ElementProps, "div">;

export type HeaderProps = HeaderVariantProps & HeaderElementProps;

export const Header: React.FC<HeaderProps> = (props) => {
  const [headerVariantProps, { logo, children, ...rest }] =
    header.splitVariantProps(props);
  const styles = header(headerVariantProps);

  return (
    <div {...rest}>
      <header className={styles.header}>
        <div className={styles.toolbar}>
          {logo}
          <div>{children}</div>
        </div>
      </header>
      <div className={styles.offsetArea} />
    </div>
  );
};
