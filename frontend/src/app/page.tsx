import Hero from "../components/layout/Hero";
import TopBar from "../components/layout/TopBar";
import Header from "../components/layout/Header";
import Highlight from "../components/layout/Highlight";
import Categories from "../components/layout/Categories";
import FeaturedProperties from "../components/layout/FeaturedProperties";

export default function Home() {
  return (
    <div className="">
      <TopBar />
      <Header />
      <Hero />
      <Categories />
      <Highlight />
      <FeaturedProperties />
    </div>
  );
}
