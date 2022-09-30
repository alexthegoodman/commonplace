export interface InterestGridProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  data: any;
  selectedItemId: string;
  onItemSelect: any;
  translationKey: string;
}
