
"use client";



import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SOCIALS = [
  {
    href: 'https://www.facebook.com/profile.php?id=61572884870790&rdid=V4DdluER74BYp4cE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16zyHEySPr%2F#',
    icon: <FaFacebookF size={14} />,
    ariaLabel: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/rumpkeimmobilien/',
    icon: <FaInstagram size={14} />,
    ariaLabel: 'Instagram',
  },
];

const buttonVariants = {
  initial: { scale: 1, opacity: 0, y: 20 },
  animate: { scale: 1, opacity: 1, y: 0 },
  whileHover: { scale: 1.08 },
};

const SocialMediaComponent = ({ className }: { className?: string }) => (
  <div
    className={`flex justify-center items-center gap-4 py-2 ${className ?? ''}`}
    data-testid="social-media-container"
  >
    {SOCIALS.map(({ href, icon, ariaLabel }, idx) => (
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
        className="inline-flex items-center justify-center w-6 h-6 p-0 bg-transparent  rounded-md cursor-pointer text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 dark:focus:ring-white/20 transition-all duration-200 ease-out"
      >
        {icon}
      </motion.a>
    ))}
  </div>
);

export default SocialMediaComponent;
