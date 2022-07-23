export interface MessageItemProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  message: any;
  authorSide?: string;
  detailsOpen: boolean;
}
