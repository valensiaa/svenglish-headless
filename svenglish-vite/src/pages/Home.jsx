import AboutSection from "../components/About";
import HeroSection from "../components/Hero";

const Home = () => {
  return (
    <div className="main flex-auto">
      <HeroSection />
      <AboutSection />
    </div>
  );
};

export default Home;
