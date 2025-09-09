'use client';

import AIButton from '@/components/ai-assistant/AIButton';
import AIChat from '@/components/ai-assistant/AIChat';
import BlockAnimation from '@/components/BlockAnimation';
import HowItWorks from '@/components/HowItWorks';
import SocialMediaComponent from '@/components/SocialMediaComponent';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/header/components/Header';
import React, { useEffect, useState } from 'react';
import TipForm from '@/components/form/TipForm';
import Contributors from '@/components/contributors/Contributors';
import HeroBackgroundSlider from '@/header/components/hero/HeroBackgroundSilder';
import HeroIntro from '@/header/components/hero/HeroIntro';
import Awards from '@/components/awards/Awards';
import AwardProducts from '@/components/awards/AwardProducts';
import Footer from '@/components/Footer';
import { useTipFormCount } from '@/components/form/hooks/useTipFormCount';
import Benefits from '@/components/benefits/Benefits';
import TipInfo from '@/components/TipInfo';
import KeywordCarousel from '@/header/components/KeywordCarousel';




interface CloseChat {
  visible: boolean;
}


export default function Home() {


  const [closeChat, setCloseChat] = useState<CloseChat>({ visible: false });

  const toggleChat = () => {
    setCloseChat((prev) => ({ visible: !prev.visible }));
  };


  return (
    <ThemeProvider>
      <div className='w-full bg-light-100 dark:bg-dark-300'>
        <KeywordCarousel />
        <div
          className=" text-gray-800 dark:text-gray-300 2xl:w-[85%] mx-auto bg-white dark:bg-dark-300 shadow-[0px_-12px_12px_5px_rgba(0,0,0,0.12)] dark:shadow-[0px_-12px_12px_5px_rgba(0,255,180,0.10)]">
          <Header />
          <HeroBackgroundSlider />
          <SocialMediaComponent className='lg:hidden' />
          <HeroIntro />
          <HowItWorks />
          <TipInfo />
          <Benefits />
          <AwardProducts />
          <Awards />
          <BlockAnimation />
          {closeChat.visible && <AIChat />}
          <TipForm />
          <AIButton visible={closeChat.visible} toggleChat={toggleChat} />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
