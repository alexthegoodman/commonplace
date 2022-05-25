export interface ContentViewerProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  type: string;
  preview?: string;
  content: string;
  mini?: boolean;
}
