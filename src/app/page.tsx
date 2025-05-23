'use client';

import HomeBanner from "@/components/banners/homeBanner/HomeBanner";
import Navbar from "@/components/navigation/Navbar";
import { useState, useEffect } from 'react';

export default function Home() {

  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setVideoLoaded(true);
    };

    if (document.readyState === 'complete') {
      setVideoLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return (
    <main id="home-landing-page" className=" w-screen min-h-screen bg-[#114562] relative flex flex-col">
      <Navbar />
      {!videoLoaded ? (
        <div className="absolute w-screen h-screen bg-cover bg-center"></div>
      ) : (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 min-w-full h-full object-cover"
        >
          <source src="go-fish-background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <HomeBanner />
    </main>
  );
}
