import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import Profile from './components/user-profile';
export default function UserProfile() {
  useScrollToTopOnMount();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <Profile/>
    </div>
  );
}
