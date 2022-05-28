export interface MessageItemProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  reply: string;
  authorSide?: string;
  profileImage?: string;
  content: string;
}
