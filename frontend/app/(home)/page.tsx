import CategorySection from "@/components/categories/CategoryGrid";
import Header from "@/components/Headers/Header";
import Hero from "@/components/hero/Hero";
import HomeProductList from "./products/HomeProduct";
import { HeaderService } from "@/lib/services/HeaderService";
import WhyUs from "@/components/features/whyUs";
import FeedBack from "@/components/features/feedBack";
import Footer from "@/components/footer/Footer";
export default async function page() {
  const categories = await HeaderService();

  return (
    <>
      <Header categories={categories} />
      <Hero />
      <CategorySection />
      <HomeProductList pageTitle="For You" limit={6} />
      <WhyUs/>
      <FeedBack/>
      <Footer/>
    </>
  );
}
