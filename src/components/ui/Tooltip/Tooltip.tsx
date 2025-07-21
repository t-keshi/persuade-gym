import {
  Tooltip as ArkTooltip,
  TooltipRootProps as ArkTooltipRootProps,
} from "@ark-ui/react/tooltip";
import {
  tooltip,
  TooltipVariantProps,
} from "../../../../styled-system/recipes";
import { StandardComponentProps } from "@/components/types/utilityTypes";

type ElementProps = {
  trigger: React.ReactNode;
  content?: React.ReactNode;
} & Pick<ArkTooltipRootProps, "open">;
type TooltipElementProps = StandardComponentProps<ElementProps, "div">;

export type TooltipProps = TooltipVariantProps & TooltipElementProps;

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const [tooltipVariantProps, { trigger, content, ...rest }] =
    tooltip.splitVariantProps(props);
  const styles = tooltip(tooltipVariantProps);

  return (
    <ArkTooltip.Root openDelay={300} disabled={!content} {...rest}>
      <ArkTooltip.Trigger asChild>{trigger}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner className={styles.positioner}>
        <ArkTooltip.Content className={styles.content}>
          <ArkTooltip.Arrow className={styles.arrow}>
            <ArkTooltip.ArrowTip className={styles.arrowTip} />
          </ArkTooltip.Arrow>
          {content}
        </ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  );
};
