import { ReactElement } from "react";

export interface LandingBlockAProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  headline: string;
  description?: ReactElement;
}
