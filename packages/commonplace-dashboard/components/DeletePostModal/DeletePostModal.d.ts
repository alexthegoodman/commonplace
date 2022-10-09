export interface DeletePostModalProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onConfirm: () => void;
  post: any;
}
