import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Home Page Components/Banner";
import ItemCarousel from "../components/Home Page Components/ItemCarousel";
import GoogleReviews from "../components/Home Page Components/GoogleReviews";
import GoogleMap from "../components/Home Page Components/GoogleMap";
import Footer from "../components/Home Page Components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <ItemCarousel />
      <GoogleReviews />
      <GoogleMap />
      <Footer />
    </div>
  );
};

export default Home;
