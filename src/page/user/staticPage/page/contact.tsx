import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { ContactFormEnhanced } from '../components/contact/contact-form-enhanced';
import { ContactMap } from '../components/contact/contact-map';
import { EmailSubscription } from '../components/contact/email-subscription';

export default function Contact() {
  useScrollToTopOnMount();
  return (
    <div className='flex min-h-screen flex-col  px-[66p]'>
      <ContactFormEnhanced />
      <ContactMap />
      <EmailSubscription />
    </div>
  );
}
