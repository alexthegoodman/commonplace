export interface VideoViewerProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  sourceUrl: string;
  mini?: boolean;
}
