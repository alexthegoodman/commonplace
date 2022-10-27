export interface PickerButtonProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onSelectInterestClick: (e: any) => void;
  selectedInterest: any;
}
