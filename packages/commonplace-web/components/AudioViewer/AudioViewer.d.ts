export interface AudioViewerProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  previewUrl: string;
  sourceUrl: string;
  mini?: boolean;
}
