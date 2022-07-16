import { any } from "bluebird";

export interface LandingFeaturesAProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  features: any[];
}
