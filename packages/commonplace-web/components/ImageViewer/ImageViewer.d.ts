export interface ImageViewerProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  mini: Boolean;
  sourceUrl: string;
}
