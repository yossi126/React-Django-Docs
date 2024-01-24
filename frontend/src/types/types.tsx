export type PostProps = {
  id: number;
  title: string;
  body: string;
  onDelete?: (postId: number) => void;
};
