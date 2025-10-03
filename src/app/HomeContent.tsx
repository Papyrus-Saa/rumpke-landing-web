"use client";

import AIButton from '@/components/ai-assistant/AIButton';
import AIChat from '@/components/ai-assistant/AIChat';
import BlockAnimation from '@/components/BlockAnimation';
import HowItWorks from '@/components/HowItWorks';
import SocialMediaComponent from '@/components/SocialMediaComponent';

import React, { useState } from 'react';
import TipForm from '@/components/form/TipForm';

import HeroBackgroundSlider from '@/components/hero/HeroBackgroundSilder';
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
import LeafletMap from '@/components/map/LeafletMap';
import AwardsSection from '@/components/awards/AwardsSection';


export default function HomeContent() {
  const [showFormPic, setShowFormPic] = useState(false);
  const { visible, toggleChat } = useAIChat();

  return (
    <div className="2xl:w-full mx-auto duration-100 overflow-x-hidden">
      <HeroBackgroundSlider />
      <AwardsSection/>
      {showFormPic && <FormPic />}
      <HowItWorks />
      <TipInfo />
      <LeafletMap />
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
