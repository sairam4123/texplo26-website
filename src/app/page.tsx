import Navbar from "~/app/_components/navbar";
import Hero from "~/app/_components/hero";
import About from "~/app/_components/about";
import Motivation from "~/app/_components/motivation";
import Events from "~/app/_components/events";
import Carousel from "~/app/_components/carousel";
import Gallery from "~/app/_components/gallery";
import Instructions from "~/app/_components/instructions";
import Location from "~/app/_components/location";
import Coordinators from "~/app/_components/coordinators";
import RegisterCta from "~/app/_components/register-cta";
import Footer from "~/app/_components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Carousel />
        <Motivation />
        <Events />
        <Gallery />
        <Instructions />
        <Location />
        <Coordinators />
        <RegisterCta />
      </main>
      <Footer />
    </>
  );
}
