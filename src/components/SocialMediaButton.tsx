import React from 'react';

interface Props {
  href: string;
  icon: React.ReactNode;

}

const SocialMediaButton = ({ href, icon  }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-6 h-6 flex items-center justify-center  rounded hover:scale-110 hover:shadow-lg mr-1  transition-transform duration-200 ease-in-out bg-light-200  text-mint-600 }`}
    >
      {icon}
    </a>
  );
};

export default SocialMediaButton;

