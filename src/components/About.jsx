import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';

import aboutImage from '/img/image.png';
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutImageRef = useRef(null);
  const stoneRef = useRef(null); // Ref for the stone image

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
  
    // Make the image initially bigger
    gsap.set('.mask-about-clip img', {
      scale: 1.1, // increase size
      transformOrigin: 'center center',
    });
  
    // Set the clipPath
    clipAnimation.set('.mask-about-clip', {
      clipPath: 'polygon(0% 0%, 85% 0%, 100% 100%, 15% 100%)', // wider trapezoid
      width: '37vw',  // extra wide
      height: '90vh', // extra tall
      borderRadius: '0 0 0 0',
    });
  
    // Animate clipPath and image scale
    clipAnimation.to('.mask-about-clip', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      width: '100vw',
      height: '100vh',
      borderRadius: '0 0 0 0',
    }, 0).to('.mask-about-clip img', {
      scale: 1,
      ease: 'power2.out',
    }, 0); // sync with clipPath animation
  });

  useEffect(() => {
    // Animation for floating effect on the stone image
    if (stoneRef.current) {
      gsap.to(stoneRef.current, {
        y: '60px', // Move it up by 10px
        repeat: -1, // Infinite loop
        yoyo: true, // Alternate the animation (up and down)
        duration: 1, // Animation duration
        ease: 'power1.inOut', // Ease for smooth transition
      });
    }

    if (aboutImageRef.current) {
        gsap.to(aboutImageRef.current, {
          y: '60px', // Move it up by 10px
          repeat: -1, // Infinite loop
          yoyo: true, // Alternate the animation (up and down)
          duration: 10, // Animation duration
          ease: 'power1.inOut', // Ease for smooth transition
        });
      }
  }, []);


  /* Frame ref animation */

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px]">Philippines' Most Finest PvPers.</h2>

        <AnimatedTitle
          title="BOMBARDINO CROCODILO"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
        </div>
      </div>

      <div className="h-dvh w-screen border" id="clip">
        <div className="mask-about-clip about-image " ref={aboutImageRef}>
          <img
            src={aboutImage}
            alt="background"
            className="absolute left-0 top-0 size-full object-cover transition-transform duration-500"
          />
        </div>
        {/* Floating Stone Image */}
        <img
          ref={stoneRef}
          src="/img/lutang.svg"
          alt="background"
          className="absolute left-0 -top-[13rem] size-full h-[80rem] object-fill z-20 hidden md:block"
        />
      </div>
    </div>
  );
};

export default About;
