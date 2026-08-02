import NavBar from "@/components/NavBar";
import type { Route } from "./+types/home";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import BusinessModel from "@/components/home/BusinessModel";
import CareerLevels from "@/components/home/CareerLevels";
import Compensation from "@/components/home/Compensation";
import HowItWorks from "@/components/home/HowItWorks";
import Courses from "@/components/home/Courses";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Huslers Bussiness Team" },
    { name: "description", content: "Welcome to HBT" },
  ];
}


export default function Home() {
  return (
    <>
      <NavBar />

      <Hero />

      <StatsBar />

      <BusinessModel />

      <CareerLevels />

      <Compensation />

      <HowItWorks />

      <Courses />

      <Testimonials />

      <CTA />

      <Footer />
    </>
  );
}