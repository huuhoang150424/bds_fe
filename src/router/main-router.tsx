import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import Home from '@/page/user/home';
import SellDetail from '@/page/user/filterPost';
import { AuthModalProvider } from '@/context/auth-modal';
import News from '@/page/user/news/index';
import NotFoundScreen from '@/page/user/NotFoundScreen';
import PostDetail from '@/page/user/postDetail';
import NewsDetail from '@/page/user/newsDetail';
import BusinessDetail from '@/page/user/BusinessDetail';
import RealEstateAgentDirectory from '@/page/user/Brokers';
import UltilitySuport from '@/page/user/ultility-suport';
import About from '@/page/user/staticPage/page/about';
import Contact from '@/page/user/staticPage/page/contact';

export default function MainRouter() {
  return (
    <AuthModalProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/filter' element={<SellDetail />} />
          <Route path='/new' element={<News />} />
          <Route path='/post/:slug' element={<PostDetail />} />
          <Route path='/brokers' element={<RealEstateAgentDirectory />} />
          <Route path='/new/:slug' element={<NewsDetail />} />
          <Route path='/business/:id' element={<BusinessDetail />} />
          <Route path='/support' element={<UltilitySuport />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </AuthModalProvider>
  );
}
