import useScrollToTopOnMount from '@/hooks/use-scroll-top';
import { AboutContent } from '../components/about/about-content';
import { AboutHero } from '../components/about/about-hero';
import { AboutTeam } from '../components/about/about-team';
import { AboutTimeline } from '../components/about/about-timeline';
import { AboutValues } from '../components/about/about-values';

export default function About() {
  useScrollToTopOnMount();
  return (
    <div className='flex min-h-screen flex-col px-[66p] '>
      <AboutHero />
      <AboutContent />
      <AboutValues />
      <AboutTeam />
      <AboutTimeline />
    </div>
  );
}
