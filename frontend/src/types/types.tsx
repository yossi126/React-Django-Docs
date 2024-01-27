export type PostProps = {
  id: number;
  title: string;
  body: string;
  onDelete?: (postId: number) => void;
};

export type links = {
  name: string;
  icon: JSX.Element;
  path: string;
};
