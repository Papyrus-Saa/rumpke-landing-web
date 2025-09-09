'use client'


interface SocialMediaButtonProps {
  href: string;
  icon: React.ReactNode;
  className?: string;
}

import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import SocialMediaButton from './SocialMediaButton';



const SocialMediaComponent = ({ className }: { className?: string }) => {
  return (
    <div className={`flex justify-center  items-center gap-4 py-4  ${className ?? 'bg-white dark:bg-gray-900 sm:justify-end lg:px-16 xl:px-20 2xl:px-70'}`}>
      <SocialMediaButton
        href="https://facebook.com"
        icon={<FaFacebookF size={15} />}
      />
      <SocialMediaButton
        href="https://twitter.com"
        icon={<FaTwitter size={15} />}
      />
      <SocialMediaButton
        href="https://linkedin.com"
        icon={<FaLinkedinIn size={15} />}
      />
    </div>
  );
};

export default SocialMediaComponent;
