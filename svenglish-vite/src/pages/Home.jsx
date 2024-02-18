import AboutSection from "../components/About";
import HeroSection from "../components/Hero";
import BrandsSection from "../components/Brands";

const Home = () => {
  return (
    <div className="main flex-auto">
      <HeroSection />
      <AboutSection />
      <BrandsSection />
    </div>
  );
};

export default Home;
