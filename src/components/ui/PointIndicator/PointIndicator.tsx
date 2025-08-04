import {
  pointIndicator,
  type PointIndicatorVariantProps,
} from "../../../../styled-system/recipes";

import type { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  value: number;
  max?: number;
};

type PointIndicatorElementProps = StandardComponentProps<ElementProps, "div">;

export type PointIndicatorProps = PointIndicatorVariantProps &
  PointIndicatorElementProps;

export const PointIndicator: React.FC<PointIndicatorProps> = (props) => {
  const [variantProps, { value, max = 100, ...rest }] =
    pointIndicator.splitVariantProps(props);
  const styles = pointIndicator(variantProps);
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className={styles.root} {...rest}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
      <span className={styles.text}>
        {value}/{max}
      </span>
    </div>
  );
};
