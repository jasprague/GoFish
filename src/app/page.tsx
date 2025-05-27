import HomeBanner from "@/components/banners/homeBanner/HomeBanner";
import Navbar from "@/components/navigation/Navbar";

export default function Home() {

  return (
    <main id="home-landing-page" className=" w-screen min-h-screen bg-[#114562] relative flex flex-col">
      <Navbar />
        <video
          autoPlay
          loop
          muted
          poster="go-fish-banner-poster.png"
          className="absolute top-0 left-0 min-w-full h-full object-cover"
        >
          <source src="go-fish-background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <HomeBanner />
    </main>
  );
}
