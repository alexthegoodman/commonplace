export interface PrimaryHeaderProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  leftIcon?: JSX.Component;
  rightIcon?: JSX.Component;
  title?: string;
  titleComponent?: JSX.Component;
  inline?: boolean;
}
