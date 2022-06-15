export interface StepCounterProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  step: number;
  creditCount: number;
}
