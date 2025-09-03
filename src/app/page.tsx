// components
import { Navbar, Footer } from "@/src/components";

// sections
import Hero from "./hero";
import OnlineCourse from "./online-course";
import WhyChooseUs from "./why-choose-us";
import CarouselFeatures from "./carousel-features";
import Pricing from "./pricing";
import OtherCourses from "./other-courses";


export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <OnlineCourse />
      <OtherCourses />
      <CarouselFeatures />      
      <Footer />
    </>
  );
}
