'use client';

import AIButton from '@/components/ai-assistant/AIButton';
import AIChat from '@/components/ai-assistant/AIChat';
import BlockAnimation from '@/components/BlockAnimation';
import HowItWorks from '@/components/HowItWorks';
import SocialMediaComponent from '@/components/SocialMediaComponent';

import React, { useState } from 'react';
import TipForm from '@/components/form/TipForm';

import HeroBackgroundSlider from '@/header/components/hero/HeroBackgroundSilder';
import HeroIntro from '@/header/components/hero/HeroIntro';

import AwardProducts from '@/components/awards/AwardProducts';

import Benefits from '@/components/benefits/Benefits';
import TipInfo from '@/components/TipInfo';
import ButtonBehavior from '@/components/ButtonBehavior';
import ScrollToTopButton from '@/components/ScrollTopButton';
import { SubmitTipButton } from '@/components/SubmitTipButton';
import MoreInfo from '@/components/MoreInfo';
import MotivationBanner from '@/components/MotivationBanner';
import { useAIChat } from '@/context/AIChatContext';
import AIChatMobile from '@/components/ai-assistant/AIChatMobile';
import { FormPic } from '@/components/form/FormPic';


export default function Home() {
  const [showFormPic, setShowFormPic] = useState(false);
  const { visible, toggleChat } = useAIChat();


  return (

    <div
      className="2xl:w-full mx-auto duration-500"
    >
      <HeroBackgroundSlider />
      <SocialMediaComponent className='lg:hidden' />
      {showFormPic && <FormPic />}
      <SubmitTipButton />
      <HeroIntro />
      <HowItWorks />
      <TipInfo />
      <SubmitTipButton />
      <AwardProducts />
      <Benefits />
      <SubmitTipButton />
      <div
        onMouseEnter={() => setShowFormPic(true)}
        onMouseLeave={() => setShowFormPic(false)}
      >
        <ButtonBehavior />
      </div>
      <ScrollToTopButton />
      <BlockAnimation />
      <TipForm />
      <MoreInfo />
      <MotivationBanner />
      <div className='hidden md:block'>
        {!visible && (
          <AIButton visible={false} toggleChat={toggleChat} />
        )}
        {visible && <AIChat />}
      </div>
      <div className='md:hidden'>
        {!visible && (
          <AIButton visible={false} toggleChat={toggleChat} />
        )}
        {visible && <AIChatMobile />}
      </div>
    </div>

  );
}
