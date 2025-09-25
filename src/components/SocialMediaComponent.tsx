
"use client";



import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SOCIALS = [
  {
    href: 'https://facebook.com',
    icon: <FaFacebookF size={15} />,
    ariaLabel: 'Facebook',
    bg: 'bg-[#1877F3]',
    hover: 'hover:bg-[#1456b8]',
  },
  {
    href: 'https://twitter.com',
    icon: <FaTwitter size={15} />,
    ariaLabel: 'Twitter',
    bg: 'bg-[#1DA1F2]',
    hover: 'hover:bg-[#157bb8]',
  },
  {
    href: 'https://linkedin.com',
    icon: <FaLinkedinIn size={15} />,
    ariaLabel: 'LinkedIn',
    bg: 'bg-[#0077B5]',
    hover: 'hover:bg-[#005582]',
  },
];

const buttonVariants = {
  initial: { scale: 1, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  whileHover: { scale: 1.08 },
};

const SocialMediaComponent = ({ className }: { className?: string }) => (
  <div
    className={`flex justify-center items-center gap-6 py-6 ${className ?? 'bg-white dark:bg-gray-900 sm:justify-end lg:px-16 xl:px-20 2xl:px-70'}`}
    data-testid="social-media-container"
  >
    {SOCIALS.map(({ href, icon, ariaLabel, bg, hover }, idx) => (
      <motion.a
        key={href}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="whileHover"
        transition={{ type: 'spring', stiffness: 400, damping: 20, delay: idx * 0.1 }}
        className={`rounded w-6 h-6 flex items-center justify-center shadow-lg text-white ${bg} ${hover} transition-all duration-100`}
      >
        {icon}
      </motion.a>
    ))}
  </div>
);

export default SocialMediaComponent;
