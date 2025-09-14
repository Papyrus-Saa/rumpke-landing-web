'use client';

import AIButton from '@/components/ai-assistant/AIButton';
import AIChat from '@/components/ai-assistant/AIChat';
import BlockAnimation from '@/components/BlockAnimation';
import HowItWorks from '@/components/HowItWorks';
import SocialMediaComponent from '@/components/SocialMediaComponent';

import React, { useEffect, useState } from 'react';
import TipForm from '@/components/form/TipForm';

import HeroBackgroundSlider from '@/header/components/hero/HeroBackgroundSilder';
import HeroIntro from '@/header/components/hero/HeroIntro';
import Awards from '@/components/awards/Awards';
import AwardProducts from '@/components/awards/AwardProducts';

import Benefits from '@/components/benefits/Benefits';
import TipInfo from '@/components/TipInfo';
import ButtonBehavior from '@/components/ButtonBehavior';
import ScrollToTopButton from '@/components/ScrollTopButton';
import { SubmitTipButton } from '@/components/SubmitTipButton';
import MoreInfo from '@/components/MoreInfo';





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
      <MoreInfo/>
      <AIButton visible={closeChat.visible} toggleChat={toggleChat} />
    </div>

  );
}
