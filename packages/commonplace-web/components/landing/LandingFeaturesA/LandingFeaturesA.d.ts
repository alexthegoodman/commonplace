import { any } from "bluebird";
import { ReactElement } from "react";

export interface LandingFeaturesAProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  features: any[];
  headline: string;
  description?: ReactElement;
}
