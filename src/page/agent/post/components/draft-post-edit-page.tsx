import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DraftPost, mockDraftPosts } from '@/constant/const-draft-post';
import { DraftPostEditForm } from './draft-post-edit-form';

interface DraftPostEditPageProps {
  id: number;
}

export function DraftPostEditPage({ id }: DraftPostEditPageProps) {
  const [post, setPost] = useState<DraftPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = () => {
      setLoading(true);
      try {
        const foundPost = mockDraftPosts.find((p) => p.draft_id === id);
        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError('Không tìm thấy bài đăng');
        }
      } catch (err) {
        setError('Đã xảy ra lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = (updatedPost: DraftPost) => {
    console.log('Saving updated post:', updatedPost);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  if (loading) {
    return (
      <div className='container mx-auto py-6 px-4 md:px-6'>
        <div className='flex justify-center items-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container mx-auto py-6 px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center py-12 text-center'>
          <h2 className='text-xl font-semibold text-destructive'>{error}</h2>
          <Button className='mt-4' onClick={() => navigate('/')}>
            Quay lại trang chính
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto py-6 px-4 md:px-6'>
      <div className='mb-6'>
        <Link to='/'>
          <Button variant='ghost' className='flex items-center text-muted-foreground hover:text-foreground'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Quay lại danh sách
          </Button>
        </Link>
      </div>

      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold tracking-tight'>Chỉnh sửa bất động sản</h1>
      </div>

      {post && <DraftPostEditForm post={post} onSave={handleSave} />}
    </div>
  );
}
