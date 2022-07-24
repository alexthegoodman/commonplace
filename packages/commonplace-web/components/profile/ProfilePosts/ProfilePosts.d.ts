type Post = {
  // TODO: need autogen types
  [typeof string]: any;
};
export interface ProfilePostsProps {
  ref?: React.Ref<any>;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  posts: Post[];
}
