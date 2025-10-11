"use client";

import React, { useState } from 'react';
import { useAIChat } from '@/context/AIChatContext';
import HomeContentWrapper from '@/components/HomeContentWrapper';
import HeroBackgroundSlider from '@/components/hero/HeroBackgroundSilder';
import AwardsSection from '@/components/awards/AwardsSection';
import { FormPic } from '@/components/form/FormPic';
import HowItWorks from '@/components/HowItWorks';
import TipInfo from '@/components/tip-info/TipInfo';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
  ),
});
import { SubmitTipButton } from '@/components/SubmitTipButton';
import AwardProducts from '@/components/awards/AwardProducts';
import Benefits from '@/components/benefits/Benefits';
import ButtonBehavior from '@/components/ButtonBehavior';
import ScrollToTopButton from '@/components/ScrollTopButton';
import BlockAnimation from '@/components/BlockAnimation';
import TipForm from '@/components/form/TipForm';
import MoreInfo from '@/components/MoreInfo';
import MotivationBanner from '@/components/MotivationBanner';
import AIButton from '@/components/ai-assistant/AIButton';
import AIChat from '@/components/ai-assistant/AIChat';
import AIChatMobile from '@/components/ai-assistant/AIChatMobile';
import { TipInfoSectionButton } from '@/components/tip-info/TipInfoSectionButton';

export default function HomeContent() {
  const [showFormPic, setShowFormPic] = useState(false);
  const { visible, toggleChat } = useAIChat();

  return (
    <HomeContentWrapper>
      <HeroBackgroundSlider />
      <TipInfoSectionButton/>
      <AwardsSection />
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
      <div className="hidden md:block">
        {!visible && <AIButton visible={false} toggleChat={toggleChat} />}
        {visible && <AIChat />}
      </div>
      <div className="md:hidden">
        {!visible && <AIButton visible={false} toggleChat={toggleChat} />}
        {visible && <AIChatMobile />}
      </div>
    </HomeContentWrapper>
  );
}
