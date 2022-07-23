type Message = {
  [typeof string]: any;
  content: string;
};

export interface MessageListProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  currentUser: any;
  otherUser: any;
  messages: any; // Message[];
}
