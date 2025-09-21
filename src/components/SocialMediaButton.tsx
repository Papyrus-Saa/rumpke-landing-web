import React from 'react';

interface Props {
  href: string;
  icon: React.ReactNode;

}

const SocialMediaButton = ({ href, icon }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-6 h-6 flex items-center justify-center rounded hover:scale-110 hover:shadow-lg mr-1 bg-light-200 hover:bg-transparent hover:border-b-2 border-white hover:text-white hover:rounded-none text-mint-600 transition-all duration-300`}
    >
      {icon}
    </a>
  );
};

export default SocialMediaButton;

