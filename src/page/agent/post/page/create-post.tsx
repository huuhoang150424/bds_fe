import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import ListingWizard from '../components/listing-wizard';
function CreatePost() {
  useScrollToTopOnMount();
  return (
    <div className='mx-auto '>
      <ListingWizard />
    </div>
  );
}

export default CreatePost;
