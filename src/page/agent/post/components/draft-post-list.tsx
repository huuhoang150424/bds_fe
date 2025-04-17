import { DraftPost } from '@/constant/const-draft-post';
import { DraftPostCard } from './draft-post-card';

interface DraftPostsListProps {
  posts: DraftPost[];
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
}

export function DraftPostsList({ posts, onDelete, onPublish }: DraftPostsListProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {posts.map((post) => (
        <DraftPostCard key={post.draft_id} post={post} onDelete={onDelete} onPublish={onPublish} />
      ))}
    </div>
  );
}
