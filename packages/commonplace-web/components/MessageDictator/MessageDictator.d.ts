export interface MessageDictatorProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  author: any;
  threadId: string;
}
