
import About from '@/components/Pages/Home/About';
import BannerSection from '@/components/Pages/Home/BannerSection';
import Blog from '@/components/Pages/Home/Blog';
import CallToAction from '@/components/Pages/Home/CallToAction';
import PopularCategory from '@/components/Pages/Home/PopularCategory';
import PopularProducts from '@/components/Pages/Home/PopularProducts';
import QA from '@/components/Pages/Home/QA';
import Service from '@/components/Pages/Home/Service';
import Testimonials from '@/components/Pages/Home/Testimonials';

const HomePage = () => {
  return (
    <section>
      <BannerSection />
      <PopularCategory/>
      <PopularProducts />
      <Service />
      <Testimonials />
      <QA />
      <Blog />
    </section>
  );
};

export default HomePage;
