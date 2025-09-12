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
import ButtonBehavior from '@/components/ButtonBehavior';
import ScrollToTopButton from '@/components/ScrollTopButton';
import { SubmitTipButton } from '@/components/SubmitTipButton';





interface CloseChat {
  visible: boolean;
}


export default function Home() {


  const [closeChat, setCloseChat] = useState<CloseChat>({ visible: false });

  const toggleChat = () => {
    setCloseChat((prev) => ({ visible: !prev.visible }));
  };


  return (

    <div
      className="  2xl:w-full mx-auto">
      <HeroBackgroundSlider />
      <SocialMediaComponent className='lg:hidden' />
      <SubmitTipButton />
      <HeroIntro />
      <HowItWorks />
      <TipInfo />
      <SubmitTipButton />
      <Benefits />
      <SubmitTipButton />
      <ButtonBehavior />
      <ScrollToTopButton />
      <AwardProducts />
      <Awards />
      <BlockAnimation />
      {closeChat.visible && <AIChat />}
      <TipForm />
      <AIButton visible={closeChat.visible} toggleChat={toggleChat} />
    </div>

  );
}
