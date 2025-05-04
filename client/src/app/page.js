import Image from "next/image";
import styles from "../styles/page.module.css";
import Hero from "./_components/HeroSection";
import CategorySearch from "./_components/CategorySearch";
import DoctorsList from "./_components/DoctorsList";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      {/* Search Bar + Categories */}
      <CategorySearch />
      {/* Doctors List */}
      <section id="doctors-section">
        <DoctorsList />
      </section>
    </div>
  );
}
