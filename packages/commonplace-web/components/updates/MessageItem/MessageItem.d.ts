export interface MessageItemProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  chosenUsername: string;
  message: any;
  authorSide?: string;
  detailsOpen: boolean;
}
