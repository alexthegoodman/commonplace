export interface DeleteUserModalProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onConfirm: () => void;
  user: any;
}
