import { mockDraftPosts } from '@/constant/const-draft-post';
import { useState, useEffect } from 'react';
import { DraftPostsHeader } from './draft-post-header';
import { DraftPostsList } from './draft-post-list';
import { DraftPostsTable } from './draft-post-table';
import { DraftPostsEmpty } from './draft-post-empty';

export function DraftPostsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(mockDraftPosts);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === 'card' ? 6 : 15;
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, viewMode]);

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.draft_id !== id));
  };

  const handlePublish = (id: number) => {
    setPosts(posts.filter((post) => post.draft_id !== id));
  };

  return (
    <div className=' p-6 space-y-6  min-h-screen max-w-8xl '>
      <DraftPostsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      {filteredPosts.length > 0 ? (
        <>
          {viewMode === 'card' ? (
            <DraftPostsList posts={currentPosts} onDelete={handleDelete} onPublish={handlePublish} />
          ) : (
            <DraftPostsTable posts={currentPosts} onDelete={handleDelete} onPublish={handlePublish} />
          )}
        </>
      ) : (
        <DraftPostsEmpty searchQuery={searchQuery} />
      )}
    </div>
  );
}
