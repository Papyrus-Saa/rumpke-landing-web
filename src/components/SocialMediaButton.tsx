import React from 'react';

interface Props {
  href: string;
  icon: React.ReactNode;
  ariaLabel?: string;
}

const SocialMediaButton = ({ href, icon, ariaLabel }: Props) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`w-6 h-6 flex items-center justify-center rounded hover:scale-110 hover:shadow-[var(--shadow-subtle-l)] dark:hover:shadow-[var(--shadow-subtle-d)] mr-1 bg-light-200 hover:bg-transparent hover:border-b-2 border-white hover:text-white hover:rounded-none text-mint-600 dark:text-mint-700 transition-all duration-300`}
    >
      {icon}
    </a>
  );
};

export default SocialMediaButton;

